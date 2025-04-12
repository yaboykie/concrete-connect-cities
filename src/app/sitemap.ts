
import { MetadataRoute } from 'next'
import { cities } from '@/lib/data/us-cities'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://concreterquotes.com'

  const staticRoutes = ['', '/about', '/contact'].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
  }))

  const cityRoutes = cities.map(city => ({
    url: `${baseUrl}/driveway-concreters/locations/${city.state.toLowerCase()}/${city.slug.toLowerCase()}`,
    lastModified: new Date().toISOString(),
  }))

  return [...staticRoutes, ...cityRoutes]
}
