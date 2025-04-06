
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
        status: 'new',
        created_at: new Date().toISOString(),
      })
      .select();
    
    if (insertError) {
      console.error("Error storing lead in database:", insertError);
      throw new Error(`Failed to store lead: ${insertError.message}`);
    }

    // Find matching contractors based on zip code and job type
    const { data: matchingContractors, error: matchError } = await supabase
      .from('contractor_signups')
      .select('*')
      .containsAny('job_types', [leadData.jobType])
      .limit(3);
      
    if (matchError) {
      console.error("Error finding matching contractors:", matchError);
    }
    
    const matchedContractorIds = matchingContractors?.map(c => c.id) || [];
    
    // If we found matches, update the lead record with matched contractors
    if (matchedContractorIds.length > 0) {
      await supabase
        .from('leads')
        .update({ 
          matched_contractor_ids: matchedContractorIds,
          status: 'matched'
        })
        .eq('lead_id', leadId);
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
        <p><strong>Matched Contractors:</strong> ${matchingContractors?.length || 0}</p>
      `,
      text: `
Lead ID: ${leadId}
Name: ${leadData.name}
Email: ${leadData.email}
Phone: ${leadData.phone}
Job Type: ${formattedJobType}
Zip Code: ${leadData.zipCode}
Submitted: ${new Date().toLocaleString()}
Matched Contractors: ${matchingContractors?.length || 0}
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Return success response with lead ID and match info
    return new Response(JSON.stringify({ 
      success: true, 
      message: "Lead submitted successfully",
      lead_id: leadId,
      matched_contractors: matchingContractors?.length || 0
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
