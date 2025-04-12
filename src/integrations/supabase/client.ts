
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aiyzpzibgrgqslsoulgj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpeXpwemliZ3JncXNsc291bGdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MjMyMTYsImV4cCI6MjA1ODk5OTIxNn0.haluELacZINIK1dJ7sVwBraK0jcQAlMjrjvlp58RJRQ";

export const supabase = createClient(supabaseUrl, supabaseKey);
