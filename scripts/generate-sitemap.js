
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Base URL of your website
const BASE_URL = 'https://www.concreterquotes.com';

// Initialize Supabase client for fetching location data
// Use the same environment variables that the app uses
const supabaseUrl = process.env.VITE_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.VITE_PUBLIC_SUPABASE_KEY;

// If environment variables are not available (e.g., in development), use fallback values
// These should match the ones in src/integrations/supabase/client.ts
const SUPABASE_URL = supabaseUrl || "https://aiyzpzibgrgqslsoulgj.supabase.co";
const SUPABASE_KEY = supabaseKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpeXpwemliZ3JncXNsc291bGdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MjMyMTYsImV4cCI6MjA1ODk5OTIxNn0.haluELacZINIK1dJ7sVwBraK0jcQAlMjrjvlp58RJRQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Get the current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// Helper function to add a URL to the sitemap
const addUrl = (urls, path, priority) => {
  if (!urls.has(path)) {
    urls.set(path, {
      url: path,
      priority: priority.toString(),
      lastmod: getCurrentDate()
    });
  }
};

// Fetch all location data from Supabase
const fetchLocationData = async () => {
  try {
    console.log('Fetching location data from Supabase...');
    const { data, error } = await supabase
      .from('Location Data + URL Structure')
      .select('State, City, Latitude, Longitude');
    
    if (error) {
      console.error('Error fetching location data:', error);
      return [];
    }
    
    console.log(`Retrieved ${data.length} locations from Supabase`);
    return data;
  } catch (err) {
    console.error('Failed to fetch location data:', err);
    return [];
  }
};

