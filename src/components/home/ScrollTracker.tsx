
import React, { useEffect } from 'react';

interface ScrollTrackerProps {
  onScroll: (percentage: number) => void;
}

export const ScrollTracker: React.FC<ScrollTrackerProps> = ({ onScroll }) => {
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      onScroll(scrollPercentage);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScroll]);

  return null;
};
