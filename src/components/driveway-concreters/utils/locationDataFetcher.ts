
import { supabase, handleSupabaseError } from "@/integrations/supabase/client";
import { LocationData } from '../types';

/**
 * Fetches location data from the Supabase database
 */
export const fetchLocationFromSupabase = async (
  state: string,
  city: string
): Promise<{ locationData: Partial<LocationData> | null; mapData: any | null; error: string | null }> => {
  console.log(`Fetching location data for ${city}, ${state}`);
  
  try {
    // Format city name for database query (capitalize first letter of each word)
    const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const stateUpper = state.toUpperCase();
    
    // Try to get location data from Supabase - first from the All locations table
    const { data: locationData, error } = await supabase
      .from("All locations")
      .select("*")
      .eq("state_abbreviation", stateUpper)
      .ilike("city", formattedCity)
      .maybeSingle();

    if (error) {
      console.error("Error fetching from All locations:", error);
      return { locationData: null, mapData: null, error: error.message };
    }

    // Also try to get from the Location Data table which has map embeds
    const { data: mapData, error: mapError } = await supabase
      .from("Location Data for Location pages")
      .select("*")
      .eq("State", stateUpper)
      .ilike("City", formattedCity)
      .maybeSingle();

    if (mapError) {
      console.error("Error fetching map data:", mapError);
      return { locationData, mapData: null, error: mapError.message };
    }

    console.log("Supabase location data:", locationData);
    console.log("Supabase map data:", mapData);

    return { locationData, mapData, error: null };
  } catch (error) {
    console.error("Unexpected error in fetchLocationFromSupabase:", error);
    return { locationData: null, mapData: null, error: error instanceof Error ? error.message : "Unknown error" };
  }
};
