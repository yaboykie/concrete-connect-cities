
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
            <Route path="/driveway-concreters/locations" element={<DrivewayConcreterLocations />} />
            <Route path="/driveway-concreters/locations/:state/:city" element={<DrivewayConcreterLocations />} />
            {/* Example direct route to Austin, TX */}
            <Route path="/driveway-concreters/austin-tx" element={<DrivewayConcreterLocations />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
