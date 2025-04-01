/**
 * Helper functions for formatting location names
 */

/**
 * Formats a city name (capitalizes first letter of each word)
 */
export const formatCityName = (city: string): string => {
  return city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

/**
 * Formats a state name based on length
 * If more than 2 characters, assume it's a full name and capitalize
 * Otherwise, assume it's an abbreviation and convert to uppercase
 */
export const formatStateName = (state: string | null | undefined, stateAbbr?: string | null): string => {
  if (state && state.length > 2) {
    // If we have the full state name, capitalize first letter of each word
    return state.replace(/\b\w/g, l => l.toUpperCase());
  } else if (stateAbbr) {
    // If we have the abbreviation, keep it uppercase (standard for abbreviations)
    return stateAbbr.toUpperCase();
  } else if (state) {
    // Fallback to the input state
    return state.length > 2 
      ? state.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) 
      : state.toUpperCase();
  }
  
  // Final fallback
  return "Unknown";
};

/**
 * Creates a full location string (City, State)
 */
export const createFullLocation = (city: string, state: string): string => {
  return `${city}, ${state}`;
};
