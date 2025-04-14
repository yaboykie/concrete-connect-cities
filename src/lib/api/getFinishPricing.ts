
import { supabase } from '@/integrations/supabase/client';
import { labelToFinishType } from '@/config/finishTypes';

// Extended default pricing data with state-specific information
const defaultPricingData = {
  // Default Texas pricing
  'texas': [
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
  ],
  // California pricing (slightly higher than Texas)
  'california': [
    {
      'UI Finish Label': 'Plain Concrete',
      'Finish Type': 'Broom Finish',
      'Price/Sqft': '$6-9',
      'Avg Size': '450-550 sqft',
      'Total Range': '$2,700-$4,950',
      'State': 'California'
    },
    {
      'UI Finish Label': 'Stamped Concrete',
      'Finish Type': 'Stamped Concrete',
      'Price/Sqft': '$15-22',
      'Avg Size': '450-550 sqft',
      'Total Range': '$6,750-$12,100',
      'State': 'California'
    },
    {
      'UI Finish Label': 'Exposed Aggregate',
      'Finish Type': 'Exposed Aggregate',
      'Price/Sqft': '$12-16',
      'Avg Size': '450-550 sqft',
      'Total Range': '$5,400-$8,800',
      'State': 'California'
    },
    {
      'UI Finish Label': 'Coloured Concrete',
      'Finish Type': 'Colored/Dyed',
      'Price/Sqft': '$10-15',
      'Avg Size': '450-550 sqft',
      'Total Range': '$4,500-$8,250',
      'State': 'California'
    },
    {
      'UI Finish Label': 'Pebble Finish',
      'Finish Type': 'Exposed Aggregate',
      'Price/Sqft': '$11-15',
      'Avg Size': '450-550 sqft',
      'Total Range': '$4,950-$8,250',
      'State': 'California'
    },
    {
      'UI Finish Label': 'Brushed Finish',
      'Finish Type': 'Broom Finish',
      'Price/Sqft': '$6-10',
      'Avg Size': '450-550 sqft',
      'Total Range': '$2,700-$5,500',
      'State': 'California'
    }
  ],
  // Florida pricing
  'florida': [
    {
      'UI Finish Label': 'Plain Concrete',
      'Finish Type': 'Broom Finish',
      'Price/Sqft': '$5-8',
      'Avg Size': '525-625 sqft',
      'Total Range': '$2,625-$5,000',
      'State': 'Florida'
    },
    {
      'UI Finish Label': 'Stamped Concrete',
      'Finish Type': 'Stamped Concrete',
      'Price/Sqft': '$11-16',
      'Avg Size': '525-625 sqft',
      'Total Range': '$5,775-$10,000',
      'State': 'Florida'
    },
    {
      'UI Finish Label': 'Exposed Aggregate',
      'Finish Type': 'Exposed Aggregate',
      'Price/Sqft': '$9-13',
      'Avg Size': '525-625 sqft',
      'Total Range': '$4,725-$8,125',
      'State': 'Florida'
    },
    {
      'UI Finish Label': 'Coloured Concrete',
      'Finish Type': 'Colored/Dyed',
      'Price/Sqft': '$8-12',
      'Avg Size': '525-625 sqft',
      'Total Range': '$4,200-$7,500',
      'State': 'Florida'
    },
    {
      'UI Finish Label': 'Pebble Finish',
      'Finish Type': 'Exposed Aggregate',
      'Price/Sqft': '$9-13',
      'Avg Size': '525-625 sqft',
      'Total Range': '$4,725-$8,125',
      'State': 'Florida'
    },
    {
      'UI Finish Label': 'Brushed Finish',
      'Finish Type': 'Broom Finish',
      'Price/Sqft': '$5-8',
      'Avg Size': '525-625 sqft',
      'Total Range': '$2,625-$5,000',
      'State': 'Florida'
    }
  ]
};

// Add other state mappings for common variations
const stateMapping = {
  'arizona': 'texas',
  'washington': 'california',
  'pennsylvania': 'texas',
  'ohio': 'texas',
  'illinois': 'texas',
  'georgia': 'florida',
  'north carolina': 'florida'
};

export async function getFinishPricingByState(state: string) {
  // Format state for consistency
  const formattedState = state.trim().toLowerCase();
  
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
      return getDefaultPricing(formattedState);
    }
    
    // Print all retrieved records for debugging
    console.log('Retrieved pricing records from database:', data?.length || 0);
    
    if (!data || data.length === 0) {
      console.log('No pricing data available in the database, using default data');
      return getDefaultPricing(formattedState);
    }

    // Log all UI Finish Label values in the data for debugging
    console.log('Available UI Finish Label values:', 
      [...new Set(data.map(item => item['UI Finish Label']))].filter(Boolean));
    
    // Log all State values in the data for debugging
    console.log('Available State values:', 
      [...new Set(data.map(item => item['State']))].filter(Boolean));
    
    // Filter for matching state (if any)
    let stateData = data.filter(item => 
      item['State'] && item['State'].toLowerCase() === formattedState
    );
    
    // If no state-specific data found, use default data for that state
    if (!stateData || stateData.length === 0) {
      console.log(`No data for "${formattedState}" in database, using default pricing data`);
      return getDefaultPricing(formattedState);
    }
    
    console.log(`Using ${stateData.length} pricing records for ${formattedState} from database`);
    return stateData;
  } catch (err) {
    console.error('Unexpected error in getFinishPricingByState:', err);
    console.log('Using default pricing data due to unexpected error');
    return getDefaultPricing(formattedState);
  }
}

// Helper function to get default pricing data for a specific state
function getDefaultPricing(stateName: string) {
  console.log(`Getting default pricing data for: ${stateName}`);
  
  // Direct match in our defaults
  if (defaultPricingData[stateName]) {
    console.log(`Found direct default pricing match for ${stateName}`);
    return defaultPricingData[stateName];
  }
  
  // Check if we have a mapping for this state to another state's pricing
  if (stateMapping[stateName]) {
    const mappedState = stateMapping[stateName];
    console.log(`Using mapped state pricing: ${stateName} -> ${mappedState}`);
    if (defaultPricingData[mappedState]) {
      // Clone the data and update the state name
      return defaultPricingData[mappedState].map(item => ({
        ...item,
        'State': stateName.charAt(0).toUpperCase() + stateName.slice(1) // Capitalize first letter
      }));
    }
  }
  
  // Fallback to Texas pricing if we don't have anything else
  console.log(`No specific default pricing for ${stateName}, using Texas pricing as final fallback`);
  return defaultPricingData['texas'].map(item => ({
    ...item,
    'State': stateName.charAt(0).toUpperCase() + stateName.slice(1) // Capitalize first letter
  }));
}
