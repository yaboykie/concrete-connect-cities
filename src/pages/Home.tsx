
"use client"

import React, { useState, useRef, useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import CalculatorSection from '@/components/home/CalculatorSection';
import MatchEstimateSection from '@/components/home/MatchEstimateSection';
import BeliefSection from '@/components/home/BeliefSection';
import TrustSection from '@/components/home/TrustSection';
import EaseSpeedSection from '@/components/home/EaseSpeedSection';
import EmotionalCloser from '@/components/home/EmotionalCloser';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FinalCTA from '@/components/home/FinalCTA';
import ExitIntentModal from '@/components/home/ExitIntentModal';

export default function HomePage() {
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitEmail, setExitEmail] = useState('');
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const calculatorRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position to trigger exit intent modal
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollPercentage(scrollPercentage);
      
      // Show exit intent modal when user scrolls past 50% and hasn't submitted
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

  return (
    <main className="flex-grow">
      <HeroSection scrollToCalculator={scrollToCalculator} />
      <CalculatorSection calculatorRef={calculatorRef} />
      <MatchEstimateSection />
      <BeliefSection />
      <TrustSection />
      <EaseSpeedSection />
      <EmotionalCloser />
      <TestimonialsSection />
      <FinalCTA />
      <ExitIntentModal 
        showModal={showExitModal} 
        setShowModal={setShowExitModal} 
        exitEmail={exitEmail} 
        setExitEmail={setExitEmail} 
      />
    </main>
  );
}
