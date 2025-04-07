
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, LogIn } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">ConcreterQuotes.com</h3>
            <p className="text-gray-300 mb-4">Connecting homeowners with trusted concrete contractors across the USA. Get free quotes for your concrete projects today.</p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/concrete-driveways" className="text-gray-300 hover:text-white">Concrete Driveways</Link></li>
              <li><Link to="/concrete-patios" className="text-gray-300 hover:text-white">Concrete Patios</Link></li>
              <li><Link to="/concrete-slab" className="text-gray-300 hover:text-white">Concrete Slabs</Link></li>
              <li><Link to="/decorative-concrete" className="text-gray-300 hover:text-white">Decorative Concrete</Link></li>
              <li><Link to="/concrete-garage" className="text-gray-300 hover:text-white">Concrete Repair</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Popular Locations</h4>
            <ul className="space-y-2">
              <li><Link to="/driveway-concreters/locations/ny" className="text-gray-300 hover:text-white">New York</Link></li>
              <li><Link to="/driveway-concreters/locations/ca" className="text-gray-300 hover:text-white">California</Link></li>
              <li><Link to="/driveway-concreters/locations/il" className="text-gray-300 hover:text-white">Illinois</Link></li>
              <li><Link to="/driveway-concreters/locations/tx" className="text-gray-300 hover:text-white">Texas</Link></li>
              <li><Link to="/driveway-concreters/locations/fl" className="text-gray-300 hover:text-white">Florida</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-brand-blue" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-brand-blue" />
                <span>info@concretequotes.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-brand-blue" />
                <span>Serving the entire USA</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ConcreterQuotes.com. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link>
            <Link to="/contractor/login" className="flex items-center justify-center space-x-1 hover:text-white">
              <LogIn className="h-4 w-4" />
              <span>Contractor Login</span>
            </Link>
            <a href="/sitemap.xml" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
