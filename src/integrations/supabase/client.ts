
import { createClient } from "@supabase/supabase-js";

// Use environment variables if available, otherwise fall back to hardcoded values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://aiyzpzibgrgqslsoulgj.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpeXpwemliZ3JncXNsc291bGdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MjMyMTYsImV4cCI6MjA1ODk5OTIxNn0.haluELacZINIK1dJ7sVwBraK0jcQAlMjrjvlp58RJRQ";

// Log the client configuration for debugging
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", supabaseKey ? "Configured (key hidden)" : "Missing");

export const supabase = createClient(supabaseUrl, supabaseKey);
