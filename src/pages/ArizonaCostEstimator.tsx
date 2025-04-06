
import React, { useRef } from 'react';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArizonaDrivewayCalculator from '@/components/ArizonaDrivewayCalculator';
import MobileCta from '@/components/driveway-concreters/MobileCta';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  zip: z.string().min(5, { message: "ZIP code is required" }),
  drivewayType: z.string().min(1, { message: "Please select a concrete type" }),
  timeline: z.string().optional(),
});

const ArizonaCostEstimator = () => {
  const { toast } = useToast();
  const calculatorRef = useRef<HTMLDivElement>(null);
  const quoteFormRef = useRef<HTMLDivElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      zip: "",
      drivewayType: "",
      timeline: "",
    },
  });

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToQuoteForm = () => {
    quoteFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value?.toString() || '');
      });
      
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbyk-bKMOQ9Mk98zHN7kWeMS58Ov0S3IJTvHA84yyTf2j4urEIws2f98L6enbX8aW2TrkQ/exec', 
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        }
      );
      
      toast({
        title: "Quote Request Submitted!",
        description: "Thanks! Your details have been submitted. You'll hear from top-rated concreters shortly.",
        duration: 5000,
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Error",
        description: "There was an issue submitting your request. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const tooltipDescriptions = {
    "Standard Concrete": "Basic, durable grey finish.",
    "Exposed Aggregate": "Pebbled decorative surface, great for slip resistance.",
    "Stamped Concrete": "Patterned look that mimics brick, stone, or tile.",
    "Decorative": "Custom designs for upscale curb appeal.",
    "Colored Concrete": "Pigmented mix for modern finish."
  };
  
  return (
    <>
      <SEO 
        title="Arizona Concrete Driveway Cost Estimator 2025" 
        description="Get instant concrete driveway cost estimates for Arizona. Calculate your price in 10 seconds and connect with top-rated local concreters."
        canonicalUrl="/arizona-concrete-cost-estimator"
      />
      
      <Header />
      <MobileCta scrollTo="#quote-form" buttonText="📍 Get My Free Quotes" />
      
      <section className="bg-concrete-light py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Estimate Your Concrete Driveway Cost in 10 Seconds</h1>
            <p className="text-lg md:text-xl mb-6">Get a quick estimate based on your driveway size and concrete finish. All estimates use 2024 Arizona pricing averages.</p>
            
            <div className="bg-white/80 rounded-lg p-3 mb-6 text-sm md:text-base font-medium">
              ✅ 4.5★+ Google Rated &nbsp;•&nbsp; 📍 Arizona-Based Pricing &nbsp;•&nbsp; ⏱️ Quotes in 1–2 Hours
            </div>
            
            <Button onClick={scrollToCalculator} className="cta-button">Get My Estimate</Button>
            <p className="text-sm mt-3 text-gray-600">No sign-up. No obligation. Just a helpful pricing tool.</p>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-20" id="calculator" ref={calculatorRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Get an Instant Driveway Estimate</h2>
            <p className="text-lg max-w-2xl mx-auto">Choose your driveway size and finish to see estimated Arizona pricing.</p>
            <p className="text-sm text-gray-600 mt-2">Size guide: Small = 1 Car (~10×18 ft), Medium = 2 Cars (~16×20 ft), Large = 3+ Cars (~20×30 ft)</p>
          </div>
          
          <ArizonaDrivewayCalculator 
            tooltipDescriptions={tooltipDescriptions}
            estimateDisclaimer="💬 Final pricing depends on location, access, slab thickness, and site prep. This is a base estimate for a flat site with standard concrete."
            afterContent={
              <Button onClick={scrollToQuoteForm} className="cta-button w-full">
                📬 Like the price? Get 2–3 Free Quotes Now →
              </Button>
            }
          />
        </div>
      </section>
      
      <section className="py-12 md:py-20 bg-concrete-light" id="quoteform" ref={quoteFormRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold">Why Use ConcreterQuotes?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg font-medium mb-6">We connect you with concreters rated 4.5★+ on Google, ready to quote your project today.</p>
              <div className="prose lg:prose-lg">                
                <p className="mb-2">🔒 <strong>Verified and insured</strong> — only pre-screened concreters accepted.</p>
                <p className="mb-2">📍 <strong>Arizona based</strong> — get local pricing and fast responses.</p>
                <p className="mb-2">🧠 <strong>You stay in control</strong> — compare quotes, no pressure.</p>
                <p className="mb-2">🏡 <strong>Boost curb appeal and value</strong> — a quality driveway can add $5,000–$10,000 in resale value.</p>
                <p className="mb-2">🚫 <strong>No chasing contractors</strong> — we streamline the process for you.</p>
                
                <p className="font-semibold mt-6 mb-3">What Homeowners Are Saying:</p>
                <p className="mb-2">🗣️ "Got 3 quotes in one afternoon. Saved me so much time." – Josh from Tempe</p>
                <p className="mb-2">📍 "I liked that I could choose who to speak with. Super easy." – Maria from Mesa</p>
                <p className="mb-2">⭐ "All 3 concreters were highly rated. Felt like a safe choice." – Dan in Scottsdale</p>
              </div>
            </div>
            
            <div id="quote-form">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Get 2–3 Free Driveway Quotes</h2>
              <p className="text-lg mb-6">📬 Most homeowners receive their first quote within 1–2 business hours.</p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 md:p-8 rounded-lg shadow-lg">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Arizona ZIP code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="drivewayType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of Concrete Driveway</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Standard Concrete">Standard Concrete</SelectItem>
                            <SelectItem value="Stamped Concrete">Stamped Concrete</SelectItem>
                            <SelectItem value="Exposed Aggregate">Exposed Aggregate</SelectItem>
                            <SelectItem value="Colored Concrete">Colored Concrete</SelectItem>
                            <SelectItem value="Decorative Finish">Decorative Finish</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="timeline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>When do you want the project done?</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select timeline (Optional)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ASAP">ASAP</SelectItem>
                            <SelectItem value="Within a week">Within a week</SelectItem>
                            <SelectItem value="1–2 weeks">1–2 weeks</SelectItem>
                            <SelectItem value="2–4 weeks">2–4 weeks</SelectItem>
                            <SelectItem value="1–2 months">1–2 months</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="cta-button w-full py-6 text-lg">
                    📍 Get My Free Quotes
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      We only connect you with concreters rated 4.5★ or higher. No spam. No obligation.
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default ArizonaCostEstimator;
