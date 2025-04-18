
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { name, email, zipCode, estimate, jobType, details, phone } = await req.json();

    // Log received data for debugging
    console.log("Received lead data:", { name, email, zipCode, estimate, jobType, details, phone });

    // Build a more detailed email based on available information
    let emailContent = `
      <h2>New Lead Details:</h2>
      <p><strong>Name:</strong> ${name || 'Not provided'}</p>
      <p><strong>Email:</strong> ${email || 'Not provided'}</p>
    `;

    // Add optional fields if they exist
    if (zipCode) emailContent += `<p><strong>Zip Code:</strong> ${zipCode}</p>`;
    if (estimate) emailContent += `<p><strong>Estimate:</strong> ${estimate}</p>`;
    if (jobType) emailContent += `<p><strong>Job Type:</strong> ${jobType}</p>`;
    if (phone) emailContent += `<p><strong>Phone:</strong> ${phone}</p>`;
    if (details) emailContent += `<p><strong>Additional Details:</strong> ${details}</p>`;

    emailContent += `
      <p><em>Lead submitted at: ${new Date().toLocaleString()}</em></p>
      <p><strong>Source URL:</strong> ${req.headers.get('referer') || 'Unknown'}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: "ConcreterQuotes <onboarding@resend.dev>",
      to: ["kierontaylor1995@gmail.com"],
      subject: "New Driveway Estimate Lead",
      html: emailContent,
    });

    if (error) {
      console.error("Resend email error:", error);
      throw error;
    }

    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Function error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
