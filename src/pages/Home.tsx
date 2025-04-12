
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle, Star, Shield, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cities } from '../lib/cities';
import QuoteFormModal from '@/components/QuoteFormModal';

const Home = () => {
  const scrollToQuoteForm = () => {
    const element = document.getElementById('quote-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16">
      <Helmet>
        <title>ConcreterQuotes.com - Get Free Concrete Driveway Quotes</title>
        <meta name="description" content="Get free quotes for concrete driveways from top-rated contractors in your area. Compare prices and hire the best pro for your project." />
      </Helmet>
      
      {/* Hero Section with Gradient Background */}
      <section className="py-16 -mt-6 bg-gradient-to-b from-brand-navy to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-2/3">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Get 3 Free Quotes From Top Concrete Driveway Contractors
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Connect with trusted local concreters in seconds. Compare prices and hire the best pro for your project.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                  <span>Compare quotes from 3+ local concrete specialists</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                  <span>24-hour response guarantee—no waiting</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                  <span>Free service with no obligation to hire</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button className="cta-button text-lg" size="lg" onClick={scrollToQuoteForm}>
                  Get Free Quotes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/driveway-concreters/locations">
                  <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 text-lg" size="lg">
                    Browse Locations
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:w-1/3" id="quote-form">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Get Your Free Driveway Quotes
                </h2>
                <p className="text-gray-600 mb-6">
                  Compare contractors in your area. Most reply within 24 hours.
                </p>
                <QuoteFormModal buttonClassName="cta-button w-full text-lg" buttonText="Request Free Quotes" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust Badges Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Trusted By Homeowners Across America</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-50 p-3 rounded-full mb-3">
                <Star className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="font-semibold">4.9/5 Avg Rating</h3>
              <p className="text-sm text-gray-600">From verified customers</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-50 p-3 rounded-full mb-3">
                <Users className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="font-semibold">10,000+ Projects</h3>
              <p className="text-sm text-gray-600">Completed nationwide</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-50 p-3 rounded-full mb-3">
                <Shield className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="font-semibold">100% Verified Pros</h3>
              <p className="text-sm text-gray-600">Licensed and insured</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-50 p-3 rounded-full mb-3">
                <Clock className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="font-semibold">Fast Response</h3>
              <p className="text-sm text-gray-600">Usually within 24 hours</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Concrete Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We connect homeowners with expert contractors for all types of concrete projects
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3">Concrete Driveways</h3>
              <p className="text-gray-600 mb-4">
                Custom concrete driveways designed to enhance your home's curb appeal and withstand heavy use.
              </p>
              <Link to="/driveway-concreters/locations" className="text-brand-blue font-medium hover:underline flex items-center">
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3">Concrete Patios</h3>
              <p className="text-gray-600 mb-4">
                Beautiful, durable outdoor living spaces that transform your backyard into an entertainment area.
              </p>
              <Link to="/concrete-patios" className="text-brand-blue font-medium hover:underline flex items-center">
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3">Decorative Concrete</h3>
              <p className="text-gray-600 mb-4">
                Stamped, stained, and textured concrete solutions that add beauty and character to any surface.
              </p>
              <Link to="/decorative-concrete" className="text-brand-blue font-medium hover:underline flex items-center">
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3">Concrete Slabs</h3>
              <p className="text-gray-600 mb-4">
                Strong foundations for sheds, garages, and other structures with precise grading and reinforcement.
              </p>
              <Link to="/concrete-slab" className="text-brand-blue font-medium hover:underline flex items-center">
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3">Concrete Repair</h3>
              <p className="text-gray-600 mb-4">
                Professional repair services for cracks, spalling, and other damage to extend the life of your concrete.
              </p>
              <Link to="/concrete-repair" className="text-brand-blue font-medium hover:underline flex items-center">
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3">Garage Floors</h3>
              <p className="text-gray-600 mb-4">
                Durable, easy-to-clean concrete garage floors with optional epoxy coatings and decorative finishes.
              </p>
              <Link to="/concrete-garage" className="text-brand-blue font-medium hover:underline flex items-center">
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button className="cta-button" size="lg" onClick={scrollToQuoteForm}>
              Get Free Concrete Quotes
            </Button>
          </div>
        </div>
      </section>
      
      {/* Popular Locations Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Locations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find concrete contractors in these top cities or browse all locations
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cities.slice(0, 8).map((city) => (
              <Link 
                key={`${city.stateCode}-${city.slug}`}
                to={`/driveway-concreters/locations/${city.stateCode}/${city.slug}`}
                className="p-4 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="font-medium text-brand-navy hover:text-brand-blue">
                  {city.name}, {city.state}
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/driveway-concreters/locations">
              <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue/10">
                View All Locations
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-navy to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Property?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Get matched with experienced concrete contractors in your area and receive free, no-obligation quotes.
          </p>
          <Button className="cta-button text-lg" size="lg" onClick={scrollToQuoteForm}>
            Get My Free Quotes Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
