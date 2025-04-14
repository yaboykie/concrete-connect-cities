
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PriceEstimateDisplayProps {
  price?: { pricePerSqft: string; avgSize: string; totalRange: string } | null;
  area: number;
  stateName: string;
  estimateDisclaimer?: string;
  onGetQuotes: (e: React.MouseEvent) => void;
  dataSource?: string;
}

// Define the form schema
const emailFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  zipCode: z.string().optional()
});

type EmailFormValues = z.infer<typeof emailFormSchema>;

export default function PriceEstimateDisplay({
  price,
  area,
  stateName,
  estimateDisclaimer,
  onGetQuotes,
  dataSource = 'specific'
}: PriceEstimateDisplayProps) {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      zipCode: ''
    }
  });

  // If we don't have pricing data or area is invalid
  if (!price || area <= 0) {
    return (
      <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-100 text-center">
        <h3 className="text-lg font-medium text-gray-800">
          {area <= 0
            ? "Please enter valid dimensions to get an estimate"
            : `We're showing you our standard pricing guide. For exact quotes in ${stateName}, please continue below.`}
        </h3>
        <Button className="mt-4" onClick={onGetQuotes}>Get Free Quotes</Button>
      </div>
    );
  }

  // Calculate the estimated price range based on the actual area
  const calculatePriceRange = () => {
    // Extract numbers from the pricePerSqft string (e.g., "$5-7" -> [5, 7])
    const priceMatch = price.pricePerSqft.match(/\$(\d+)-(\d+)/);
    if (!priceMatch) return price.totalRange; // Fallback to the default range

    const minPrice = parseInt(priceMatch[1]);
    const maxPrice = parseInt(priceMatch[2]);
    
    // Calculate the price range based on the actual area
    const minTotal = minPrice * area;
    const maxTotal = maxPrice * area;
    
    return `$${minTotal.toLocaleString()}-${maxTotal.toLocaleString()}`;
  };

  // Get the calculated price range
  const calculatedPriceRange = calculatePriceRange();

  // Determine data source message
  const getDataSourceMessage = () => {
    switch(dataSource) {
      case 'specific':
        return null; // No message needed for database-specific data
      case 'state-default':
        return (
          <p className="mt-1 text-green-600">
            Using specific pricing data for {stateName}.
          </p>
        );
      case 'fallback':
      default:
        return (
          <p className="mt-1 text-amber-600">
            Note: Using estimated pricing for {stateName} based on regional averages.
            Request quotes below for exact pricing from local contractors.
          </p>
        );
    }
  };

  // Handle email submission
  const handleEmailSubmit = async (values: EmailFormValues) => {
    try {
      setSubmitting(true);
      
      const leadId = crypto.randomUUID();
      
      // Insert the lead into Supabase
      const { error } = await supabase.from("leads").insert([
        {
          lead_id: leadId,
          name: values.name,
          email: values.email,
          phone: values.phone || null,
          zip_code: values.zipCode || null,
          job_type: "driveway",
          formatted_job_type: "Driveway Installation",
          status: "new",
          matched_contractor_ids: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          campaign_id: null,
        },
      ]);
      
      if (error) throw new Error(error.message);
      
      // Show success toast
      toast({
        title: "Email Sent!",
        description: `We've emailed your estimate to ${values.email}`,
        duration: 5000
      });
      
      // Close modal and reset form
      setEmailModalOpen(false);
      form.reset();
      
      console.log("Lead submitted successfully:", leadId);
      
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem sending your estimate. Please try again.",
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  // Handle quick quote button
  const handleGetQuotesClick = async (e: React.MouseEvent) => {
    try {
      // Create a lead without personal details
      const leadId = crypto.randomUUID();
      
      const { error } = await supabase.from("leads").insert([
        {
          lead_id: leadId,
          name: null,
          email: null,
          phone: null,
          zip_code: null, // We don't have zip code for this flow
          job_type: "driveway",
          formatted_job_type: "Driveway Installation",
          status: "new",
          matched_contractor_ids: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          campaign_id: null,
        },
      ]);
      
      if (error) throw new Error(error.message);
      
      // Show success toast
      toast({
        title: "Request Submitted!",
        description: "We'll match you with contractors now.",
        duration: 5000
      });
      
      console.log("Quick lead submitted successfully:", leadId);
      
      // Call the original onGetQuotes handler if provided
      if (onGetQuotes) {
        onGetQuotes(e);
      }
      
    } catch (error) {
      console.error("Error submitting quick lead:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem with your request. Please try again.",
        variant: "destructive",
        duration: 5000
      });
      
      // Still call the original handler even if there's an error
      if (onGetQuotes) {
        onGetQuotes(e);
      }
    }
  };

  return (
    <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-100">
      <h3 className="text-xl font-bold text-center">Your {stateName} Driveway Estimate</h3>
      
      <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-700 mb-2">
          <strong>Price per Sqft:</strong> {price.pricePerSqft}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <strong>Typical Job Size:</strong> {price.avgSize} sqft
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <strong>Typical Total Range:</strong> {price.totalRange}
        </p>
        <p className="text-sm font-medium text-gray-800">
          <strong>Your Estimated Cost:</strong> {calculatedPriceRange} ({area} sqft)
        </p>
      </div>
      
      <div className="mt-3 text-xs text-gray-500 text-center">
        <p>Driveway size: {area} sqft</p>
        {estimateDisclaimer && <p className="mt-1">{estimateDisclaimer}</p>}
        {getDataSourceMessage()}
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <Button 
          onClick={() => setEmailModalOpen(true)} 
          variant="outline" 
          className="flex items-center justify-center"
        >
          <Mail className="mr-2 h-4 w-4" /> Email To Me
        </Button>
        <Button 
          size="lg" 
          onClick={handleGetQuotesClick}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Get Free Quotes
        </Button>
      </div>
      
      {/* Email Modal */}
      <Dialog open={emailModalOpen} onOpenChange={setEmailModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">Email Your Estimate</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEmailSubmit)} className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
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
                    <FormLabel>Phone (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 555-5555" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP Code (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="10001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send My Estimate
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
