
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import LocationsRoot from './components/locations/LocationsRoot';
import LocationsState from './components/locations/LocationsState';
import LocationDetails from './components/locations/LocationDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/driveway-concreters/locations/:state/:city" element={<LocationDetails />} />
        <Route path="/driveway-concreters/locations/:state" element={<LocationsState />} />
        <Route path="/driveway-concreters/locations" element={<LocationsRoot />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
