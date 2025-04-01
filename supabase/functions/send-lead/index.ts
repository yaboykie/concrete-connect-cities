
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Get the API key from environment variable
const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(resendApiKey);
const recipientEmail = "kierontaylor1995@gmail.com";

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

    // Send the email
    const emailResponse = await resend.emails.send({
      from: "Concrete Quotes <quotes@concreterquotes.com>",
      to: [recipientEmail],
      subject: "New Concrete Lead",
      html: `
        <h1>New Concrete Lead</h1>
        <p><strong>Name:</strong> ${leadData.name}</p>
        <p><strong>Email:</strong> ${leadData.email}</p>
        <p><strong>Phone:</strong> ${leadData.phone}</p>
        <p><strong>Job Type:</strong> ${formattedJobType}</p>
        <p><strong>Zip Code:</strong> ${leadData.zipCode}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `,
      text: `
Name: ${leadData.name}
Email: ${leadData.email}
Phone: ${leadData.phone}
Job Type: ${formattedJobType}
Zip Code: ${leadData.zipCode}
Submitted: ${new Date().toLocaleString()}
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Return success response
    return new Response(JSON.stringify({ success: true, message: "Lead submitted successfully" }), {
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
