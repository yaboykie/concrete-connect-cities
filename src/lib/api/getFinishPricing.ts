
import { supabase } from '@/integrations/supabase/client';
import { labelToFinishType } from '@/config/finishTypes';

export async function getFinishPricingByState(state: string) {
  // Format state for consistency
  const formattedState = state.trim();
  
  console.log('Fetching pricing data for state:', {
    originalState: state,
    formattedState
  });
  
  try {
    // Try with exact state name match (case insensitive)
    const { data, error } = await supabase
      .from('concrete_driveway_estimate')
      .select('*');
      
    if (error) {
      console.error('Error fetching finish pricing:', error);
      return [];
    }
    
    // Print all retrieved records for debugging
    console.log('Retrieved all pricing records from database:', data);
    
    // Filter for matching state (if any)
    let stateData = data.filter(item => 
      item.State && item.State.toLowerCase() === formattedState.toLowerCase()
    );
    
    // If no state-specific data found, use Texas data
    if (!stateData || stateData.length === 0) {
      console.log(`No data for "${formattedState}", using Texas data as fallback`);
      stateData = data.filter(item => 
        item.State && item.State.toLowerCase() === 'texas'
      );
    }
    
    console.log(`Using ${stateData.length} pricing records:`, stateData);
    return stateData;
  } catch (err) {
    console.error('Unexpected error in getFinishPricingByState:', err);
    return [];
  }
}
