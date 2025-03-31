
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

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
              <li><Link to="#" className="text-gray-300 hover:text-white">Concrete Driveways</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Concrete Patios</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Concrete Slabs</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Decorative Concrete</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Concrete Repair</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Popular Locations</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-300 hover:text-white">New York</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Los Angeles</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Chicago</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Houston</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Phoenix</Link></li>
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
            <Link to="#" className="hover:text-white">Privacy Policy</Link>
            <Link to="#" className="hover:text-white">Terms of Service</Link>
            <Link to="#" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
