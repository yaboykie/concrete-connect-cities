
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import FaqSection from '@/components/FaqSection';
import ServiceListing from '@/components/ServiceListing';
import TestimonialSection from '@/components/TestimonialSection';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, MapPin, Shield, Truck } from 'lucide-react';

// Location data for demonstration
const locationData = [
  { state: 'AK', city: 'Anchorage', full_name: 'Anchorage, AK' },
  { state: 'AL', city: 'Huntsville', full_name: 'Huntsville, AL' },
  { state: 'AL', city: 'Birmingham', full_name: 'Birmingham, AL' },
  { state: 'AL', city: 'Montgomery', full_name: 'Montgomery, AL' },
  { state: 'AL', city: 'Mobile', full_name: 'Mobile, AL' },
  { state: 'AL', city: 'Tuscaloosa', full_name: 'Tuscaloosa, AL' },
  { state: 'AR', city: 'Little Rock', full_name: 'Little Rock, AR' },
  { state: 'AR', city: 'Fayetteville', full_name: 'Fayetteville, AR' },
  { state: 'AZ', city: 'Phoenix', full_name: 'Phoenix, AZ' },
  { state: 'AZ', city: 'Tucson', full_name: 'Tucson, AZ' },
  { state: 'AZ', city: 'Mesa', full_name: 'Mesa, AZ' },
  { state: 'AZ', city: 'Chandler', full_name: 'Chandler, AZ' },
  { state: 'AZ', city: 'Gilbert', full_name: 'Gilbert, AZ' },
  { state: 'AZ', city: 'Glendale', full_name: 'Glendale, AZ' },
  { state: 'AZ', city: 'Scottsdale', full_name: 'Scottsdale, AZ' },
  { state: 'AZ', city: 'Peoria', full_name: 'Peoria, AZ' },
  { state: 'AZ', city: 'Tempe', full_name: 'Tempe, AZ' },
  { state: 'AZ', city: 'Surprise', full_name: 'Surprise, AZ' },
  { state: 'AZ', city: 'Goodyear', full_name: 'Goodyear, AZ' },
  { state: 'AZ', city: 'Buckeye', full_name: 'Buckeye, AZ' },
  { state: 'AZ', city: 'Yuma', full_name: 'Yuma, AZ' },
  { state: 'CA', city: 'Los Angeles', full_name: 'Los Angeles, CA' },
  { state: 'CA', city: 'San Diego', full_name: 'San Diego, CA' },
  { state: 'CA', city: 'San Jose', full_name: 'San Jose, CA' },
  { state: 'CA', city: 'San Francisco', full_name: 'San Francisco, CA' },
  { state: 'CA', city: 'Fresno', full_name: 'Fresno, CA' },
];

const getLocationContent = (state: string, city: string) => {
  // Find matching location from our data
  const locationMatch = locationData.find(
    loc => loc.state.toLowerCase() === state.toLowerCase() && 
           loc.city.toLowerCase().replace(/\s+/g, '-') === city.toLowerCase()
  );
  
  const fullLocation = locationMatch?.full_name || `${city.replace(/-/g, ' ')}, ${state}`;
  const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const formattedState = state.toUpperCase();
  
  // Service specific content
  const serviceTitle = `Top-Rated Concrete Driveway Contractors in ${fullLocation}`;
  const serviceIntro = `Looking for professional concrete driveway installation in ${fullLocation}? Our network of experienced local contractors specialize in creating beautiful, durable driveways that enhance your home's curb appeal and add lasting value to your property.`;
  const weatherConsiderations = `In ${fullLocation}, local weather patterns can significantly impact concrete work. Our local contractors understand how to prepare, pour, and cure concrete specifically for the ${formattedState} climate, ensuring your driveway stands up to local weather conditions year after year.`;
  
  const faqs = [
    {
      question: `How much does a concrete driveway cost in ${formattedCity}?`,
      answer: `Concrete driveway costs in ${formattedCity} typically range from $6-$12 per square foot for standard installations. Factors affecting price include size, thickness, decorative elements, and site preparation. Most homeowners invest between $3,000-$7,000 for a complete driveway. Contact us for a free, customized quote for your specific project.`
    },
    {
      question: `How long will a new concrete driveway last in ${formattedState}?`,
      answer: `With proper installation and maintenance, concrete driveways in ${formattedState} typically last 25-30 years or more. Our local contractors understand ${formattedState}'s specific climate challenges and use appropriate concrete mixes and installation techniques to maximize durability and longevity.`
    },
    {
      question: "How long does it take to install a concrete driveway?",
      answer: `A typical concrete driveway installation takes 3-5 days for removal of the old surface, preparation, pouring, and initial curing. However, you'll need to avoid driving on the new surface for at least 7 days to allow proper curing. Our local ${formattedCity} contractors will provide a specific timeline based on your project's requirements.`
    },
    {
      question: "Can I get decorative concrete for my driveway?",
      answer: `Absolutely! Our ${formattedCity} concrete contractors offer various decorative options including stamped patterns, exposed aggregate, colored concrete, and more. These options can mimic the look of more expensive materials like pavers or natural stone while maintaining the durability and affordability of concrete.`
    },
    {
      question: "Do I need a permit to replace my driveway in your area?",
      answer: `Permit requirements vary across ${formattedState}. In ${formattedCity}, most driveway replacements require a permit, especially if changing the dimensions or affecting drainage. Our local contractors are familiar with ${formattedCity}'s specific permitting requirements and can either assist with the process or handle it entirely as part of your project.`
    }
  ];
  
  const services = [
    {
      title: "Standard Concrete Driveways",
      description: `Durable, long-lasting concrete driveways custom-designed for your ${formattedCity} home, with expert installation and finishing.`
    },
    {
      title: "Stamped Concrete Driveways",
      description: "Beautiful textured patterns that can mimic brick, stone, or tile at a fraction of the cost of these materials."
    },
    {
      title: "Colored Concrete Driveways",
      description: "Integral coloring, stains, and dyes to achieve a wide variety of hues that complement your home's exterior."
    },
    {
      title: "Exposed Aggregate Driveways",
      description: "Revealing the natural stone within the concrete for a textured, non-slip surface with natural beauty."
    },
    {
      title: "Concrete Driveway Repair",
      description: `Expert repair services for cracked, damaged, or aging concrete driveways throughout ${formattedCity}.`
    },
    {
      title: "Concrete Driveway Extensions",
      description: "Expand your existing driveway to accommodate additional vehicles or create more space for activities."
    }
  ];
  
  // Common testimonials - would be location specific in a real implementation
  const testimonials = [
    {
      name: "Michael T.",
      location: formattedCity,
      text: "The driveway contractor I found through ConcreterQuotes was fantastic. They completed my driveway on time and on budget. The finished result looks amazing!",
      rating: 5
    },
    {
      name: "Sarah L.",
      location: formattedCity,
      text: "Great experience from quote to completion. The concrete driveway they installed is beautiful and exactly what we wanted. Very professional service.",
      rating: 5
    },
    {
      name: "Robert J.",
      location: formattedCity,
      text: "After getting multiple quotes, the contractor I found through this service offered the best value. Quality work on our driveway and professional service throughout.",
      rating: 4
    }
  ];
  
  return {
    title: serviceTitle,
    serviceIntro,
    weatherConsiderations,
    faqs,
    services,
    testimonials,
    fullLocation
  };
};

