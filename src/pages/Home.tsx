
import React, { useState, useRef, useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import CalculatorSection from '@/components/home/CalculatorSection';
import BeliefSection from '@/components/home/BeliefSection';
import ValueProposition from '@/components/home/ValueProposition';
import TrustSection from '@/components/home/TrustSection';
import EaseSpeedSection from '@/components/home/EaseSpeedSection';
import EmotionalCloser from '@/components/home/EmotionalCloser';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FinalCTA from '@/components/home/FinalCTA';
import ExitIntentDialog from '@/components/home/ExitIntentDialog';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitEmail, setExitEmail] = useState('');
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollPercentage(scrollPercentage);
      
      if (scrollPercentage > 50 && !localStorage.getItem('exitModalShown')) {
        setShowExitModal(true);
        localStorage.setItem('exitModalShown', 'true');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToCalculator = () => {
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleExitEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowExitModal(false);
    toast({
      title: "Email Sent",
      description: `We've sent your estimate to ${exitEmail}`,
      variant: "success",
      duration: 5000
    });
    setExitEmail('');
  };

  return (
    <main className="flex-grow">
      <HeroSection scrollToCalculator={scrollToCalculator} />
      <CalculatorSection calculatorRef={calculatorRef} />
      <BeliefSection />
      <ValueProposition />
      <TrustSection />
      <EaseSpeedSection />
      <EmotionalCloser />
      <TestimonialsSection />
      <FinalCTA />
      
      <ExitIntentDialog 
        showModal={showExitModal}
        setShowModal={setShowExitModal}
        exitEmail={exitEmail}
        setExitEmail={setExitEmail}
        onSubmit={handleExitEmailSubmit}
      />
    </main>
  );
};

export default Home;
