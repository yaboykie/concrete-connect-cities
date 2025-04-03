import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Check, ArrowRight, DollarSign } from 'lucide-react';
import { locationData } from './LocationData';
import { Button } from '@/components/ui/button';
import QuoteForm from '@/components/QuoteForm';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import InlineQuoteForm from './InlineQuoteForm';

// Helper function to get unique states from location data
const getUniqueStates = () => {
  const states = locationData.map(location => ({
    state: location.state,
    stateName: getStateName(location.state)
  }));
  
  // Remove duplicates by state code
  const uniqueStates = Array.from(new Map(states.map(item => [item.state, item])).values());
  
  // Sort alphabetically by state name
  return uniqueStates.sort((a, b) => a.stateName.localeCompare(b.stateName));
};

// Get full state name from abbreviation
const getStateName = (code: string) => {
  const stateNames: Record<string, string> = {
    'AL': 'Alabama',
    'AK': 'Alaska',
    'AZ': 'Arizona',
    'AR': 'Arkansas',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DE': 'Delaware',
    'FL': 'Florida',
    'GA': 'Georgia',
    'HI': 'Hawaii',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'IA': 'Iowa',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'ME': 'Maine',
    'MD': 'Maryland',
    'MA': 'Massachusetts',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MS': 'Mississippi',
    'MO': 'Missouri',
    'MT': 'Montana',
    'NE': 'Nebraska',
    'NV': 'Nevada',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NY': 'New York',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PA': 'Pennsylvania',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': 'Tennessee',
    'TX': 'Texas',
    'UT': 'Utah',
    'VT': 'Vermont',
    'VA': 'Virginia',
    'WA': 'Washington',
    'WV': 'West Virginia',
    'WI': 'Wisconsin',
    'WY': 'Wyoming'
  };
  
  return stateNames[code] || code;
};

const SimpleQuoteForm = () => {
  const [name, setName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [contact, setContact] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Quote Request Submitted",
        description: "We'll match you with local driveway concreters shortly. Thank you!",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-center">Get a Free Driveway Quote – No Spam, No Pressure</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            placeholder="Your name"
          />
        </div>
        
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium mb-1">ZIP Code</label>
          <Input 
            id="zipCode" 
            value={zipCode} 
            onChange={(e) => setZipCode(e.target.value)} 
            required 
            placeholder="Your ZIP code"
          />
        </div>
        
        <div>
          <label htmlFor="contact" className="block text-sm font-medium mb-1">Phone or Email</label>
          <Input 
            id="contact" 
            value={contact} 
            onChange={(e) => setContact(e.target.value)} 
            required 
            placeholder="How should we contact you?"
          />
        </div>
        
        <div>
          <label htmlFor="details" className="block text-sm font-medium mb-1">Project Details</label>
          <Textarea 
            id="details" 
            value={details} 
            onChange={(e) => setDetails(e.target.value)} 
            placeholder="Tell us about your driveway project"
            rows={3}
          />
        </div>
        
        <Button type="submit" className="w-full cta-button" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "→ Match Me with a Local Driveway Concreter"}
        </Button>
        
        <p className="text-xs text-gray-500 text-center mt-2">
          By submitting, you agree to our Terms & Privacy Policy. 
          We'll connect you with contractors who may contact you.
        </p>
      </div>
    </form>
  );
};

