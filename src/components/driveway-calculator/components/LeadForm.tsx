
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';

interface LeadFormProps {
  form: UseFormReturn<any>;
  isSubmitting: boolean;
  purpose: 'email' | 'quotes';
  onSubmit: (e: React.FormEvent) => void;
}

export const LeadForm = ({ form, isSubmitting, purpose, onSubmit }: LeadFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          placeholder="Your full name"
          {...form.register('name')}
        />
        {form.formState.errors.name && (
          <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>
        )}
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="Your email address"
          {...form.register('email')}
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            placeholder="Your phone number"
            {...form.register('phone')}
          />
          {form.formState.errors.phone && (
            <p className="text-red-500 text-xs">{form.formState.errors.phone.message}</p>
          )}
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="zip_code">ZIP Code *</Label>
          <Input
            id="zip_code"
            placeholder="Your ZIP code"
            {...form.register('zip_code')}
          />
          {form.formState.errors.zip_code && (
            <p className="text-red-500 text-xs">{form.formState.errors.zip_code.message}</p>
          )}
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-xs text-gray-400 mb-2">
          🔒 Your details are only shared with concreters you approve.
        </p>
      </div>
      
      <div className="w-full">
        <Button type="submit" className="w-full">
          {isSubmitting 
            ? "Sending..." 
            : purpose === 'email' 
              ? "Send My Estimate" 
              : "See My Local Matches"
          }
        </Button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          You'll instantly see up to 3 concreters who match your estimate. No pressure. No spam.
        </p>
      </div>
    </form>
  );
};
