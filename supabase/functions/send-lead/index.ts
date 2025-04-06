
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "npm:@supabase/supabase-js@2.39.7";

// Get the API key from environment variable
const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(resendApiKey);
const recipientEmail = "kierontaylor1995@gmail.com";

// Create Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// CORS headers for the function
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Interface for the lead data
interface LeadData {
  name: string;
  email: string;
  phone: string;
  contact?: string;
  jobType: string;
  zipCode: string;
  details?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  state?: string;
  form_type?: string;
  landing_url?: string;
  page_path?: string;
  [key: string]: any;
}

// Function to calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in km
  return distance;
}

// Function to get coordinates from zip code with improved fallback
async function getCoordinatesFromZipCode(zipCode: string): Promise<[number, number] | null> {
  try {
    console.log(`Looking up coordinates for zip code: ${zipCode}`);
    
    // First check if we have this zip code in our Location Data table
    const { data: locationData, error: locationError } = await supabase
      .from('Location Data + URL Structure')
      .select('Latitude, Longitude')
      .eq('City', zipCode)
      .maybeSingle();
    
    if (locationError) {
      console.error("Error querying location database:", locationError);
    }
    
    if (locationData?.Latitude && locationData?.Longitude) {
      console.log(`Found coordinates in database: ${locationData.Latitude}, ${locationData.Longitude}`);
      return [locationData.Latitude, locationData.Longitude];
    }
    
    // Secondary lookup - check if we can find by ZIP code in another database
    // This is a placeholder for connecting to a more comprehensive ZIP code database
    // Implementation would depend on what other data sources you have available
    
    console.log(`Zip code ${zipCode} not found in location database`);
    return null;
  } catch (error) {
    console.error("Error getting coordinates from zip code:", error);
    return null;
  }
}

// Extract email and phone from contact field if present
function extractContactInfo(leadData: LeadData): { email: string | null; phone: string | null } {
  // If email and phone are already provided directly, use those
  if (leadData.email && leadData.phone) {
    return { email: leadData.email, phone: leadData.phone };
  }
  
  const contactInfo = leadData.contact || '';
  
  // Check if contact looks like an email
  if (contactInfo.includes('@') && contactInfo.includes('.')) {
    return { email: contactInfo, phone: leadData.phone || null };
  }
  
  // Otherwise assume it's a phone number
  // Remove non-numeric characters for consistent phone format
  const cleanedPhone = contactInfo.replace(/\D/g, '');
  if (cleanedPhone.length >= 10) {
    return { email: leadData.email || null, phone: cleanedPhone };
  }
  
  // Fallback
  return { 
    email: leadData.email || (contactInfo.includes('@') ? contactInfo : null),
    phone: leadData.phone || (!contactInfo.includes('@') ? contactInfo : null)
  };
}

