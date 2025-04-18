
import React, { useRef, useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import CalculatorSection from '@/components/home/CalculatorSection';
import MatchEstimateSection from '@/components/home/MatchEstimateSection';
import BeliefSection from '@/components/home/BeliefSection';
import ValueProposition from '@/components/home/ValueProposition';
import TrustSection from '@/components/home/TrustSection';
import EaseSpeedSection from '@/components/home/EaseSpeedSection';
import EmotionalCloser from '@/components/home/EmotionalCloser';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FinalCTA from '@/components/home/FinalCTA';
import ExitIntentDialog from '@/components/home/ExitIntentDialog';
import { ScrollTracker } from '@/components/home/ScrollTracker';

const Home = () => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitEmail, setExitEmail] = useState('');
  const calculatorRef = useRef<HTMLDivElement>(null);
  
  const handleScroll = (scrollPercentage: number) => {
    if (scrollPercentage > 50 && !localStorage.getItem('exitModalShown')) {
      setShowExitModal(true);
      localStorage.setItem('exitModalShown', 'true');
    }
  };
  
  const scrollToCalculator = () => {
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleExitEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowExitModal(false);
    setExitEmail('');
  };

  return (
    <main className="flex-grow">
      <ScrollTracker onScroll={handleScroll} />
      <HeroSection scrollToCalculator={scrollToCalculator} />
      <CalculatorSection calculatorRef={calculatorRef} />
      <MatchEstimateSection />
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
