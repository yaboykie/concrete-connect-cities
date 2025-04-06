
import { supabase } from "@/integrations/supabase/client";
import { finishIdToLabel } from "@/config/finishTypes";

export async function getFinishPricingByState(state: string) {
  // For now, this is a mock implementation that returns the same data for any state
  // In a real implementation, you would fetch this data from Supabase or another API
  
  // This uses the existing finishRates from finishTypes.ts as a fallback
  const mockPricing = [
    { finish: "Plain Grey", min_rate: 5.5, max_rate: 7.5 },
    { finish: "Exposed Aggregate", min_rate: 10, max_rate: 13 },
    { finish: "Stamped Concrete", min_rate: 12, max_rate: 16 },
    { finish: "Coloured Concrete", min_rate: 9, max_rate: 12 },
    { finish: "Pebble Finish", min_rate: 8, max_rate: 10 },
    { finish: "Brushed Finish", min_rate: 6, max_rate: 8 }
  ];
  
  // In the future, you can replace this with an actual API call:
  // const { data, error } = await supabase
  //   .from('finish_pricing')
  //   .select('*')
  //   .eq('state', state);
  
  // if (error) {
  //   console.error('Error fetching pricing:', error);
  //   return mockPricing;
  // }
  
  // return data.length > 0 ? data : mockPricing;
  
  console.log(`Fetching pricing for state: ${state}`);
  return mockPricing;
}
