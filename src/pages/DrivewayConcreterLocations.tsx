
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getLocationContent, getPerformanceMetrics } from '@/components/driveway-concreters/LocationContent';
import { LocationContentType } from '@/components/driveway-concreters/types';
import { toast } from '@/components/ui/use-toast';
import { handleLegacyUrl } from '@/components/driveway-concreters/utils/urlUtils';
import MainLocationsView from '@/components/driveway-concreters/MainLocationsView';
import StateLocationsView from '@/components/driveway-concreters/StateLocationsView';
import LoadingView from '@/components/driveway-concreters/LoadingView';
import ErrorView from '@/components/driveway-concreters/ErrorView';
import LocationDetailsView from '@/components/driveway-concreters/LocationDetailsView';

// Set appropriate cache control headers for static generation/CDN caching
const setCacheControlHeaders = () => {
  if (typeof document !== 'undefined') {
    // This only works on the server side, but we can simulate it for development
    console.log('Setting cache-control header: max-age=86400, stale-while-revalidate=86400');
  }
};

const DrivewayConcreterLocations = () => {
  const { state, city } = useParams<{ state: string; city: string }>();
  const [locationContent, setLocationContent] = useState<LocationContentType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Set cache control headers
    setCacheControlHeaders();
    
    // Handle legacy URLs
    if (handleLegacyUrl(location.pathname, navigate)) {
      return;
    }
    
    // If we have both state and city parameters, fetch city-specific content
    if (state && city) {
      fetchLocationContent();
    } else {
      // If we only have a state parameter or no parameters, don't need to fetch city content
      setIsLoading(false);
    }
  }, [state, city, location.pathname, navigate]);

  const fetchLocationContent = async () => {
    if (!state || !city) return;
    
    try {
      setIsLoading(true);
      const content = await getLocationContent(state, city);
      setLocationContent(content);
      setError(null);
      
      // Log for performance monitoring
      const metrics = getPerformanceMetrics(`${state}_${city}`);
      if (metrics && 'loadCount' in metrics && metrics.loadCount > 1) {
        console.log(`Page loaded ${metrics.loadCount} times with avg time: ${
          Math.round(metrics.totalLoadTime / metrics.loadCount)
        }ms`);
      }
    } catch (err) {
      console.error("Error fetching location content:", err);
      setError("Failed to load location data. Please try again later.");
      
      // Show error toast
      toast({
        title: "Error loading location data",
        description: "We're having trouble loading this location. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // If no parameters, show the main locations list
  if (!state && !city) {
    return <MainLocationsView />;
  }
  
  // If only state parameter is present, show cities in that state
  if (state && !city) {
    return <StateLocationsView state={state} />;
  }
  
  if (isLoading) {
    return <LoadingView />;
  }
  
  if (error || !locationContent) {
    return <ErrorView error={error} onRetry={() => window.location.reload()} />;
  }
  
  return (
    <LocationDetailsView 
      locationContent={locationContent} 
      state={state} 
      city={city} 
    />
  );
};

export default DrivewayConcreterLocations;
