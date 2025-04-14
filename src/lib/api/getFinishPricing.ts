
import { supabase } from '@/integrations/supabase/client';

export async function getFinishPricingByState(state: string) {
  console.log('Fetching pricing data for state:', state);
  
  const { data, error } = await supabase
    .from('concrete_estimates')
    .select('*')
    .eq('state_code', state);
    
  if (error) {
    console.error('Error fetching finish pricing:', error);
    return [];
  }
  
  console.log('Retrieved pricing data:', data);
  return data || [];
}
