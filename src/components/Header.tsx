import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Menu, X, ChevronRight, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import QuoteFormModal from './QuoteFormModal';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-brand-navy">
              ConcreterQuotes<span className="text-brand-blue">.com</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link to="/">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Concrete Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <div className="space-y-2">
                        <div className="font-medium leading-none">Main Services</div>
                        <div className="space-y-2 mt-2">
                          <Link to="/concrete-contractor/locations" className="block p-2 hover:bg-gray-100 rounded-md">
                            Concrete Contractors
                          </Link>
                          <Link to="/driveway-concreters/locations" className="block p-2 hover:bg-gray-100 rounded-md">
                            Driveway Concreters
                          </Link>
                          <Link to="/concrete-services" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                            More Services 
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium leading-none">Specialized Services</div>
                        <div className="space-y-2 mt-2">
                          <Link to="/concrete-patios/locations" className="block p-2 hover:bg-gray-100 rounded-md">
                            Concrete Patios
                          </Link>
                          <Link to="/decorative-concrete/locations" className="block p-2 hover:bg-gray-100 rounded-md">
                            Decorative Concrete
                          </Link>
                          <Link to="/concrete-garage/locations" className="block p-2 hover:bg-gray-100 rounded-md">
                            Garage Floors
                          </Link>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2 text-brand-blue" />
              <span>Serving the USA</span>
            </div>
            <QuoteFormModal buttonText="Check Local Driveway Costs" />
            <Link to="/contractor/login" className="flex items-center text-sm text-gray-600 hover:text-brand-blue">
              <LogIn className="h-4 w-4 mr-1" />
              <span>Contractor Login</span>
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <nav className="space-y-4">
              <Link to="/" className="block py-2 text-gray-700 hover:text-brand-blue">
                Home
              </Link>
              
              <div className="py-2">
                <p className="font-medium mb-2">Concrete Services</p>
                <div className="pl-4 space-y-2">
                  <Link to="/concrete-contractor/locations" className="block py-1 text-gray-600 hover:text-brand-blue">
                    Concrete Contractors
                  </Link>
                  <Link to="/driveway-concreters/locations" className="block py-1 text-gray-600 hover:text-brand-blue">
                    Driveway Concreters
                  </Link>
                  <Link to="/concrete-patios/locations" className="block py-1 text-gray-600 hover:text-brand-blue">
                    Concrete Patios
                  </Link>
                </div>
              </div>
              
              <Link to="/contractor/login" className="flex items-center py-2 text-gray-700 hover:text-brand-blue">
                <LogIn className="h-4 w-4 mr-2" />
                <span>Contractor Login</span>
              </Link>
              
              <QuoteFormModal buttonClassName="cta-button w-full" />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
