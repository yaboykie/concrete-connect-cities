
import React, { useRef } from 'react';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArizonaDrivewayCalculator from '@/components/ArizonaDrivewayCalculator';
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
  zipCode: z.string().min(5, { message: "ZIP code is required" }),
  concreteType: z.string().min(1, { message: "Please select a concrete type" }),
  timeline: z.string().optional(),
});

const ArizonaCostEstimator = () => {
  const { toast } = useToast();
  const calculatorRef = useRef<HTMLDivElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      zipCode: "",
      concreteType: "",
      timeline: "",
    },
  });

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // This would typically send data to your server or email service
    console.log("Form submitted:", data);
    
    // Display success toast
    toast({
      title: "Quote Request Submitted!",
      description: "We'll connect you with top-rated concreters shortly.",
      duration: 5000,
    });
    
    // Reset form
    form.reset();
  };

  return (
    <>
      <SEO 
        title="Arizona Concrete Driveway Cost Estimator" 
        description="Get instant concrete driveway cost estimates for Arizona. Calculate your price in 10 seconds and connect with top-rated local concreters."
        canonicalUrl="/arizona-concrete-cost-estimator"
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="bg-concrete-light py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Estimate Your Concrete Driveway Cost in 10 Seconds</h1>
            <p className="text-lg md:text-xl mb-6">Get a quick estimate based on your driveway size and concrete finish. All estimates use 2024 Arizona pricing averages.</p>
            <Button onClick={scrollToCalculator} className="cta-button">Get My Estimate</Button>
          </div>
        </div>
      </section>
      
      {/* Calculator Section */}
      <section className="py-12 md:py-20" id="calculator" ref={calculatorRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Select Your Driveway Size and Finish</h2>
            <p className="text-lg max-w-2xl mx-auto">We'll give you an instant ballpark estimate based on average Arizona prices.</p>
          </div>
          
          <ArizonaDrivewayCalculator />
        </div>
      </section>
      
      {/* Columns Section with Form */}
      <section className="py-12 md:py-20 bg-concrete-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Text Column */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Estimate Looks Good?</h2>
              <div className="prose lg:prose-lg">
                <p className="mb-4">Use our free service to instantly connect with 2–3 top-rated concreter companies (4.8★+ Google reviews) to receive custom quotes in a timeframe that suits you.</p>
                <p className="mb-2">🕒 <strong>Save time</strong> chasing quotes — we bring trusted concreters to you.</p>
                <p>🛡️ <strong>No spam, no pressure</strong> — We only have best rated concreters on our platform.</p>
              </div>
            </div>
            
            {/* Form Column */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Get 2–3 Free Quotes Now</h2>
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
                    name="zipCode"
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
                    name="concreteType"
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
                            <SelectItem value="Exposed Aggregate">Exposed Aggregate</SelectItem>
                            <SelectItem value="Stamped Concrete">Stamped Concrete</SelectItem>
                            <SelectItem value="Decorative">Decorative</SelectItem>
                            <SelectItem value="Colored Concrete">Colored Concrete</SelectItem>
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
                            <SelectItem value="1–2 Weeks">1–2 Weeks</SelectItem>
                            <SelectItem value="2–4 Weeks">2–4 Weeks</SelectItem>
                            <SelectItem value="1–2 Months">1–2 Months</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="cta-button w-full py-6 text-lg">
                    Get Your Driveway Quotes Fast – No Obligation
                  </Button>
                  
                  <p className="text-sm text-gray-600 text-center mt-3">
                    We only connect you with concreters rated 4.7★ or higher. No spam. No commitment required.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">What Homeowners Are Saying</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4">
              <div className="text-4xl mb-3">🗣️</div>
              <p className="font-medium">"Got 3 quotes in one afternoon. Saved me so much time." – Josh from Tempe</p>
            </div>
            
            <div className="text-center p-4">
              <div className="text-4xl mb-3">📍</div>
              <p className="font-medium">"I liked that I could choose who to speak with. Super easy." – Maria from Mesa</p>
            </div>
            
            <div className="text-center p-4">
              <div className="text-4xl mb-3">⭐</div>
              <p className="font-medium">"All 3 concreters were highly rated. Felt like a safe choice." – Dan in Scottsdale</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default ArizonaCostEstimator;
