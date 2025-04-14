
import { supabase } from '@/integrations/supabase/client';
import { labelToFinishType } from '@/config/finishTypes';

// Default pricing fallbacks to use when no data is available
const defaultPricingData = [
  {
    'UI Finish Label': 'Plain Concrete',
    'Finish Type': 'Broom Finish',
    'Price/Sqft': '$5-7',
    'Avg Size': '500-600 sqft',
    'Total Range': '$2,500-$4,200',
    'State': 'Texas'
  },
  {
    'UI Finish Label': 'Stamped Concrete',
    'Finish Type': 'Stamped Concrete',
    'Price/Sqft': '$12-18',
    'Avg Size': '500-600 sqft',
    'Total Range': '$6,000-$10,800',
    'State': 'Texas'
  },
  {
    'UI Finish Label': 'Exposed Aggregate',
    'Finish Type': 'Exposed Aggregate',
    'Price/Sqft': '$10-13',
    'Avg Size': '500-600 sqft',
    'Total Range': '$5,000-$7,800',
    'State': 'Texas'
  },
  {
    'UI Finish Label': 'Coloured Concrete',
    'Finish Type': 'Colored/Dyed',
    'Price/Sqft': '$8-12',
    'Avg Size': '500-600 sqft',
    'Total Range': '$4,000-$7,200',
    'State': 'Texas'
  },
  {
    'UI Finish Label': 'Pebble Finish',
    'Finish Type': 'Exposed Aggregate',
    'Price/Sqft': '$9-12',
    'Avg Size': '500-600 sqft',
    'Total Range': '$4,500-$7,200',
    'State': 'Texas'
  },
  {
    'UI Finish Label': 'Brushed Finish',
    'Finish Type': 'Broom Finish',
    'Price/Sqft': '$5-8',
    'Avg Size': '500-600 sqft',
    'Total Range': '$2,500-$4,800',
    'State': 'Texas'
  }
];

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
      console.log('Using default pricing data due to fetch error');
      return defaultPricingData;
    }
    
    // Print all retrieved records for debugging
    console.log('Retrieved pricing records from database:', data?.length || 0);
    
    if (!data || data.length === 0) {
      console.log('No pricing data available in the database, using default data');
      return defaultPricingData;
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
      
      // If still no data, use our default pricing data
      if (!stateData || stateData.length === 0) {
        console.log('No Texas data found either, using default pricing data');
        return defaultPricingData;
      }
    }
    
    console.log(`Using ${stateData.length} pricing records for ${formattedState}`);
    return stateData;
  } catch (err) {
    console.error('Unexpected error in getFinishPricingByState:', err);
    console.log('Using default pricing data due to unexpected error');
    return defaultPricingData;
  }
}
