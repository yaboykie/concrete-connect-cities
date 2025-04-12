
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { LocationContentType } from './types';

interface SEOHeadProps {
  locationContent: LocationContentType;
  state: string;
  city: string;
}

export default function SEOHead({ locationContent, state, city }: SEOHeadProps) {
  const cityName = locationContent.fullLocation.split(',')[0];
  const stateCode = locationContent.fullLocation.split(',')[1]?.trim();
  
  const title = `Top Driveway Concreters in ${cityName}, ${stateCode} - Get Free Quotes`;
  const description = `Find trusted concrete driveway contractors in ${cityName}, ${stateCode}. Get free quotes, compare prices and hire the best local professionals for your project.`;
  const canonicalUrl = `https://concreterquotes.com/driveway-concreters/locations/${state}/${city}`;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Concrete Driveway Contractors in ${cityName}, ${stateCode}",
            "description": "${description}",
            "url": "${canonicalUrl}",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "${cityName}",
              "addressRegion": "${stateCode}"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "${locationContent.latitude || '0'}",
              "longitude": "${locationContent.longitude || '0'}"
            }
          }
        `}
      </script>
    </Helmet>
  );
}