// Handle the incoming request
const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const leadData: LeadData = await req.json();
    console.log("Received lead data:", leadData);

    // Extract contact information (either email or phone)
    const { email: emailInfo, phone: phoneInfo } = extractContactInfo(leadData);
    const contactInfo = emailInfo || phoneInfo;

    // Basic validation
    if (!leadData.name || !contactInfo || !leadData.zipCode) {
      throw new Error("Missing required fields: name, contact information, or zip code");
    }

    // Determine job type, with fallbacks
    const jobType = leadData.jobType || 'driveway';
    
    // Format job type for readability (convert from slug to title case)
    const formattedJobType = jobType
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Generate a unique lead ID
    const leadId = `L-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    
    // Get coordinates from zip code
    const coordinates = await getCoordinatesFromZipCode(leadData.zipCode);
    console.log("Coordinates for zip code:", coordinates);
    
    let matchedCampaignId = null;
    let matchedContractorIds: string[] = [];
    
    // If we have coordinates, find matching campaigns
    if (coordinates) {
      const [latitude, longitude] = coordinates;
      
      // Get active campaigns
      const { data: activeCampaigns, error: campaignsError } = await supabase
        .from('campaigns')
        .select('*, contractor_id')
        .eq('is_active', true);
      
      if (campaignsError) {
        console.error("Error fetching campaigns:", campaignsError);
      } else if (activeCampaigns && activeCampaigns.length > 0) {
        console.log(`Found ${activeCampaigns.length} active campaigns`);
        
        // Find campaigns that match both location (within radius) and job type
        const matchingCampaigns = activeCampaigns.filter(campaign => {
          // Check if campaign's job types include the lead's job type
          const jobTypeMatch = campaign.job_types.includes(jobType);
          if (!jobTypeMatch) return false;
          
          // Calculate distance between lead and campaign location
          const distance = calculateDistance(
            latitude, 
            longitude, 
            campaign.latitude, 
            campaign.longitude
          );
          
          // Return true if within radius
          return distance <= campaign.radius_km;
        });
        
        if (matchingCampaigns.length > 0) {
          console.log(`Found ${matchingCampaigns.length} matching campaigns`);
          
          // For now, just use the first matching campaign
          // Could implement more sophisticated matching logic here
          matchedCampaignId = matchingCampaigns[0].campaign_id;
          
          // Collect unique contractor IDs from matching campaigns
          matchedContractorIds = [...new Set(
            matchingCampaigns.map(campaign => campaign.contractor_id)
          )] as string[];
        }
      }
    }
    
    // If no campaigns matched, fall back to the old method of finding contractors
    if (matchedContractorIds.length === 0) {
      // Find matching contractors based on zip code and job type
      const { data: matchingContractors, error: matchError } = await supabase
        .from('contractor_signups')
        .select('*')
        .containsAny('job_types', [jobType])
        .limit(3);
        
      if (matchError) {
        console.error("Error finding matching contractors:", matchError);
      }
      
      matchedContractorIds = matchingContractors?.map(c => c.id) || [];
    }
    
    // Extract UTM parameters and other tracking data
    const utmData: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      if (leadData[param]) utmData[param] = leadData[param];
    });
    
    // Store lead in Supabase
    const { data: leadRecord, error: insertError } = await supabase
      .from('leads')
      .insert({
        lead_id: leadId,
        name: leadData.name,
        email: emailInfo,
        phone: phoneInfo,
        job_type: jobType,
        formatted_job_type: formattedJobType,
        zip_code: leadData.zipCode,
        status: matchedContractorIds.length > 0 ? 'matched' : 'new',
        matched_contractor_ids: matchedContractorIds,
        campaign_id: matchedCampaignId,
        created_at: new Date().toISOString(),
        state: leadData.state || null,
        utm_source: utmData.utm_source || null,
        utm_medium: utmData.utm_medium || null,
        utm_campaign: utmData.utm_campaign || null,
        utm_term: utmData.utm_term || null,
        utm_content: utmData.utm_content || null,
        form_type: leadData.form_type || null,
        landing_url: leadData.landing_url || null,
        page_path: leadData.page_path || leadData.landing_url || null,
        details: leadData.details || null
      })
      .select();
    
    if (insertError) {
      console.error("Error storing lead in database:", insertError);
      throw new Error(`Failed to store lead: ${insertError.message}`);
    }

    // Send the email
    const emailResponse = await resend.emails.send({
      from: "Concrete Quotes <quotes@concreterquotes.com>",
      to: [recipientEmail],
      subject: "New Concrete Lead",
      html: `
        <h1>New Concrete Lead</h1>
        <p><strong>Lead ID:</strong> ${leadId}</p>
        <p><strong>Name:</strong> ${leadData.name}</p>
        <p><strong>Email:</strong> ${emailInfo || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${phoneInfo || 'Not provided'}</p>
        <p><strong>Job Type:</strong> ${formattedJobType}</p>
        <p><strong>Zip Code:</strong> ${leadData.zipCode}</p>
        <p><strong>State:</strong> ${leadData.state || 'Not specified'}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Matched Contractors:</strong> ${matchedContractorIds.length || 0}</p>
        ${matchedCampaignId ? `<p><strong>Matched Campaign:</strong> ${matchedCampaignId}</p>` : ''}
        ${utmData.utm_source ? `<p><strong>Source:</strong> ${utmData.utm_source}</p>` : ''}
        ${utmData.utm_campaign ? `<p><strong>Campaign:</strong> ${utmData.utm_campaign}</p>` : ''}
        ${utmData.utm_medium ? `<p><strong>Medium:</strong> ${utmData.utm_medium}</p>` : ''}
        ${leadData.form_type ? `<p><strong>Form Type:</strong> ${leadData.form_type}</p>` : ''}
        ${leadData.page_path ? `<p><strong>Page Path:</strong> ${leadData.page_path}</p>` : ''}
        ${leadData.details ? `<p><strong>Details:</strong> ${leadData.details}</p>` : ''}
      `,
      text: `
Lead ID: ${leadId}
Name: ${leadData.name}
Email: ${emailInfo || 'Not provided'}
Phone: ${phoneInfo || 'Not provided'}
Job Type: ${formattedJobType}
Zip Code: ${leadData.zipCode}
State: ${leadData.state || 'Not specified'}
Submitted: ${new Date().toLocaleString()}
Matched Contractors: ${matchedContractorIds.length || 0}
${matchedCampaignId ? `Matched Campaign: ${matchedCampaignId}` : ''}
${utmData.utm_source ? `Source: ${utmData.utm_source}` : ''}
${utmData.utm_campaign ? `Campaign: ${utmData.utm_campaign}` : ''}
${utmData.utm_medium ? `Medium: ${utmData.utm_medium}` : ''}
${leadData.form_type ? `Form Type: ${leadData.form_type}` : ''}
${leadData.page_path ? `Page Path: ${leadData.page_path}` : ''}
${leadData.details ? `Details: ${leadData.details}` : ''}
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Return success response with lead ID and match info
    return new Response(JSON.stringify({ 
      success: true, 
      message: "Lead submitted successfully",
      lead_id: leadId,
      matched_contractors: matchedContractorIds.length || 0,
      matched_campaign_id: matchedCampaignId
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Error in send-lead function:", error);
    
    // Return error response
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
};

// Start the HTTP server
serve(handler);
