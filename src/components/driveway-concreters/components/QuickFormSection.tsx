
import React from 'react';
import SimpleQuoteForm from './SimpleQuoteForm';

const QuickFormSection = () => {
  return (
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
  );
};

export default QuickFormSection;
