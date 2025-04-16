
import { supabase } from '@/integrations/supabase/client';

export const getFinishPricingByState = async (state: string) => {
  try {
    // Normalize state input (remove whitespace, convert to title case)
    const normalizedState = state.trim().replace(/\w\S*/g, 
      txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );

    console.log('Fetching pricing for state:', normalizedState);
    console.log('Using Supabase URL:', import.meta.env.VITE_SUPABASE_URL || 'fallback URL');

    // Use ilike for case-insensitive matching with wildcards
    const { data, error } = await supabase
      .from('concrete_driveway_estimate')
      .select('*')
      .ilike('State', `%${normalizedState}%`);

    if (error) {
      console.error('Error fetching state pricing:', error);
      return null;
    }

    console.log('Fetched pricing data:', data);
    
    // Log more details about returned data
    if (data && data.length > 0) {
      console.log(`Found ${data.length} pricing entries for ${normalizedState}`);
      console.log('Sample entry:', data[0]);
    } else {
      console.log(`No pricing data found for ${normalizedState}`);
      // Try a more lenient search if specific search fails
      console.log('Trying alternate search method...');
      const { data: altData, error: altError } = await supabase
        .from('concrete_driveway_estimate')
        .select('*')
        .limit(5);
      
      if (!altError && altData && altData.length > 0) {
        console.log('Available states in database:', altData.map(d => d.State).join(', '));
      }
    }

    return data;
  } catch (err) {
    console.error('Unexpected error in getFinishPricingByState:', err);
    return null;
  }
};
