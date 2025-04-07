
import { Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import DrivewayConcreterLocations from './pages/DrivewayConcreterLocations';
import StateDrivewayEstimator from './pages/StateDrivewayEstimator';
import ArizonaCostEstimator from './pages/ArizonaCostEstimator';
import ServicePage from './pages/ServicePage';
import LocationService from './pages/LocationService';
import ContractorLogin from './pages/contractor/Login';
import ContractorDashboard from './pages/contractor/Dashboard';
import ContractorSignup from './pages/ContractorSignup';
import ConcreterSignup from './pages/ConcreterSignup';
import ConcreterSignupThankYou from './pages/ConcreterSignupThankYou';
import ConcreterSignupConfirm from './pages/ConcreterSignupConfirm';
import AuthGuard from './components/contractor-dashboard/AuthGuard';
import AdminSetup from './pages/contractor/AdminSetup';

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/driveway-concreters/locations" element={<DrivewayConcreterLocations />} />
        <Route path="/driveway-concreters/locations/:state" element={<DrivewayConcreterLocations />} />
        <Route path="/driveway-concreters/locations/:state/:city" element={<DrivewayConcreterLocations />} />
        <Route path="/concrete-price-calculator/:state" element={<StateDrivewayEstimator />} />
        <Route path="/concrete-driveway-cost-estimator/arizona" element={<ArizonaCostEstimator />} />
        <Route path="/:service" element={<ServicePage />} />
        <Route path="/:service/locations/:state/:city?" element={<LocationService />} />
        
        {/* Contractor Auth Routes */}
        <Route path="/contractor/login" element={<ContractorLogin />} />
        <Route path="/contractor/admin-setup" element={<AdminSetup />} />

        {/* Protected Contractor Dashboard Routes */}
        <Route path="/contractor/dashboard/*" element={
          <AuthGuard>
            <ContractorDashboard />
          </AuthGuard>
        } />
        
        {/* Contractor Signup Routes */}
        <Route path="/contractorsignup" element={<ContractorSignup />} />
        <Route path="/concretesignup" element={<ConcreterSignup />} />
        <Route path="/concretesignup/thankyou" element={<ConcreterSignupThankYou />} />
        <Route path="/concretesignup/confirm" element={<ConcreterSignupConfirm />} />
        
        {/* Catch-all for 404s */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
