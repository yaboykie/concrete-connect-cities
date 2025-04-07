
-- Function to get user disputes
CREATE OR REPLACE FUNCTION public.get_user_disputes(user_id UUID)
RETURNS TABLE(lead_id TEXT) 
LANGUAGE sql
SECURITY definer
AS $$
  SELECT lead_id FROM public.lead_disputes WHERE contractor_id = user_id;
$$;

-- Function to submit a lead dispute
CREATE OR REPLACE FUNCTION public.submit_lead_dispute(
  p_lead_id TEXT,
  p_contractor_id UUID,
  p_campaign_id UUID,
  p_reason TEXT DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY definer
AS $$
BEGIN
  INSERT INTO public.lead_disputes (lead_id, contractor_id, campaign_id, reason)
  VALUES (p_lead_id, p_contractor_id, p_campaign_id, p_reason);
END;
$$;

-- Function to get dispute details for a specific lead and contractor
CREATE OR REPLACE FUNCTION public.get_dispute_details(
  p_lead_id TEXT,
  p_contractor_id UUID
)
RETURNS TABLE(reason TEXT, created_at TIMESTAMPTZ) 
LANGUAGE sql
SECURITY definer
AS $$
  SELECT reason, created_at 
  FROM public.lead_disputes 
  WHERE lead_id = p_lead_id AND contractor_id = p_contractor_id;
$$;
