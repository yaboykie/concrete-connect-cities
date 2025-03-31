
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title?: string;
  faqs: FaqItem[];
}

const FaqSection: React.FC<FaqSectionProps> = ({ 
  title = "Frequently Asked Questions", 
  faqs 
}) => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg">
              <AccordionTrigger className="text-lg font-semibold text-left px-4 py-3 hover:text-brand-blue">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-1 text-gray-700">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FaqSection;
