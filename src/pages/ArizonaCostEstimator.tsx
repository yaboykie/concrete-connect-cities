
import React, { useRef } from 'react';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArizonaDrivewayCalculator from '@/components/ArizonaDrivewayCalculator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

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
        description="Get instant concrete driveway cost estimates for Arizona. Calculate your price in 15 seconds and connect with top-rated local concreters."
        canonicalUrl="/arizona-concrete-cost-estimator"
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="bg-concrete-light py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">🧱 Estimate Your Concrete Driveway Cost in 15 Seconds</h1>
            <p className="text-lg md:text-xl mb-4">💲 Estimate looking good? Instantly connect with 2–3 top-rated concreters in Arizona (4.7★+ on Google) for a custom quote.</p>
            <p className="text-lg md:text-xl mb-6">📍 Pricing is based on real Arizona rates — updated for 2024.</p>
            <Button onClick={scrollToCalculator} className="cta-button">Start My Estimate</Button>
          </div>
        </div>
      </section>
      
      {/* Calculator Section */}
      <section className="py-12 md:py-20" id="calculator" ref={calculatorRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Get Your Instant Arizona Driveway Estimate</h2>
            <p className="text-lg max-w-2xl mx-auto">Select your driveway size and finish. We'll give you an instant ballpark estimate based on average Arizona prices.</p>
          </div>
          
          <ArizonaDrivewayCalculator />
        </div>
      </section>
      
      {/* Quote Form Section */}
      <section className="py-12 md:py-20 bg-concrete-light">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Estimate Looks Good?</h2>
              <p className="text-lg">We'll connect you with 2–3 trusted local concreters (4.7★+ rated) who can give you a firm quote for your project.</p>
            </div>
            
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <SelectItem value="Aggregate">Aggregate</SelectItem>
                            <SelectItem value="Exposed Aggregate">Exposed Aggregate</SelectItem>
                            <SelectItem value="Decorative">Decorative</SelectItem>
                            <SelectItem value="Stamped Concrete">Stamped Concrete</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Timeline</FormLabel>
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
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="cta-button w-full py-6 text-lg">
                  Get My Custom Driveway Quotes
                </Button>
                
                <p className="text-sm text-gray-600 text-center mt-3">
                  We only connect you with concreters rated 4.7★ or higher on Google. No spam. No pressure. Just accurate quotes from local pros.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </section>
      
      {/* Trust Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Why Homeowners in Arizona Choose ConcreterQuotes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4">
              <div className="text-4xl mb-3">⭐</div>
              <p className="font-medium">Only 4.7★+ Rated Concreters</p>
            </div>
            
            <div className="text-center p-4">
              <div className="text-4xl mb-3">📍</div>
              <p className="font-medium">Based on Local Arizona Pricing</p>
            </div>
            
            <div className="text-center p-4">
              <div className="text-4xl mb-3">⏱️</div>
              <p className="font-medium">Replies Within 1 Business Hour</p>
            </div>
            
            <div className="text-center p-4">
              <div className="text-4xl mb-3">🚫</div>
              <p className="font-medium">No Spam, No Sales Pressure</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-12 md:py-16 bg-concrete-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Still Comparing Costs?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Use our free calculator to estimate your project — then connect with verified local pros for exact pricing.</p>
          <Button onClick={scrollToCalculator} className="cta-button">Start My Estimate</Button>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default ArizonaCostEstimator;
