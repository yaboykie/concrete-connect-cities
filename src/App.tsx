
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CityPage from './pages/CityPage';
import NotFound from './pages/NotFound';
import DrivewayConcreterLocations from './pages/DrivewayConcreterLocations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/driveway-concreters/locations/:state/:city" element={<DrivewayConcreterLocations />} />
        <Route path="/driveway-concreters/locations/:state" element={<DrivewayConcreterLocations />} />
        <Route path="/driveway-concreters/locations" element={<DrivewayConcreterLocations />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
