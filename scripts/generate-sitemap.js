
const fs = require('fs');
const path = require('path');

// Base URL of your website
const BASE_URL = 'https://www.concreterquotes.com';

// Get the current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// Main function to generate sitemap
const generateSitemap = () => {
  // Add your website's pages here
  const pages = [
    { url: '/', priority: '1.0' },
    { url: '/contact', priority: '0.8' },
    { url: '/services/concrete-driveways', priority: '0.8' },
    { url: '/services/concrete-patios', priority: '0.8' },
    { url: '/services/concrete-foundations', priority: '0.8' },
    { url: '/driveway-concreters', priority: '0.9' },
    { url: '/driveway-concreters/nsw', priority: '0.7' },
    { url: '/driveway-concreters/vic', priority: '0.7' },
    { url: '/driveway-concreters/sydney', priority: '0.7' },
    { url: '/driveway-concreters/melbourne', priority: '0.7' },
    { url: '/driveway-concreters/brisbane', priority: '0.7' },
    // Add more pages as needed
  ];

  // Create sitemap XML content
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add each page to the sitemap
  pages.forEach(page => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    sitemap += `    <lastmod>${getCurrentDate()}</lastmod>\n`;
    sitemap += '    <changefreq>monthly</changefreq>\n';
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });

  sitemap += '</urlset>';

  // Write sitemap to file
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
};

// Run the function
generateSitemap();