const DrivewayConcreterLocations = () => {
  const { state, city } = useParams<{ state: string; city: string }>();
  
  if (!state || !city) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Driveway Concreters Locations</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locationData.map((location, index) => (
              <Link 
                key={index}
                to={`/driveway-concreters/locations/${location.state.toLowerCase()}/${location.city.toLowerCase().replace(/\s+/g, '-')}`}
                className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 mr-2 text-brand-blue" />
                  <h3 className="text-lg font-semibold">{location.full_name}</h3>
                </div>
                <p className="text-gray-600">Find top-rated driveway concreters in {location.full_name}.</p>
              </Link>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const locationContent = getLocationContent(state, city);
  const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brand-navy to-blue-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-3/5">
                <div className="flex items-center text-brand-yellow mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{locationContent.fullLocation}</span>
                </div>
                <h1 className="text-white mb-6">{locationContent.title}</h1>
                <p className="text-lg text-gray-200 mb-8">{locationContent.serviceIntro}</p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                    <span>Free quotes from pre-screened local contractors</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                    <span>Compare prices and services with no obligation</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                    <span>Only work with licensed and insured professionals</span>
                  </div>
                </div>
                <Button className="cta-button text-lg" size="lg">
                  Get Your Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="lg:w-2/5">
                <QuoteForm location={locationContent.fullLocation} service="driveway-concreters" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Local Weather Considerations */}
        <section className="section bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Local Driveway Concrete Considerations in {locationContent.fullLocation}</h2>
              <p className="text-lg mb-6">{locationContent.weatherConsiderations}</p>
              <div className="bg-concrete-light rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-brand-blue" />
                  Why Go Local for Your Driveway Concrete Project
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                    <p>Local contractors understand regional soil conditions and drainage requirements</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                    <p>Familiarity with local building codes and permit processes</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                    <p>Knowledge of climate-appropriate concrete mixes and techniques</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                    <p>Quicker response times for questions or warranty service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Difference */}
        <section className="section bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The ConcreterQuotes Difference</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We connect you with trusted driveway concrete professionals who deliver exceptional results
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue/10 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3">Verified Contractors</h3>
                <p className="text-gray-600">We pre-screen all driveway contractors for proper licensing, insurance, and quality workmanship.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue/10 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3">Free, No-Obligation Quotes</h3>
                <p className="text-gray-600">Compare multiple quotes from top local driveway contractors with absolutely no commitment required.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue/10 rounded-full mb-4">
                  <MapPin className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3">Local Expertise</h3>
                <p className="text-gray-600">Our network includes contractors who specialize in your specific area and understand local requirements.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="section bg-white">
          <ServiceListing 
            title={`Driveway Concreters Services in ${locationContent.fullLocation}`} 
            subtitle="Our network of concrete professionals offers comprehensive driveway solutions for your property"
            services={locationContent.services} 
          />
        </section>
        
        {/* Testimonials Section */}
        <TestimonialSection testimonials={locationContent.testimonials} />
        
        {/* FAQ Section */}
        <section className="section bg-white">
          <FaqSection 
            title={`Common Questions About Concrete Driveways in ${locationContent.fullLocation}`}
            faqs={locationContent.faqs} 
          />
        </section>
        
        {/* Final CTA */}
        <section className="section bg-brand-yellow/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Get Started with Your Concrete Driveway Project?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Take the first step toward your new concrete driveway today. Our network of professional 
              contractors in {locationContent.fullLocation} is ready to help!
            </p>
            <Button className="cta-button text-lg" size="lg">
              Get Your Free Driveway Quote in {locationContent.fullLocation}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DrivewayConcreterLocations;
