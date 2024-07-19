import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import LandingPage from './components/LandingPage.jsx';
import News from './components/News';
import { CityProvider } from './components/CityContext.jsx';
import Itinerary from './components/Itinerary.jsx';
import Companion from './components/Companion.jsx';
import Agents from './components/Agents.jsx';

const App = () => (
    <CityProvider>
        <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Weather" element={<Weather />} />
          <Route path="/Itinerary" element={<Itinerary/>} />
          <Route path="/Companion" element={<Companion />} /> 
          <Route path="/news" element={<News />} /> 
          <Route path="/Agents" element={<Agents />} />
          
        </Routes>
      </Router>
    </CityProvider>
);

export default App;
