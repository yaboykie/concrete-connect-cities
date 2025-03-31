
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, MapPin, Hammer, Construction, Shovel, Building, Truck, House, Clock, Shield, Users, DollarSign } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  // Example service categories with simplified linking
  const serviceCategories = [
    { 
      service: 'concrete-driveways',
      title: 'Concrete Driveways', 
      description: 'Get a beautiful, durable driveway installed by a local expert.',
      icon: <Truck className="h-10 w-10 mb-2 text-brand-blue" />,
      path: '/driveway-concreters/locations',
      cta: 'Get Driveway Quotes'
    },
    { 
      service: 'concrete-slab', 
      title: 'Concrete Slabs', 
      description: 'Foundations, patios, sheds — all professionally poured.',
      icon: <Shovel className="h-10 w-10 mb-2 text-brand-blue" />,
      path: '/concrete-slab/locations',
      cta: 'Find Slab Contractors'
    },
    { 
      service: 'concrete-garage', 
      title: 'Garage Concrete', 
      description: 'Smooth, strong garage floors and complete garage builds.',
      icon: <House className="h-10 w-10 mb-2 text-brand-blue" />,
      path: '/concrete-garage/locations',
      cta: 'Quote My Garage Project'
    },
    { 
      service: 'decorative-concrete', 
      title: 'Decorative Concrete', 
      description: 'Stamped, colored, or exposed aggregate concrete to boost curb appeal.',
      icon: <Hammer className="h-10 w-10 mb-2 text-brand-blue" />,
      path: '/decorative-concrete/locations',
      cta: 'Explore Decorative Options'
    },
    { 
      service: 'commercial-concrete', 
      title: 'Commercial Concrete', 
      description: 'Need help with a larger project? We\'ve got commercial pros too.',
      icon: <Building className="h-10 w-10 mb-2 text-brand-blue" />,
      path: '/commercial-concrete/locations',
      cta: 'Talk to a Commercial Concreter'
    }
  ];

  const whyChooseUs = [
    {
      icon: <Shield className="h-6 w-6 text-brand-blue" />,
      text: 'All contractors pre-screened for quality and insurance'
    },
    {
      icon: <Clock className="h-6 w-6 text-brand-blue" />,
      text: 'Fast turnaround — get quotes in 1–2 business days'
    },
    {
      icon: <Users className="h-6 w-6 text-brand-blue" />,
      text: 'Real people to support you every step of the way'
    },
    {
      icon: <DollarSign className="h-6 w-6 text-brand-blue" />,
      text: 'Save time and avoid overpaying by comparing local rates'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brand-navy to-blue-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-white mb-6">✅ Find Trusted Concrete Contractors Near You — Fast & Free</h1>
              <p className="text-xl text-gray-200 mb-8">
                ConcreterQuotes.com connects homeowners with reliable, pre-screened concrete contractors across the USA. Whether you're replacing a driveway, laying a slab, or planning a patio — get fast, free quotes from top-rated local pros.
              </p>
              
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-white mr-2">✓</span>
                  <span className="text-white">Free, no-obligation quotes</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-white mr-2">✓</span>
                  <span className="text-white">Vetted local contractors</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <span className="text-white mr-2">✓</span>
                  <span className="text-white">Fast response times (24–48 hrs)</span>
                </div>
              </div>
              
              <Button className="cta-button text-lg" size="lg">
                Get My Free Quotes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Popular Concrete Services Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">🔨 Concrete Services We Help With</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceCategories.map((category, index) => (
                <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center pb-2">
                    <div className="flex justify-center mb-2">
                      {category.icon}
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pb-6">
                    <p className="text-gray-600">
                      {category.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center pb-6">
                    <Link to={category.path}>
                      <Button className="w-full">
                        {category.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Homeowners Trust ConcreterQuotes.com</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {whyChooseUs.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-full shadow-md">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-lg">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="bg-brand-navy text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Get matched with trusted local concreters and compare free quotes — no pressure, just fast help for your project.
            </p>
            <Button className="cta-button text-lg" size="lg">
              Get Free Concrete Quotes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
