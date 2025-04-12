
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SiteLayout from './components/layouts/SiteLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import LocationsRoot from './components/locations/LocationsRoot';
import LocationsState from './components/locations/LocationsState';
import LocationDetails from './components/locations/LocationDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <SiteLayout>
              <Home />
            </SiteLayout>
          }
        />
        <Route
          path="/driveway-concreters/locations/:state/:city"
          element={
            <SiteLayout>
              <LocationDetails />
            </SiteLayout>
          }
        />
        <Route
          path="/driveway-concreters/locations/:state"
          element={
            <SiteLayout>
              <LocationsState />
            </SiteLayout>
          }
        />
        <Route
          path="/driveway-concreters/locations"
          element={
            <SiteLayout>
              <LocationsRoot />
            </SiteLayout>
          }
        />
        <Route
          path="*"
          element={
            <SiteLayout>
              <NotFound />
            </SiteLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
