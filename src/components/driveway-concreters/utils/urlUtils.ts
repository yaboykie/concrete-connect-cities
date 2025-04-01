
import { NavigateFunction } from 'react-router-dom';

export const handleLegacyUrl = (
  pathname: string,
  navigate: NavigateFunction
): boolean => {
  // Handle legacy URLs in the format /driveway-concreters/city-state
  // and redirect to the new format /driveway-concreters/locations/state/city
  if (pathname.includes('/driveway-concreters/') && !pathname.includes('/locations/')) {
    // Extract city-state from URL
    const pathSegments = pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    
    if (lastSegment && lastSegment.includes('-')) {
      const parts = lastSegment.split('-');
      if (parts.length >= 2) {
        // Last part is the state code
        const stateCode = parts[parts.length - 1];
        // Everything before is the city
        const cityName = parts.slice(0, parts.length - 1).join('-');
        
        // Redirect to the new format
        navigate(`/driveway-concreters/locations/${stateCode}/${cityName}`, { replace: true });
        return true;
      }
    }
  }
  
  return false;
};
