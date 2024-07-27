import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineRobot, AiOutlineCalendar, AiOutlineStar } from 'react-icons/ai';
import { FaCloudSun, FaNewspaper } from 'react-icons/fa';

const logo = '/assets/logo.png';
const indiaBackground = '/assets/wall6.png';

const LandingPage = () => {
  const openItineraryApp = () => {
    window.open('https://itinerary-t5ug.onrender.com', '_blank');
  };

  const openRecommendationsApp = () => {
    window.open('https://recommender-1-3cx5.onrender.com', '_blank');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${indiaBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
    >
      <header className="flex flex-col items-center mb-0">
        <img src={logo} alt="Logo" className="h-48 w-48 -mt-20 " />
      </header>

      <h2 className="text-base lg:text-2xl mb-10 -mt-5 text-center text-custom-purple">
        Discover India with the lens of AI.
      </h2>

      <div className="flex space-x-4">
        <Link
          to="/companion"
          className="w-12 h-12 p-2 rounded-full bg-custom-purple text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
        >
          <AiOutlineRobot size={24} />
        </Link>
        <button
          onClick={openItineraryApp}
          className="w-12 h-12 p-2 rounded-full bg-custom-purple text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
        >
          <AiOutlineCalendar size={24} />
        </button>
        <button
          onClick={openRecommendationsApp}
          className="w-12 h-12 p-2 rounded-full bg-custom-purple text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
        >
          <AiOutlineStar size={24} />
        </button>
        <Link
          to="/weather"
          className="w-12 h-12 p-2 rounded-full bg-custom-purple text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
        >
          <FaCloudSun size={24} />
        </Link>
        <Link
          to="/news"
          className="w-12 h-12 p-2 rounded-full bg-custom-purple text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
        >
          <FaNewspaper size={24} />
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

