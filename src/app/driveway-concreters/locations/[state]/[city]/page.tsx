
import { notFound } from 'next/navigation'
import { cities } from '@/lib/data/us-cities'

export const generateStaticParams = async () => {
  return cities.map(city => ({
    state: city.state.toLowerCase(),
    city: city.slug.toLowerCase(),
  }))
}

export const metadata = {
  title: 'Concrete Estimate - Local Calculator',
  description: 'Estimate your concrete driveway cost by city and state.',
}

export default function CityEstimatorPage({ params }: { params: { state: string, city: string } }) {
  const cityData = cities.find(c => 
    c.slug.toLowerCase() === params.city && 
    c.state.toLowerCase() === params.state
  )
  
  if (!cityData) return notFound()

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">
        Concrete Estimate – {cityData.name}, {cityData.state.toUpperCase()}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Use our calculator to estimate concrete costs in {cityData.name}.
      </p>
    </main>
  )
}
