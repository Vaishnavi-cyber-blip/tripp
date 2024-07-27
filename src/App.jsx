// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import React from 'react';
// import LandingPage from './components/LandingPage.jsx';
// import News from './components/News.jsx';
// import { CityProvider } from './components/CityContext';
// import Itinerary from './components/Itinerary.jsx';
// import Companion from './components/Companion.jsx';
// import Agents from './components/Agents.jsx';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import Weather from './components/Weather.jsx'; // Correct if Weather.jsx is in the same directory



// const App = () => (
//     <CityProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/Weather" element={<Weather />} />
//           <Route path="/Itinerary" element={<Itinerary/>} />
//           <Route path="/Companion" element={<Companion />} /> 
//           <Route path="/News" element={<News />} /> 
//           <Route path="/Agents" element={<Agents />} />
          
//         </Routes>
//       </Router>
//     </CityProvider>
// );

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Companion from './components/Companion.jsx';
import LandingPage from './components/LandingPage.jsx';
import News from './components/News.jsx';
import Weather from './components/Weather.jsx';

const App = () => {
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/companion" element={<Companion />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/news" element={<News />} />
        </Routes>
      
    </Router>
  );
};

export default App;