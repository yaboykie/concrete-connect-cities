
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
  jobType: string;
  zipCode: string;
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

// Function to get coordinates from zip code
async function getCoordinatesFromZipCode(zipCode: string): Promise<[number, number] | null> {
  try {
    // First check if we have this zip code in our Location Data table
    const { data: locationData, error: locationError } = await supabase
      .from('Location Data + URL Structure')
      .select('Latitude, Longitude')
      .eq('City', zipCode)
      .maybeSingle();
    
    if (locationData?.Latitude && locationData?.Longitude) {
      return [locationData.Latitude, locationData.Longitude];
    }
    
    // If not found in our db, could add a fallback to a geocoding API here
    // For now, return null if not found
    return null;
  } catch (error) {
    console.error("Error getting coordinates from zip code:", error);
    return null;
  }
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

    // Basic validation
    if (!leadData.name || !leadData.email || !leadData.phone || !leadData.jobType || !leadData.zipCode) {
      throw new Error("Missing required fields");
    }

    // Format job type for readability (convert from slug to title case)
    const formattedJobType = leadData.jobType
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
          const jobTypeMatch = campaign.job_types.includes(leadData.jobType);
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
        .containsAny('job_types', [leadData.jobType])
        .limit(3);
        
      if (matchError) {
        console.error("Error finding matching contractors:", matchError);
      }
      
      matchedContractorIds = matchingContractors?.map(c => c.id) || [];
    }
    
    // Store lead in Supabase
    const { data: leadRecord, error: insertError } = await supabase
      .from('leads')
      .insert({
        lead_id: leadId,
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        job_type: leadData.jobType,
        formatted_job_type: formattedJobType,
        zip_code: leadData.zipCode,
        status: matchedContractorIds.length > 0 ? 'matched' : 'new',
        matched_contractor_ids: matchedContractorIds,
        campaign_id: matchedCampaignId,
        created_at: new Date().toISOString(),
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
        <p><strong>Email:</strong> ${leadData.email}</p>
        <p><strong>Phone:</strong> ${leadData.phone}</p>
        <p><strong>Job Type:</strong> ${formattedJobType}</p>
        <p><strong>Zip Code:</strong> ${leadData.zipCode}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Matched Contractors:</strong> ${matchedContractorIds.length || 0}</p>
        ${matchedCampaignId ? `<p><strong>Matched Campaign:</strong> ${matchedCampaignId}</p>` : ''}
      `,
      text: `
Lead ID: ${leadId}
Name: ${leadData.name}
Email: ${leadData.email}
Phone: ${leadData.phone}
Job Type: ${formattedJobType}
Zip Code: ${leadData.zipCode}
Submitted: ${new Date().toLocaleString()}
Matched Contractors: ${matchedContractorIds.length || 0}
${matchedCampaignId ? `Matched Campaign: ${matchedCampaignId}` : ''}
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
