
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { cities } from '../lib/cities';

const Home = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Helmet>
        <title>Driveway Concreters | Home</title>
        <meta name="description" content="Find the best driveway concreters in your area." />
      </Helmet>
      
      <h1>Driveway Concreters</h1>
      <p>Find the best driveway concreters in your area. We connect homeowners with quality contractors for all your concrete driveway needs.</p>
      
      <h2>Browse by Location</h2>
      <ul>
        {cities.map((city) => (
          <li key={`${city.stateCode}-${city.slug}`}>
            <Link to={`/driveway-concreters/locations/${city.stateCode}/${city.slug}`}>
              {city.name}, {city.state}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
