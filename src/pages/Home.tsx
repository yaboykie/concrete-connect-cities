
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { cities } from '../lib/cities';

const Home = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-12 space-y-10">
      <Helmet>
        <title>Driveway Concreters | Home</title>
        <meta name="description" content="Find the best driveway concreters in your area." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
          Driveway Concreters
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Find the best driveway concreters in your area. We connect homeowners
          with quality contractors for all your concrete driveway needs.
        </p>
      </section>

      {/* Browse by Location */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Browse by Location</h2>
        <ul className="space-y-2 text-blue-600 underline text-base">
          {cities.map((city) => (
            <li key={`${city.stateCode}-${city.slug}`}>
              <Link to={`/driveway-concreters/locations/${city.stateCode}/${city.slug}`}>
                {city.name}, {city.state}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