const ConcreteStylesSection = () => {
  const styles = [
    {
      title: 'Exposed Aggregate',
      description: 'Pebble-stone texture, stylish and slip-resistant'
    },
    {
      title: 'Stamped Concrete',
      description: 'Mimics brick, stone, or pavers'
    },
    {
      title: 'Brushed Finish',
      description: 'Classic texture with grip'
    },
    {
      title: 'Coloured Concrete',
      description: 'Match your home with custom colors'
    },
    {
      title: 'Polished Concrete',
      description: 'Sleek, modern, designer finish'
    },
    {
      title: 'Pave Cut Concrete',
      description: 'Clean lines, mimics tiles or pavers'
    }
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Popular Concrete Driveway Styles Homeowners Love</h2>
          <p className="text-lg text-center text-gray-700 mb-10">
            Your driveway doesn't have to be plain grey. With so many finishes and styles to choose from, 
            you can get a custom look that complements your home perfectly — while still being durable, 
            low-maintenance, and built to last.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {styles.map((style, index) => (
              <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">{style.title}</h3>
                <p className="text-gray-700">{style.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const LocationsList = () => {
  const uniqueStates = getUniqueStates();
  const isMobile = useIsMobile();
  
  // Scroll to quote form function
  const scrollToQuoteForm = () => {
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <main className="flex-grow">
      {/* Hero Section with Quote Form */}
      <section className="py-8 md:py-12 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Left Column: Headline and Trust Signals */}
            <div className="lg:w-1/2 space-y-5 md:space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Get Free Quotes From Top-Rated Local Driveway Concreters
              </h1>
              
              <div className="text-lg text-gray-700">
                Matched instantly with trusted local pros.
                No spam, no pressure, just real quotes from local concreters you can trust.
              </div>
              
              {/* Mobile layout order: H1, form, trust, sales copy */}
              {isMobile && (
                <>
                  {/* Form moved up on mobile */}
                  <div className="mt-6" id="quote-form">
                    <QuoteForm service="concrete-driveway" />
                  </div>
                  
                  {/* Trust Signals on mobile */}
                  <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 mt-8">
                    <h3 className="font-bold text-xl mb-3">Why Homeowners Trust Us</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-brand-blue flex-shrink-0 mt-1" />
                        <span className="text-gray-700">All concreters are licensed, insured, and thoroughly vetted</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-brand-blue flex-shrink-0 mt-1" />
                        <span className="text-gray-700">We only match with professionals rated 4.5 stars and above</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-brand-blue flex-shrink-0 mt-1" />
                        <span className="text-gray-700">Free service with zero obligation to hire</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {/* Desktop trust signals (only shown on desktop) */}
              {!isMobile && (
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-bold text-xl mb-3">Why Homeowners Trust Us</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-brand-blue flex-shrink-0" />
                      <span className="text-gray-700">All concreters are licensed, insured, and thoroughly vetted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-brand-blue flex-shrink-0" />
                      <span className="text-gray-700">We only match with professionals rated 4.5 stars and above</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-brand-blue flex-shrink-0" />
                      <span className="text-gray-700">Free service with zero obligation to hire</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="space-y-4">
                  <p className="text-lg text-gray-700 font-medium">
                    🏡 <span className="font-bold">Your Driveway, Your First Impression</span>
                  </p>
                  <p className="text-lg text-gray-700">
                    Make the best first impression with a beautiful concrete driveway that elevates your home's curb appeal and adds long-term value. Whether you're coming home after a long day or welcoming guests, a well-installed concrete driveway sets the tone for your entire property, instantly making it look more polished and well-maintained.
                  </p>
                  
                  <p className="text-lg text-gray-700 font-medium">
                    ⚒️ <span className="font-bold">Get Matched With Top Concrete Pros in Your Area</span>
                  </p>
                  <p className="text-lg text-gray-700">
                    We instantly match you with vetted, local concreters who specialize in concrete driveways—ensuring that you're working with the most skilled and reliable professionals in your area. No middlemen, just the real experts who know how to deliver high-quality results.
                  </p>
                  
                  <p className="text-lg text-gray-700 font-medium">
                    ⏱️ <span className="font-bold">Instant Quotes. Real Professionals.</span>
                  </p>
                  <p className="text-lg text-gray-700">
                    Get your free, no-obligation quotes in under 10 seconds, with a typical response time of just 1-2 business hours. Your time is valuable, and we make the process quick, easy, and hassle-free, without the long waits and pushy sales calls.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column: Quote Form (only shown on desktop) */}
            {!isMobile && (
              <div className="lg:w-1/2 w-full">
                <div className="bg-white rounded-lg shadow-xl p-6" id="quote-form">
                  <QuoteForm service="concrete-driveway" />
                  <div className="mt-4 text-center">
                    <p className="text-gray-700">
                      Vetted concreters. Fast quotes. No pressure. Just real experts ready to take on your project.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Value Proposition Section */}
      <section className="bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Why Choose Professional Driveway Concreters?</h2>
            <p className="text-xl text-gray-200 mb-8">
              A new concrete driveway does more than just complete your home's exterior — it enhances curb appeal, 
              adds property value, and provides decades of low-maintenance durability that other materials simply can't match.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Built to Last</h3>
                <p className="text-gray-200">
                  Professional concrete driveways can last 30+ years with minimal maintenance, outperforming asphalt 
                  and gravel alternatives by decades.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Design Flexibility</h3>
                <p className="text-gray-200">
                  From stamped patterns to decorative aggregates and color options, concrete offers unmatched 
                  design versatility for any home style.
                </p>
              </div>
            </div>
            
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4">Benefits of Professional Driveway Installation:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                  <span>Superior strength handles heavy vehicles and prevents cracks</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                  <span>Stamped and decorative finishes available for a custom look</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                  <span>Environmentally friendly with recycled materials</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                  <span>Snow removal is easier than other surfaces</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                  <span>Year-round installation in most climates</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                  <span>Minimal maintenance required for decades</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <Button className="cta-button text-lg" size="lg" onClick={scrollToQuoteForm}>
                Get My Free Driveway Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Concrete Styles Section */}
      <ConcreteStylesSection />
      
      {/* Nationwide Coverage Quick Form Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">We work with top concreters in every state — from major cities to small towns.</h2>
            <p className="text-lg text-center text-gray-700 mb-8">
              Fill out the quick form below and we'll match you with the best local pros for your project.
            </p>
            
            <SimpleQuoteForm />
          </div>
        </div>
      </section>
      
      {/* Add new inline form section above "We're Local Everywhere" */}
      <InlineQuoteForm />
      
      {/* States Listing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">We're Local Everywhere</h2>
            <p className="text-lg text-center text-gray-700 mb-8">
              Our network of concrete professionals spans all 50 states, ensuring you can find quality service no matter where you live.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {uniqueStates.map((state, index) => (
                <Link 
                  key={index}
                  to={`/driveway-concreters/locations/${state.state.toLowerCase()}`}
                  className="flex items-center p-3 border rounded-md hover:border-brand-blue hover:bg-blue-50 transition-colors"
                >
                  <MapPin className="h-4 w-4 mr-2 text-brand-blue" />
                  <span className="font-medium">{state.stateName}</span>
                </Link>
              ))}
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg mt-16">
              <h3 className="text-2xl font-bold mb-4">Why Choose ConcreterQuotes.com?</h3>
              <p className="mb-6">
                At ConcreterQuotes.com, we simplify the process of finding reliable driveway concreters. Our network of vetted 
                contractors specialize in driveways for residential and commercial properties of all sizes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-10 w-10 rounded-full bg-brand-blue flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Verified Professionals</h4>
                    <p className="text-gray-600">Every driveway concreter in our network is pre-screened and qualified</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-10 w-10 rounded-full bg-brand-blue flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Free Quotes</h4>
                    <p className="text-gray-600">No fees or obligations to get estimates for your driveway project</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-10 w-10 rounded-full bg-brand-blue flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Local Expertise</h4>
                    <p className="text-gray-600">Driveway concreters who understand your area's specific requirements</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-10 w-10 rounded-full bg-brand-blue flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Fast Response</h4>
                    <p className="text-gray-600">Get matched with available driveway concreters within 2 hours</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button className="cta-button text-lg" size="lg" onClick={scrollToQuoteForm}>
                Get My Free Driveway Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sticky CTA Button for Mobile */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-50">
          <Button 
            className="cta-button text-lg w-full" 
            size="lg" 
            onClick={scrollToQuoteForm}
          >
            Get My Free Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}
    </main>
  );
};

export default LocationsList;
