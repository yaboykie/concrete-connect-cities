
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface SiteLayoutProps {
  children: React.ReactNode;
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-screen-lg mx-auto px-4 py-6 space-y-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
