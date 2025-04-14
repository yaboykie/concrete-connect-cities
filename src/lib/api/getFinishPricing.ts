
import { supabase } from '@/integrations/supabase/client';

export async function getFinishPricingByState(state: string) {
  // Format state for consistency by standardizing case (lowercase) and trimming
  const formattedState = state.trim().toLowerCase();
  console.log('Fetching pricing data for state:', formattedState);
  
  // Log the query we're about to make
  console.log(`Querying concrete_estimates where state_code ilike "${formattedState}"`);
  
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
    console.log('No data found with exact match, trying with fallback search');
    
    // First try with a partial match on the state name
    const { data: partialData, error: partialError } = await supabase
      .from('concrete_estimates')
      .select('*')
      .ilike('state_code', `%${formattedState}%`);
      
    if (partialError) {
      console.error('Error fetching finish pricing with partial match:', partialError);
    } else if (partialData && partialData.length > 0) {
      console.log(`Found ${partialData.length} records with partial state match:`, partialData);
      return partialData;
    }
    
    // If partial match failed, get any available pricing data as a last resort
    console.log('No data found with partial match, retrieving any available pricing data');
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
