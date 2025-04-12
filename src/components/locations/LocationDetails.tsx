import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import LocationDetailsView from '@/components/driveway-concreters/LocationDetailsView';
import LoadingView from '@/components/driveway-concreters/LoadingView';
import { getLocationContent } from '@/components/driveway-concreters/LocationContent';
import { LocationContentType } from '@/components/driveway-concreters/types';
import { getFallbackLocationContent } from '@/components/driveway-concreters/utils/fallbackContentGenerator';

const mockData: LocationContentType = {
  title: 'Top-Rated Concrete Driveway Contractors in Phoenix, Arizona',
  serviceIntro: 'Looking for professional concrete driveway installation in Phoenix, Arizona? Our network of experienced local contractors specialize in creating beautiful, durable driveways that enhance your home\'s curb appeal and add lasting value to your property.',
  weatherConsiderations: 'In Phoenix, Arizona, local weather patterns can significantly impact concrete work. Our local contractors understand how to prepare, pour, and cure concrete specifically for the Arizona climate, ensuring your driveway stands up to local weather conditions year after year.',
  faqs: [
    {
      question: 'How much does a concrete driveway cost in Phoenix?',
      answer: 'In Phoenix, concrete driveway costs typically range from $5-$10 per square foot for standard finishes. Premium options like stamped or colored concrete can range from $12-$18 per square foot. Factors affecting price include size, complexity, and concrete thickness.'
    }
  ],
  services: [
    {
      title: 'Stamped Concrete Driveways',
      description: 'Our Phoenix contractors specialize in creating beautiful stamped concrete driveways that mimic the look of stone, brick, or other materials at a fraction of the cost.'
    }
  ],
  testimonials: [
    {
      name: 'Michael T.',
      location: 'Phoenix',
      text: 'The driveway contractor I found through ConcreterQuotes was fantastic. They completed my driveway on time and on budget. The finished result looks amazing!',
      rating: 5
    }
  ],
  fullLocation: 'Phoenix, Arizona',
  latitude: 33.4484,
  longitude: -112.0740,
  googleMapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d425.4930078355583!2d-112.0740!3d33.4484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI2JzU0LjIiTiAxMTLCsDA0JzI2LjQiVw!5e0!3m2!1sen!2sus!4v1621123456789!5m2!1sen!2sus',
  schemaData: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Concrete Driveway Installation in Phoenix, Arizona",
    "description": "Professional concrete driveway services in Phoenix"
  },
  metaDescription: 'Find top-rated concrete driveway contractors in Phoenix, Arizona. Get free quotes, compare contractors, and hire the best professional for your driveway project.'
};

const LocationDetails = () => {
  const { state, city } = useParams<{ state: string; city: string }>();
  const [locationContent, setLocationContent] = useState<LocationContentType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('LocationDetails component mounted with params:', { state, city });
    
    if (!state || !city) {
      console.error('Missing route parameters');
      setError('Missing location information');
      setIsLoading(false);
      return;
    }
    
    const fetchLocationContent = async () => {
      try {
        setIsLoading(true);
        console.log(`Fetching content for ${state}/${city}...`);
        
        const content = await getLocationContent(state, city);
        
        if (content) {
          console.log('Content fetched successfully:', {
            contentKeys: Object.keys(content),
            fullLocation: content.fullLocation
          });
          setLocationContent(content);
          setError(null);
        } else {
          console.log('No content found, using fallback content');
          const fallbackContent = getFallbackLocationContent(state, city);
          setLocationContent(fallbackContent);
        }
      } catch (err) {
        console.error("Error fetching location content:", err);
        
        console.log('Error fetching data, using mock data for preview');
        setLocationContent(mockData);
        
        setError(`Failed to load location data: ${err instanceof Error ? err.message : String(err)}`);
        
        toast({
          title: "Using preview data",
          description: "We're showing preview data for this location.",
          variant: "default"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLocationContent();
  }, [state, city]);
  
  if (isLoading) {
    return <LoadingView />;
  }
  
  if (!locationContent) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Location Not Available</h1>
        <p className="mb-4">We couldn't find information for {city}, {state}.</p>
        <p>Please try a different location or check back later.</p>
      </div>
    );
  }
  
  return (
    <LocationDetailsView 
      locationContent={locationContent} 
      state={state || ''} 
      city={city || ''} 
    />
  );
};

export default LocationDetails;
