
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import FaqSection from '@/components/FaqSection';
import ServiceListing from '@/components/ServiceListing';
import TestimonialSection from '@/components/TestimonialSection';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, MapPin, Shield } from 'lucide-react';

// This would typically come from your CMS or database
// For now, we'll create placeholder content that would be replaced with dynamic content
const getLocationContent = (state: string, city: string, service: string) => {
  const formattedService = service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const formattedState = state.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const fullLocation = `${formattedCity}, ${formattedState}`;
  
  // Service specific content
  let serviceTitle, serviceIntro, weatherConsiderations, faqs, services;
  
  if (service === 'concrete-driveways') {
    serviceTitle = `Top-Rated Concrete Driveway Contractors in ${fullLocation}`;
    serviceIntro = `Looking for professional concrete driveway installation in ${fullLocation}? Our network of experienced local contractors specialize in creating beautiful, durable driveways that enhance your home's curb appeal and add lasting value to your property.`;
    weatherConsiderations = `In ${fullLocation}, local weather patterns can significantly impact concrete work. Our local contractors understand how to prepare, pour, and cure concrete specifically for the ${formattedState} climate, ensuring your driveway stands up to local weather conditions year after year.`;
    
    faqs = [
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
    
    services = [
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
  } else {
    // concrete-contractor content
    serviceTitle = `Top-Rated Concrete Contractors in ${fullLocation}`;
    serviceIntro = `Looking for reliable concrete contractors in ${fullLocation}? Our network connects you with experienced local concrete professionals for all your residential and commercial concrete needs. From driveways and patios to foundations and decorative concrete, our verified contractors deliver quality workmanship and excellent customer service.`;
    weatherConsiderations = `${formattedState} weather presents unique challenges for concrete work. Our local ${formattedCity} contractors understand regional climate patterns and soil conditions, using appropriate techniques and concrete mixes to ensure durable, long-lasting results in your specific location.`;
    
    faqs = [
      {
        question: `How do I choose the right concrete contractor in ${formattedCity}?`,
        answer: `When selecting a concrete contractor in ${formattedCity}, look for proper licensing, insurance, positive reviews, and relevant experience. Ask about their familiarity with local building codes and get detailed written estimates. ConcreterQuotes.com pre-screens our network of ${formattedCity} contractors to verify credentials and work quality, making your selection process simpler and safer.`
      },
      {
        question: `What concrete services are available in ${formattedCity}?`,
        answer: `Our ${formattedCity} concrete contractors offer comprehensive services including: concrete driveways, patios, and walkways; foundation installation and repair; decorative concrete (stamped, colored, exposed aggregate); retaining walls; concrete slabs for garages, sheds, and home additions; concrete steps and porches; and concrete repair and resurfacing.`
      },
      {
        question: `What is the best time of year for concrete work in ${formattedState}?`,
        answer: `The ideal time for concrete projects in ${formattedState} is during mild weather seasons, typically spring and fall, when temperatures consistently range between 50-85°F. Extreme heat, cold, or precipitation can negatively impact concrete curing. However, our experienced local contractors are skilled at adapting to ${formattedState}'s climate conditions and can often work year-round with proper precautions.`
      },
      {
        question: "How much should I budget for my concrete project?",
        answer: `Concrete project costs in ${formattedCity} vary widely depending on type, size, and complexity. Basic concrete slabs typically range from $5-$10 per square foot, while decorative concrete may cost $15-$25+ per square foot. Our free quote service provides customized estimates from local contractors based on your specific project requirements.`
      },
      {
        question: "Do concrete contractors offer warranties?",
        answer: `Yes, reputable concrete contractors in ${formattedCity} typically offer warranties on their workmanship, usually ranging from 1-5 years depending on the project type. Additionally, concrete materials often carry manufacturer warranties. Our network of pre-screened contractors provides clear warranty information upfront, giving you confidence in your investment.`
      }
    ];
    
    services = [
      {
        title: "Concrete Driveways",
        description: `Expert concrete driveway installation, replacement, and expansion services throughout ${formattedCity}.`
      },
      {
        title: "Concrete Patios",
        description: `Create beautiful outdoor living spaces with our custom-designed concrete patios, perfect for ${formattedState}'s climate.`
      },
      {
        title: "Concrete Foundations",
        description: "Solid, reliable foundations for new construction, additions, garages, and outbuildings."
      },
      {
        title: "Decorative Concrete",
        description: "Stamped, stained, and textured concrete solutions that blend durability with stunning aesthetics."
      },
      {
        title: "Concrete Repair",
        description: `Professional repair services for cracked, damaged, or aging concrete surfaces throughout ${formattedCity}.`
      },
      {
        title: "Commercial Concrete",
        description: `From parking lots to warehouse floors, our ${formattedCity} contractors handle commercial concrete projects of all sizes.`
      }
    ];
  }
  
  // Common testimonials - would be location specific in a real implementation
  const testimonials = [
    {
      name: "Michael T.",
      location: formattedCity,
      text: "The contractor I found through ConcreterQuotes was fantastic. They completed my driveway on time and on budget. Highly recommend!",
      rating: 5
    },
    {
      name: "Sarah L.",
      location: formattedCity,
      text: "Great experience from quote to completion. The concrete patio they installed is beautiful and exactly what we wanted.",
      rating: 5
    },
    {
      name: "Robert J.",
      location: formattedCity,
      text: "After getting multiple quotes, the contractor I found through this service offered the best value. Quality work and professional service.",
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

const LocationService = () => {
  const { state, city, service } = useParams<{ state: string; city: string; service: string }>();
  
  if (!state || !city || !service) {
    return <div>Invalid location or service</div>;
  }
  
  const locationContent = getLocationContent(state, city, service);
  const formattedService = service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
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
                <QuoteForm location={locationContent.fullLocation} service={service} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Local Weather Considerations */}
        <section className="section bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Local {formattedService} Considerations in {locationContent.fullLocation}</h2>
              <p className="text-lg mb-6">{locationContent.weatherConsiderations}</p>
              <div className="bg-concrete-light rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-brand-blue" />
                  Why Go Local for Your {formattedService} Project
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
                We connect you with trusted concrete professionals who deliver exceptional results
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue/10 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3">Verified Contractors</h3>
                <p className="text-gray-600">We pre-screen all contractors for proper licensing, insurance, and quality workmanship.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue/10 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3">Free, No-Obligation Quotes</h3>
                <p className="text-gray-600">Compare multiple quotes from top local contractors with absolutely no commitment required.</p>
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
            title={`${formattedService} Services in ${locationContent.fullLocation}`} 
            subtitle="Our network of concrete professionals offers comprehensive solutions for your property"
            services={locationContent.services} 
          />
        </section>
        
        {/* Testimonials Section */}
        <TestimonialSection testimonials={locationContent.testimonials} />
        
        {/* FAQ Section */}
        <section className="section bg-white">
          <FaqSection 
            title={`Common Questions About ${formattedService} in ${locationContent.fullLocation}`}
            faqs={locationContent.faqs} 
          />
        </section>
        
        {/* Final CTA */}
        <section className="section bg-brand-yellow/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Get Started with Your {formattedService} Project?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Take the first step toward your new concrete project today. Our network of professional 
              contractors in {locationContent.fullLocation} is ready to help!
            </p>
            <Button className="cta-button text-lg" size="lg">
              Get Your Free {formattedService.split(' ')[0]} Quote in {locationContent.fullLocation}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LocationService;
