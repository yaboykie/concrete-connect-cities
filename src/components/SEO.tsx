
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
}

export default function SEO({ 
  title = "ConcreterQuotes - Find Local Concrete Contractors",
  description = "Get free quotes from trusted concrete contractors in your area. Compare prices and hire the best professionals for your project.",
  canonicalUrl
}: SEOProps) {
  const siteUrl = "https://concreterquotes.com";
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}
