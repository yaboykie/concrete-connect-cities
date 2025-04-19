
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import { Search, Phone, Shield, Clock } from 'lucide-react';

const ComparisonTable = () => {
  return (
    <section className="bg-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-3">
          Why Most Homeowners Switch to ConcreterQuotes
        </h2>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          Doing it yourself means more time, more chasing — and more risk.
          Here's how we stack up:
        </p>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3"></TableHead>
                <TableHead className="w-1/3">Doing It Yourself</TableHead>
                <TableHead className="w-1/3">Using ConcreterQuotes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-blue-500" />
                    Finding Concreters
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">Random Google searches, Facebook groups, local guesses</TableCell>
                <TableCell className="text-brand-blue">4.7★+ pros instantly matched to your job</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-500" />
                    Getting Quotes
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">Voicemails, "We're booked", slow replies</TableCell>
                <TableCell className="text-brand-blue">2–3 ready-to-quote concreters — no chasing required</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-500" />
                    Peace of Mind
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">No reviews, no filtering, just hoping they're good</TableCell>
                <TableCell className="text-brand-blue">Pre-vetted for quality, reviews, and recent reliability</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Time Spent
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">2–3 hours calling around</TableCell>
                <TableCell className="text-brand-blue">2 minutes to check costs and match with local pros</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
