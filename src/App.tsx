
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LocationService from "./pages/LocationService";
import DrivewayConcreterLocations from "./pages/DrivewayConcreterLocations";
import ServicePage from "./pages/ServicePage";
import Contact from '@/pages/Contact';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import ConcreterSignup from '@/pages/ConcreterSignup';
import ConcreterSignupConfirm from '@/pages/ConcreterSignupConfirm';
import ConcreterSignupThankYou from '@/pages/ConcreterSignupThankYou';
import ArizonaCostEstimator from '@/pages/ArizonaCostEstimator';
import StateDrivewayEstimator from '@/pages/StateDrivewayEstimator';
import ContractorSignup from '@/pages/ContractorSignup';
import ContractorDashboard from '@/pages/contractor/Dashboard';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HelmetProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Static assets like sitemap.xml should not be handled by React Router */}
            <Route path="/" element={<Index />} />
            <Route path="/locations/:state/:city/:service" element={<LocationService />} />
            
            {/* Driveway concreter routes */}
            <Route path="/driveway-concreters" element={<DrivewayConcreterLocations />} />
            <Route path="/driveway-concreters/locations" element={<DrivewayConcreterLocations />} />
            <Route path="/driveway-concreters/locations/:state" element={<DrivewayConcreterLocations />} />
            <Route path="/driveway-concreters/locations/:state/:city" element={<DrivewayConcreterLocations />} />
            
            {/* Concrete contractor routes */}
            <Route path="/concrete-contractor/locations" element={<DrivewayConcreterLocations />} />
            <Route path="/concrete-contractor/locations/:state" element={<DrivewayConcreterLocations />} />
            <Route path="/concrete-contractor/locations/:state/:city" element={<DrivewayConcreterLocations />} />
            
            {/* Concrete patios routes */}
            <Route path="/concrete-patios/locations" element={<DrivewayConcreterLocations />} />
            <Route path="/concrete-patios/locations/:state" element={<DrivewayConcreterLocations />} />
            <Route path="/concrete-patios/locations/:state/:city" element={<DrivewayConcreterLocations />} />
            
            {/* Service pages */}
            <Route path="/concrete-driveways" element={<ServicePage />} />
            <Route path="/concrete-patios" element={<ServicePage />} />
            <Route path="/concrete-slab" element={<ServicePage />} />
            <Route path="/concrete-garage" element={<ServicePage />} />
            <Route path="/decorative-concrete" element={<ServicePage />} />
            <Route path="/commercial-concrete" element={<ServicePage />} />
            <Route path="/:service" element={<ServicePage />} />
            
            {/* Cost estimator pages */}
            <Route path="/arizona-concrete-cost-estimator" element={<ArizonaCostEstimator />} />
            <Route path="/:state/driveway-cost-estimator" element={<StateDrivewayEstimator />} />
            
            {/* Concreter signup funnel routes */}
            <Route path="/concretersignup" element={<ConcreterSignup />} />
            <Route path="/concretersignup/confirm" element={<ConcreterSignupConfirm />} />
            <Route path="/concretersignup/thank-you" element={<ConcreterSignupThankYou />} />
            
            {/* Contractor routes */}
            <Route path="/contractor/dashboard" element={<ContractorDashboard />} />
            <Route path="/contractorsignup" element={<ContractorSignup />} />
            
            {/* Example direct routes to locations - using redirect in DrivewayConcreterLocations */}
            <Route path="/driveway-concreters/:city-:state" element={<DrivewayConcreterLocations />} />
            
            {/* Legal pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
