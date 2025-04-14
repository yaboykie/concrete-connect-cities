
import { supabase } from '@/integrations/supabase/client';

export async function getFinishPricingByState(state: string) {
  // Format state for consistency
  const formattedState = state.trim();
  console.log('Fetching pricing data for state:', formattedState);
  
  try {
    const { data, error } = await supabase
      .from('concrete_driveway_estimate')
      .select('*')
      .ilike('State', `%${formattedState}%`);
      
    if (error) {
      console.error('Error fetching finish pricing:', error);
      return [];
    }
    
    console.log(`Retrieved ${data?.length || 0} pricing records:`, data);
    
    // If no data found, try a more lenient search
    if (!data || data.length === 0) {
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('concrete_driveway_estimate')
        .select('*')
        .limit(10);
        
      if (fallbackError) {
        console.error('Fallback query error:', fallbackError);
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
