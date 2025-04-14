
import { supabase } from '@/integrations/supabase/client';

export async function getFinishPricingByState(state: string) {
  // Format state for consistency
  const formattedState = state.trim();
  
  console.log('Fetching pricing data for state:', {
    originalState: state,
    formattedState
  });
  
  try {
    // Try with exact state name match (case insensitive)
    let { data, error } = await supabase
      .from('concrete_driveway_estimate')
      .select('*')
      .ilike('State', formattedState);
      
    if (error) {
      console.error('Error fetching finish pricing with exact match:', error);
      return [];
    }
    
    // If no results found, try a more lenient search
    if (!data || data.length === 0) {
      console.log('No exact state match found. Trying partial match...');
      const { data: partialData, error: partialError } = await supabase
        .from('concrete_driveway_estimate')
        .select('*')
        .ilike('State', `%${formattedState}%`);
        
      if (partialError) {
        console.error('Error fetching finish pricing with partial match:', partialError);
      } else if (partialData && partialData.length > 0) {
        console.log(`Found ${partialData.length} records using partial match`);
        data = partialData;
      }
    }
    
    // If still no results, get any available data as fallback
    if (!data || data.length === 0) {
      console.log('No state-specific data found, retrieving general pricing data...');
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('concrete_driveway_estimate')
        .select('*')
        .limit(10);
        
      if (fallbackError) {
        console.error('Fallback query error:', fallbackError);
        return [];
      }
      
      console.log(`Retrieved ${fallbackData?.length || 0} fallback pricing records`);
      return fallbackData || [];
    }
    
    console.log(`Retrieved ${data.length} pricing records for state:`, formattedState);
    return data;
  } catch (err) {
    console.error('Unexpected error in getFinishPricingByState:', err);
    return [];
  }
}
