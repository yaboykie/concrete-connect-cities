
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
    // Get all pricing data without filtering by state at the database level
    const { data, error } = await supabase
      .from('concrete_driveway_estimate')
      .select('*');
      
    if (error) {
      console.error('Error fetching finish pricing:', error);
      return [];
    }
    
    // Print all retrieved records for debugging
    console.log('Retrieved pricing records from database:', data?.length || 0);
    
    if (!data || data.length === 0) {
      console.log('No pricing data available in the database');
      return [];
    }

    // Log all UI Finish Label values in the data for debugging
    console.log('Available UI Finish Label values:', 
      [...new Set(data.map(item => item['UI Finish Label']))].filter(Boolean));
    
    // Log all State values in the data for debugging
    console.log('Available State values:', 
      [...new Set(data.map(item => item['State']))].filter(Boolean));
    
    // Filter for matching state (if any)
    let stateData = data.filter(item => 
      item['State'] && item['State'].toLowerCase() === formattedState.toLowerCase()
    );
    
    // If no state-specific data found, use Texas data
    if (!stateData || stateData.length === 0) {
      console.log(`No data for "${formattedState}", using Texas data as fallback`);
      stateData = data.filter(item => 
        item['State'] && item['State'].toLowerCase() === 'texas'
      );
    }
    
    console.log(`Using ${stateData.length} pricing records for ${formattedState}`);
    return stateData;
  } catch (err) {
    console.error('Unexpected error in getFinishPricingByState:', err);
    return [];
  }
}
