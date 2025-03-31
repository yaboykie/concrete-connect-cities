
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-brand-navy">
              ConcreterQuotes<span className="text-brand-blue">.com</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2 text-brand-blue" />
              <span>Serving the entire USA</span>
            </div>
            <Button className="cta-button flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              Get Free Quote
            </Button>
          </div>
          <Button className="cta-button md:hidden flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            Quote
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
