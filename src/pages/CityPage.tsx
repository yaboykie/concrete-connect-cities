
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getCityBySlug, City } from '../lib/cities';

const CityPage = () => {
  const { state, city } = useParams<{ state: string; city: string }>();
  const [cityData, setCityData] = useState<City | null | undefined>(undefined);
  
  useEffect(() => {
    if (state && city) {
      const foundCity = getCityBySlug(state, city);
      setCityData(foundCity || null);
    }
  }, [state, city]);
  
  // Show loading state while checking
  if (cityData === undefined) {
    return <div>Loading...</div>;
  }
  
  // If city not found, return 404
  if (cityData === null) {
    return <Navigate to="/not-found" />;
  }
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Helmet>
        <title>Driveway Concreters in {cityData.name}, {cityData.state}</title>
        <meta 
          name="description" 
          content={`Find the best driveway concreters in ${cityData.name}, ${cityData.state}. Get free quotes and connect with local contractors.`} 
        />
      </Helmet>
      
      <p>
        <a href="/">&larr; Back to Home</a>
      </p>
      
      <h1>Driveway Concreters in {cityData.name}, {cityData.state}</h1>
      
      <p>Looking for the best driveway concreters in {cityData.name}? 
      We've compiled a list of the top-rated concrete contractors in the {cityData.name} area 
      to help you find the right professional for your driveway project.</p>
      
      <h2>Why Choose a Professional Concreter in {cityData.name}</h2>
      <p>Professional concreters in {cityData.name}, {cityData.state} have the experience, 
      equipment, and skills to deliver high-quality driveways that will last for decades. 
      They understand the local climate conditions and building codes specific to {cityData.state}.</p>
      
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h3>Get a Free Quote</h3>
        <p>Ready to start your driveway project in {cityData.name}? Contact us to get connected with top local contractors.</p>
        <button style={{ padding: '10px 15px', background: '#646cff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Request a Quote
        </button>
      </div>
    </div>
  );
};

export default CityPage;
