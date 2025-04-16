
import { supabase } from '@/integrations/supabase/client';

export const getFinishPricingByState = async (state: string) => {
  try {
    // Normalize state input (remove whitespace, convert to title case)
    const normalizedState = state.trim().replace(/\w\S*/g, 
      txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );

    console.log('Fetching pricing for state:', normalizedState);

    const { data, error } = await supabase
      .from('concrete_driveway_estimate')
      .select('*')
      .ilike('State', `%${normalizedState}%`);

    if (error) {
      console.error('Error fetching state pricing:', error);
      return null;
    }

    console.log('Fetched pricing data:', data);
    return data;
  } catch (err) {
    console.error('Unexpected error in getFinishPricingByState:', err);
    return null;
  }
};
