
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

// Main function to generate sitemap
const generateSitemap = () => {
  // Start with static pages
  const staticPages = [
    { url: '/', priority: '1.0' },
    { url: '/contact', priority: '0.8' },
    { url: '/services/concrete-driveways', priority: '0.8' },
    { url: '/services/concrete-patios', priority: '0.8' },
    { url: '/services/concrete-foundations', priority: '0.8' },
    { url: '/driveway-concreters', priority: '0.9' },
    { url: '/concrete-driveways', priority: '0.8' },
    { url: '/concrete-patios', priority: '0.8' },
    { url: '/concrete-slab', priority: '0.8' },
    { url: '/concrete-garage', priority: '0.8' },
    { url: '/decorative-concrete', priority: '0.8' },
    { url: '/commercial-concrete', priority: '0.8' },
  ];

  // Get unique states from locationData
  const states = [...new Set(locationData.map(location => location.state))];
  
  // Add state pages with the format /driveway-concreters/locations/{state}
  const statePages = states.map(state => ({
    url: `/driveway-concreters/locations/${state.toLowerCase()}`,
    priority: '0.7'
  }));

  // Add city pages with the format /driveway-concreters/locations/{state}/{city}
  const cityPages = locationData
    .filter(location => {
      // Include all locations or filter as needed
      return true;
    })
    .map(location => ({
      url: `/driveway-concreters/locations/${location.state.toLowerCase()}/${location.city.toLowerCase().replace(/ /g, '-')}`,
      priority: '0.7'
    }));

  // Combine all pages
  const allPages = [...staticPages, ...statePages, ...cityPages];

  // Create sitemap XML content - NO WHITESPACE BEFORE XML DECLARATION
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add each page to the sitemap
  allPages.forEach(page => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    sitemap += `    <lastmod>${getCurrentDate()}</lastmod>\n`;
    sitemap += '    <changefreq>monthly</changefreq>\n';
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });

  sitemap += '</urlset>';

  // Validate the XML content has no whitespace before the declaration
  if (sitemap.charAt(0) !== '<') {
    console.error('ERROR: Whitespace detected before XML declaration!');
    // Trim any whitespace
    sitemap = sitemap.trim();
  }

  // Write sitemap to file, making sure there's no BOM or whitespace before XML declaration
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
  console.log(`Total URLs in sitemap: ${allPages.length}`);
};

// Run the function
generateSitemap();
