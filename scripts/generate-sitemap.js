
const fs = require('fs');
const path = require('path');

// Import location data
const { locationData } = require('../src/components/driveway-concreters/LocationData');

// Base URL of your website
const BASE_URL = 'https://www.concreterquotes.com';

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

// Main function to generate sitemap
const generateSitemap = () => {
  // Use a Map to store unique URLs
  const urlMap = new Map();
  
  // Add home page and core pages
  addUrl(urlMap, '/', '1.0');
  addUrl(urlMap, '/contact', '0.8');
  
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
  
  // Get unique states from locationData
  const states = [...new Set(locationData.map(location => location.state))];
  
  // Add state pages for both service categories
  states.forEach(state => {
    categories.forEach(category => {
      addUrl(urlMap, `/${category}/locations/${state.toLowerCase()}`, '0.7');
    });
  });
  
  // Add city pages for both service categories
  locationData.forEach(location => {
    const citySlug = location.city.toLowerCase().replace(/ /g, '-');
    const stateCode = location.state.toLowerCase();
    
    categories.forEach(category => {
      addUrl(urlMap, `/${category}/locations/${stateCode}/${citySlug}`, '0.7');
    });
  });

  // Convert the Map to an array of URLs
  const allPages = [...urlMap.values()];

  // Create sitemap XML content - Ensure no whitespace before XML declaration
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add each page to the sitemap
  allPages.forEach(page => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    sitemap += `    <lastmod>${page.lastmod}</lastmod>\n`;
    sitemap += '    <changefreq>monthly</changefreq>\n';
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });

  sitemap += '</urlset>';

  // Write sitemap to file, making sure there's no BOM or whitespace before XML declaration
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap, { encoding: 'utf8' });
  console.log('Sitemap generated successfully!');
  console.log(`Total URLs in sitemap: ${allPages.length}`);
  
  // Create robots.txt file with reference to sitemap
  const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml`;
  fs.writeFileSync(path.join(__dirname, '../public/robots.txt'), robotsTxt);
  console.log('robots.txt generated successfully with sitemap reference!');
};

// Run the function
generateSitemap();

// Export the function so it can be called from other scripts or build hooks
module.exports = { generateSitemap };
