
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import FaqSection from '@/components/FaqSection';
import ServiceListing from '@/components/ServiceListing';
import TestimonialSection from '@/components/TestimonialSection';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, MapPin, Shield } from 'lucide-react';
import serviceContent from '@/data/serviceContent';
import { Helmet } from 'react-helmet-async';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

const ServicePage = () => {
  const { service } = useParams<{ service: string }>();
  
  if (!service || !serviceContent[service]) {
    return <div>Service not found</div>;
  }
  
  const content = serviceContent[service];
  
  // Format the service name for display in breadcrumbs
  const formatServiceName = (serviceName: string) => {
    return serviceName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{content.title} | Professional Concrete Services</title>
        <meta name="description" content={content.introduction} />
        <link rel="canonical" href={`https://concreterquotes.com/${service}`} />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 py-2 border-b">
          <div className="container mx-auto px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{formatServiceName(service)}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brand-navy to-blue-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-3/5">
                <h1 className="text-white mb-6">{content.title}</h1>
                <p className="text-lg text-gray-200 mb-8">{content.introduction}</p>
                <div className="space-y-4 mb-8">
                  {content.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <Button className="cta-button text-lg" size="lg">
                  Get Your Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="lg:w-2/5">
                <QuoteForm location="Your Area" service={service} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content Section */}
        <section className="section bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">{content.mainContent.title}</h2>
              
              {content.mainContent.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg mb-6">{paragraph}</p>
              ))}
              
              {content.mainContent.subSections.map((subSection, index) => (
                <div key={index} className="mt-10">
                  <h3 className="text-2xl font-semibold mb-4">{subSection.title}</h3>
                  {subSection.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-lg mb-4">{paragraph}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Why Choose Professional Installation */}
        <section className="section bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Professional Installation</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {content.whyChoosePro.map((reason, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
                        <p>{reason.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="section bg-white py-16">
          <ServiceListing 
            title={`Our ${content.title} Services`}
            subtitle="We offer a comprehensive range of solutions tailored to your needs"
            services={content.services} 
          />
        </section>
        
        {/* Testimonials Section */}
        <TestimonialSection testimonials={content.testimonials} />
        
        {/* FAQ Section */}
        <section className="section bg-white py-16">
          <FaqSection 
            title={`Common Questions About ${content.title}`}
            faqs={content.faqs} 
          />
        </section>
        
        {/* Final CTA */}
        <section className="section bg-brand-yellow/50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Get Started with Your {content.title} Project?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Take the first step toward your new concrete project today. Our network of professional 
              contractors is ready to help you create the perfect {service.replace(/-/g, ' ')} for your property.
            </p>
            <Button className="cta-button text-lg" size="lg">
              Get Your Free Quote Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicePage;
