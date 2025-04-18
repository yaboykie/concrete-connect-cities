
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
    const { name, email, zipCode, estimate, jobType } = await req.json();

    // Log received data for debugging
    console.log("Received lead data:", { name, email, zipCode, estimate, jobType });

    const { data, error } = await resend.emails.send({
      from: "ConcreterQuotes <onboarding@resend.dev>",
      to: ["kierontaylor1995@gmail.com"],
      subject: "New Driveway Estimate Lead",
      html: `
        <h2>New Lead Details:</h2>
        <p><strong>Name:</strong> ${name || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
        <p><strong>Zip Code:</strong> ${zipCode || 'Not provided'}</p>
        <p><strong>Estimate:</strong> ${estimate || 'Not provided'}</p>
        <p><strong>Job Type:</strong> ${jobType || 'Concrete Driveway'}</p>
      `,
    });

    if (error) {
      console.error("Resend email error:", error);
      throw error;
    }

    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true }), {
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