// Main function to generate sitemap
const generateSitemap = async () => {
  try {
    console.log('Starting sitemap generation process...');
    
    // Use a Map to store unique URLs
    const urlMap = new Map();
    
    // Add home page and core pages
    addUrl(urlMap, '/', '1.0');
    addUrl(urlMap, '/contact', '0.8');
    
    // Add legal and sign-up pages
    addUrl(urlMap, '/privacy-policy', '0.5');
    addUrl(urlMap, '/terms-of-service', '0.5');
    addUrl(urlMap, '/concretersignup', '0.7');
    addUrl(urlMap, '/concretersignup/confirm', '0.6');
    addUrl(urlMap, '/concretersignup/thank-you', '0.6');
    
    // Add Arizona cost estimator page
    addUrl(urlMap, '/arizona-concrete-cost-estimator', '0.9');
    
    // Primary service pages
    const services = [
      'concrete-driveways',
      'concrete-patios',
      'concrete-foundations',
      'concrete-slab',
      'concrete-garage',
      'decorative-concrete',
      'commercial-concrete'
    ];
    
    services.forEach(service => {
      // Main service page
      addUrl(urlMap, `/${service}`, '0.8');
      
      // Service details page if exists
      if (['concrete-driveways', 'concrete-patios', 'concrete-foundations'].includes(service)) {
        addUrl(urlMap, `/services/${service}`, '0.8');
      }
    });
    
    // Main category hub pages
    const categories = [
      'driveway-concreters',
      'concrete-contractors'
    ];
    
    categories.forEach(category => {
      addUrl(urlMap, `/${category}`, '0.9');
      addUrl(urlMap, `/${category}/locations`, '0.9');
    });
    
    // Fetch location data from Supabase
    const locationData = await fetchLocationData();
    
    // Get unique states from locationData
    const states = [...new Set(locationData.map(location => location.State))];
    
    // Add state pages for both service categories
    states.forEach(state => {
      if (state) {
        const stateCode = state.toLowerCase();
        categories.forEach(category => {
          addUrl(urlMap, `/${category}/locations/${stateCode}`, '0.7');
        });
        
        // Also add state driveway estimator pages
        addUrl(urlMap, `/${stateCode}/driveway-cost-estimator`, '0.8');
      }
    });
    
    // Add city pages for both service categories
    locationData.forEach(location => {
      if (location.City && location.State) {
        const citySlug = location.City.toLowerCase().replace(/ /g, '-');
        const stateCode = location.State.toLowerCase();
        
        categories.forEach(category => {
          // Regular location path format
          addUrl(urlMap, `/${category}/locations/${stateCode}/${citySlug}`, '0.7');
          
          // Legacy URL format (city-state)
          addUrl(urlMap, `/${category}/${citySlug}-${stateCode}`, '0.7');
        });
      }
    });

    // Convert the Map to an array of URLs
    const allPages = [...urlMap.values()];

    // CRITICAL: Build sitemap XML string
    // Writing directly to a string to avoid any potential BOM issues
    let xmlContent = [];
    xmlContent.push('<?xml version="1.0" encoding="UTF-8"?>');
    xmlContent.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

    // Add each page to the sitemap
    allPages.forEach(page => {
      xmlContent.push('  <url>');
      xmlContent.push(`    <loc>${BASE_URL}${page.url}</loc>`);
      xmlContent.push(`    <lastmod>${page.lastmod}</lastmod>`);
      xmlContent.push('    <changefreq>monthly</changefreq>');
      xmlContent.push(`    <priority>${page.priority}</priority>`);
      xmlContent.push('  </url>');
    });

    xmlContent.push('</urlset>');

    // Join with newlines and ensure no BOM
    const sitemap = xmlContent.join('\n');
    
    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    console.log('Saving sitemap to:', outputPath);
    
    // Remove any existing file first to avoid issues with appending
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
      console.log('Deleted existing sitemap.xml file');
    }
    
    // Write with explicit utf8 encoding with no BOM
    fs.writeFileSync(outputPath, sitemap, { encoding: 'utf8' });
    console.log('Sitemap file written successfully');
    
    // Verify the start of the file
    const fileContent = fs.readFileSync(outputPath, 'utf8').substring(0, 50);
    console.log('First 50 characters of sitemap.xml:', JSON.stringify(fileContent));

    // Strict validation of XML declaration
    if (fileContent.startsWith('<?xml')) {
      console.log('✅ XML declaration is at the start of the file');
    } else {
      console.error('❌ XML validation failed: XML declaration is not at the start of the file');
      console.error(`First characters: "${fileContent.substring(0, 10)}"`);
    }
    
    console.log('Sitemap generated successfully!');
    console.log(`Total URLs in sitemap: ${allPages.length}`);
    
    // Create robots.txt file with reference to sitemap
    const robotsTxt = `User-agent: *\nAllow: /\n\n# Allow all search engine bots to access the entire site\nUser-agent: Googlebot\nAllow: /\n\nUser-agent: Bingbot\nAllow: /\n\nUser-agent: Twitterbot\nAllow: /\n\nUser-agent: facebookexternalhit\nAllow: /\n\n# Reference to sitemap\nSitemap: ${BASE_URL}/sitemap.xml\n`;
    
    const robotsPath = path.join(__dirname, '../public/robots.txt');
    fs.writeFileSync(robotsPath, robotsTxt, { encoding: 'utf8' });
    console.log('robots.txt generated successfully with sitemap reference!');
    
    // Count URLs by type
    const staticPages = allPages.filter(page => !page.url.includes('/locations/') && !page.url.match(/\/[^\/]+-[a-z]{2}$/)).length;
    const statePages = allPages.filter(page => page.url.match(/\/locations\/[a-z]{2}$/)).length;
    const cityPagesNewFormat = allPages.filter(page => page.url.match(/\/locations\/[a-z]{2}\/[^\/]+$/)).length;
    const cityPagesLegacyFormat = allPages.filter(page => page.url.match(/\/[^\/]+-[a-z]{2}$/)).length;
    
    console.log('\nURL Breakdown:');
    console.log(`Static pages: ${staticPages}`);
    console.log(`State-level pages: ${statePages}`);
    console.log(`City pages (new format /locations/state/city): ${cityPagesNewFormat}`);
    console.log(`City pages (legacy format /category/city-state): ${cityPagesLegacyFormat}`);
    console.log(`Location pages total: ${statePages + cityPagesNewFormat + cityPagesLegacyFormat}`);
    
    // Verify we have the expected number of URLs
    if (allPages.length < 630) {
      console.warn(`\n⚠️ WARNING: Expected 630+ URLs but only generated ${allPages.length}`);
      console.warn('Check if all location data was properly retrieved from Supabase');
    } else {
      console.log(`\n✅ SUCCESS: Generated ${allPages.length} URLs (expected 630+)`);
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
};

// Print environment information for debugging
console.log('Current working directory:', process.cwd());
console.log('Script directory:', __dirname);
console.log('Node.js version:', process.version);

// Run the function
generateSitemap().then(() => {
  console.log('Sitemap generation completed.');
}).catch(err => {
  console.error('Fatal error during sitemap generation:', err);
  process.exit(1); // Exit with error code
});

// Export the function so it can be called from other scripts or build hooks
module.exports = { generateSitemap };
