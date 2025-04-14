
import { supabase } from '@/integrations/supabase/client';

export async function getFinishPricingByState(state: string) {
  // Format state for consistency by standardizing case (lowercase) and trimming
  const formattedState = state.trim().toLowerCase();
  console.log('Fetching pricing data for state:', formattedState);
  
  try {
    // Query from the concrete_driveway_estimate table (note the change to this table name)
    const { data, error } = await supabase
      .from('concrete_driveway_estimate')
      .select('*')
      .ilike('State', `%${formattedState}%`);
      
    if (error) {
      console.error('Error fetching finish pricing:', error);
      return [];
    }
    
    // Log what we got back
    console.log(`Retrieved ${data?.length || 0} pricing records from concrete_driveway_estimate:`, data);
    
    // If we have no data, try with a more general search as fallback
    if (!data || data.length === 0) {
      console.log('No data found with state match, trying fallback query');
      
      // Fallback: get any data
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('concrete_driveway_estimate')
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
  } catch (err) {
    console.error('Unexpected error in getFinishPricingByState:', err);
    return [];
  }
}
