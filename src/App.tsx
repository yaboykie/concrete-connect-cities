import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LocationService from "./pages/LocationService";
import DrivewayConcreterLocations from "./pages/DrivewayConcreterLocations";
import ServicePage from "./pages/ServicePage";
import Contact from '@/pages/Contact';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HelmetProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/locations/:state/:city/:service" element={<LocationService />} />
            
            {/* Driveway concreter routes */}
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
            
            {/* Example direct route to Austin, TX */}
            <Route path="/driveway-concreters/austin-tx" element={<DrivewayConcreterLocations />} />
            
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
