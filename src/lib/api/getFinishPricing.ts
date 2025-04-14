
import { supabase } from '@/integrations/supabase/client';

export async function getFinishPricingByState(state: string) {
  // Format state for consistency (California vs california)
  const formattedState = state.trim();
  console.log('Fetching pricing data for state:', formattedState);
  
  // Log the query we're about to make
  console.log(`Querying concrete_estimates where state_code = "${formattedState}"`);
  
  const { data, error } = await supabase
    .from('concrete_estimates')
    .select('*')
    .ilike('state_code', formattedState);
    
  if (error) {
    console.error('Error fetching finish pricing:', error);
    return [];
  }
  
  // Log what we got back
  console.log(`Retrieved ${data?.length || 0} pricing records:`, data);
  
  // If we have no data, try a more flexible search as fallback
  if (!data || data.length === 0) {
    console.log('No data found with exact match, trying with partial match');
    
    const { data: fallbackData, error: fallbackError } = await supabase
      .from('concrete_estimates')
      .select('*')
      .limit(10);
      
    if (fallbackError) {
      console.error('Error fetching finish pricing with fallback:', fallbackError);
      return [];
    }
    
    console.log(`Retrieved ${fallbackData?.length || 0} fallback pricing records:`, fallbackData);
    return fallbackData || [];
  }
  
  return data;
}
