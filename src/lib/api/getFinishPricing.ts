
import { supabase } from '@/integrations/supabase/client';

export async function getFinishPricingByState(state: string) {
  const { data, error } = await supabase
    .from('concrete_estimates')
    .select('*')
    .eq('state_code', state);
    
  if (error) {
    console.error('Error fetching finish pricing:', error);
    return [];
  }
  
  return data || [];
}
