
import React, { useRef, useEffect, useState } from 'react';
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
  const [showSticky, setShowSticky] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const halfway = document.body.scrollHeight * 0.5;
      if (scrolled >= halfway) {
        setShowSticky(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCalculatorInteraction = () => setShowSticky(true);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value?.toString() || '');
      });

      await fetch('https://script.google.com/macros/s/AKfycbyk-bKMOQ9Mk98zHN7kWeMS58Ov0S3IJTvHA84yyTf2j4urEIws2f98L6enbX8aW2TrkQ/exec', {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });

      toast({
        title: "Quote Request Submitted!",
        description: "Thanks! You'll hear from top-rated concreters shortly.",
        duration: 5000,
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was an issue submitting your request.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <>
      <SEO 
        title="Arizona Concrete Driveway Cost Estimator 2025" 
        description="Get instant 2025 concrete driveway cost estimates for Arizona. Calculate your price in 10 seconds and connect with top-rated local concreters."
        canonicalUrl="/arizona-concrete-cost-estimator"
      />

      <Header />
      <MobileCta scrollTo="#quote-form" buttonText="📍 Get My Free Quotes" />

      <section className="bg-concrete-light py-14 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Estimate Your Concrete Driveway Cost in 10 Seconds – Arizona Pricing</h1>
          <p className="text-lg md:text-xl mb-6">See how much a new driveway might cost based on your size and finish — no sign-up needed.</p>
          <div className="bg-white/80 rounded-lg p-3 mb-6 text-sm font-medium">
            ✅ Built for Arizona • 📍 2025 Local Pricing • 🏆 Only Top-Rated Concreters
          </div>
          <Button onClick={() => calculatorRef.current?.scrollIntoView({ behavior: 'smooth' })} className="cta-button">Get My Estimate</Button>
          <p className="text-sm mt-3 text-gray-600">No spam. No pressure. Just a helpful price guide.</p>
        </div>
      </section>

      <section className="py-12 md:py-20" id="calculator" ref={calculatorRef}>
        <div className="container mx-auto px-4">
          <ArizonaDrivewayCalculator onInteraction={handleCalculatorInteraction} />
        </div>
      </section>

      {/* Sticky CTA - appears after scroll or calculator interaction */}
      {showSticky && (
        <div className="fixed bottom-4 inset-x-0 px-4 z-50">
          <a
            href="#quote-form"
            className="cta-button block w-full text-center text-lg py-4 rounded-md bg-brand-blue text-white font-medium hover:bg-blue-600 transition-all"
          >
            📍 Get Free Driveway Quotes
          </a>
        </div>
      )}

      <section className="py-16 md:py-24 bg-white" id="quote-form" ref={quoteFormRef}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get 2–3 Free Driveway Quotes Based on Your Estimate</h2>
            <p className="text-lg">Most homeowners hear back within 1–2 business hours. All concreters are Google-rated 4.7★ and above.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-50 p-6 md:p-10 rounded-lg shadow-lg space-y-6">
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
                          <SelectValue placeholder="Select finish type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Standard Concrete">Standard Concrete</SelectItem>
                        <SelectItem value="Exposed Aggregate">Exposed Aggregate</SelectItem>
                        <SelectItem value="Stamped Concrete">Stamped Concrete</SelectItem>
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
                          <SelectValue placeholder="Select timeline (optional)" />
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

              <Button type="submit" className="cta-button w-full py-5 text-lg">📍 Get My Free Quotes</Button>
              <p className="text-sm text-center text-gray-600 mt-2">
                We only work with concreters rated 4.7★ or higher. No spam. No obligation.
              </p>
            </form>
          </Form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ArizonaCostEstimator;
