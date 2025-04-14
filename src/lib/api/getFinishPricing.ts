
import { supabase } from '@/integrations/supabase/client';

// Helper function to get state code from name
const getStateCode = (stateName: string): string => {
  const stateMap: Record<string, string> = {
    'washington': 'wa',
    'pennsylvania': 'pa',
    'ohio': 'oh',
    'illinois': 'il',
    'georgia': 'ga',
    'north carolina': 'nc',
    'arizona': 'az',
    'california': 'ca',
    'florida': 'fl',
    'texas': 'tx'
  };
  
  return stateMap[stateName.toLowerCase()] || stateName.toLowerCase();
};

// Helper function to normalize state name
const normalizeStateName = (stateName: string): string => {
  return stateName.trim().toLowerCase();
};

export async function getFinishPricingByState(state: string) {
  // Format state for consistency
  const formattedState = state.trim();
  const normalizedState = normalizeStateName(formattedState);
  const stateCode = getStateCode(normalizedState);
  
  console.log('Fetching pricing data for state:', {
    originalState: state,
    formattedState,
    normalizedState,
    stateCode
  });
  
  try {
    // First try with exact state name match
    let { data, error } = await supabase
      .from('concrete_driveway_estimate')
      .select('*')
      .ilike('State', formattedState);
      
    if (error) {
      console.error('Error fetching finish pricing with exact match:', error);
      return [];
    }
    
    // If no results, try with state code
    if (!data || data.length === 0) {
      console.log('No results with exact state name, trying with state code...');
      const { data: stateCodeData, error: stateCodeError } = await supabase
        .from('concrete_driveway_estimate')
        .select('*')
        .ilike('State', stateCode);
        
      if (stateCodeError) {
        console.error('Error fetching finish pricing with state code:', stateCodeError);
      } else if (stateCodeData && stateCodeData.length > 0) {
        console.log(`Found ${stateCodeData.length} records using state code ${stateCode}`);
        data = stateCodeData;
      }
    }
    
    // If still no results, try with a more lenient search
    if (!data || data.length === 0) {
      console.log('Trying partial state name match...');
      const { data: partialData, error: partialError } = await supabase
        .from('concrete_driveway_estimate')
        .select('*')
        .ilike('State', `%${normalizedState}%`);
        
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
