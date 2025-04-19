
"use client"

import React, { useState, useRef, useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import CalculatorSection from '@/components/home/CalculatorSection';
import MatchEstimateSection from '@/components/home/MatchEstimateSection';
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
  
  // Add state to track calculator data
  const [calculatorData, setCalculatorData] = useState({
    area: 0,
    priceRange: 'Contact for quote',
    stateName: 'Texas'
  });
  
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
  
  // Handler to update calculator data
  const handleCalculatorDataUpdate = (data: { area: number; priceRange: string; stateName: string }) => {
    setCalculatorData(data);
    console.log("Calculator data updated:", data);
  };

  return (
    <main className="flex-grow">
      <HeroSection scrollToCalculator={scrollToCalculator} />
      <CalculatorSection 
        calculatorRef={calculatorRef} 
        onCalculatorDataUpdate={handleCalculatorDataUpdate}
      />
      <MatchEstimateSection 
        area={calculatorData.area} 
        priceRange={calculatorData.priceRange} 
        stateName={calculatorData.stateName} 
      />
      <TrustSection />
      <EaseSpeedSection />
      <EmotionalCloser />
      <TestimonialsSection />
      <FinalCTA 
        area={calculatorData.area} 
        priceRange={calculatorData.priceRange} 
        stateName={calculatorData.stateName} 
      />
      <ExitIntentModal 
        showModal={showExitModal} 
        setShowModal={setShowExitModal} 
        exitEmail={exitEmail} 
        setExitEmail={setExitEmail} 
      />
    </main>
  );
}
