
/**
 * Generates schema data for SEO
 */
export const generateSchemaData = (
  fullLocation: string,
  city: string,
  state: string,
  latitude: number | null, 
  longitude: number | null,
  existingSchemaData: any = null
) => {
  return existingSchemaData || {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Driveway Concreters ${fullLocation}`,
    "description": `Professional concrete driveway services in ${fullLocation} at competitive prices`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": state,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": latitude,
      "longitude": longitude
    },
    "priceRange": "$$$",
    "telephone": "(555) 123-4567"
  };
};

/**
 * Generates meta description for SEO
 */
export const generateMetaDescription = (
  fullLocation: string,
  existingMetaDescription: string | null = null
) => {
  return existingMetaDescription || 
    `Find affordable, professional driveway concrete services in ${fullLocation}. Free quotes, quality work, and competitive prices starting from just $4-$6 per square foot.`;
};
