
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const jobTypes = [
  { id: 'driveways', label: 'Driveways' },
  { id: 'slabs', label: 'Slabs' },
  { id: 'footpaths', label: 'Footpaths' },
  { id: 'patios', label: 'Patios' },
];

interface ConcreterSignupFormValues {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  primaryTown: string;
  jobTypes: string[];
}

export default function ConcreterSignup() {
  const navigate = useNavigate();
  const form = useForm<ConcreterSignupFormValues>({
    defaultValues: {
      name: '',
      businessName: '',
      email: '',
      phone: '',
      primaryTown: '',
      jobTypes: [],
    },
  });

  const onSubmit = async (data: ConcreterSignupFormValues) => {
    try {
      const { error } = await supabase.from('contractor_signups').insert({
        name: data.name,
        business_name: data.businessName,
        email: data.email,
        phone: data.phone,
        primary_town: data.primaryTown,
        job_types: data.jobTypes.join(','),
        early_bird: true,
        billing_status: 'pending',
      });

      if (error) throw error;

      // Store form data in session storage to use on confirmation page
      sessionStorage.setItem('contractor_signup_data', JSON.stringify(data));
      
      // Redirect to confirmation page
      navigate('/concretersignup/confirm');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Something went wrong",
        description: "Your information couldn't be submitted. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Concreter Sign Up | $3 Trial for 3 Leads</title>
        <meta name="description" content="Sign up to get your first 3 concrete leads for just $3 with our early bird offer" />
      </Helmet>

      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <section className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">🚨 Get Your First 3 Concrete Leads for Just $3</h1>
            <p className="text-lg text-gray-700 mb-4">
              We're launching in your area and selecting just 3 concreters to test our platform.
            </p>
            <p className="text-lg text-gray-700">
              For $3, you'll receive 3 real homeowner driveway leads matched to your service area (within 50km).
              After that, it's just $20 per lead — no subscriptions, no commitments. Cancel any time.
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">What You Get:</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✔️</span>
                <span>3 driveway leads for $3 total</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✔️</span>
                <span>Sent directly to your phone or inbox</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✔️</span>
                <span>You choose how many leads/month you want</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✔️</span>
                <span>Cancel anytime after your third lead</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✔️</span>
                <span>No lock-ins, no minimums</span>
              </li>
            </ul>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Smith Concreting" required {...field} />
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
                        <Input type="email" placeholder="john@example.com" required {...field} />
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
                        <Input type="tel" placeholder="(555) 123-4567" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="primaryTown"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Town/Suburb</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Brisbane, Parramatta, etc." required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormLabel>Job Types</FormLabel>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {jobTypes.map((type) => (
                    <FormField
                      key={type.id}
                      control={form.control}
                      name="jobTypes"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(type.id)}
                              onCheckedChange={(checked) => {
                                const updatedValue = checked
                                  ? [...field.value, type.id]
                                  : field.value?.filter((value) => value !== type.id);
                                field.onChange(updatedValue);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {type.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
              
              <Button type="submit" className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700">
                Claim My $3 Trial
              </Button>
            </form>
          </Form>
        </section>
      </main>

      <Footer />
    </>
  );
}
