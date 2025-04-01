
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { locationData } from '@/components/driveway-concreters/LocationData';

interface ErrorViewProps {
  error: string | null;
  onRetry: () => void;
}

const ErrorView: React.FC<ErrorViewProps> = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-8">{error || "Could not load location data."}</p>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">You might be interested in these locations:</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {locationData.slice(0, 8).map((loc, index) => (
              <a 
                key={index}
                href={`/driveway-concreters/locations/${loc.state.toLowerCase()}/${loc.city.toLowerCase().replace(/ /g, '-')}`}
                className="p-3 bg-gray-100 rounded hover:bg-gray-200 transition-colors text-center"
              >
                {loc.full_name}
              </a>
            ))}
          </div>
        </div>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-brand-blue text-white rounded hover:bg-brand-navy transition-colors"
        >
          Try again
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default ErrorView;
