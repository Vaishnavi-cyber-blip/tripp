import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlane, FaCloudSun, FaNewspaper, FaTachometerAlt } from 'react-icons/fa';
import { useCity } from './CityContext'; // Import the useCity hook
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaUserFriends, FaMicrophone, FaClipboardList } from 'react-icons/fa';

const LandingPage = () => {
  const { cityName, setCityName } = useCity(); // Use the useCity hook to access global state
  const [inputCity, setInputCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setCityName(inputCity); // Set the city name in global state
      setInputCity(''); // Reset the input field
    } catch (error) {
      console.error('Error setting city name:', error);
    }
  };

  const carouselImages = [
    {
      category: 'Mountains',
      url: 'https://i1.wp.com/www.zingbus.com/blog/wp-content/uploads/2023/03/The-Himalayas-1024x683.jpg?ssl=1'
    },
    {
      category: 'Beaches',
      url: 'https://www.thestatesman.com/wp-content/uploads/2023/12/winter-beach-escapes.jpg'
    },
    {
      category: 'Heritage',
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Fatehput_Sikiri_Buland_Darwaza_gate_2010.jpg'
    },
    {
      category: 'Pilgrimage',
      url: 'https://plus.unsplash.com/premium_photo-1697730324062-c012bc98eb13?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      category: 'Long Drive',
      url: 'https://images.nativeplanet.com/webp/img/2023/10/alt-text-serene-landscapes-of-north-indian-roads_1696497105727-600x338-20231005145213.jpg'
    },
    {
      category: 'Adventure',
      url: 'https://www.revv.co.in/blogs/wp-content/uploads/2020/08/rafting_image8.jpg'
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D)' }}>
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-white text-black flex flex-col p-4 shadow-lg lg:fixed lg:h-full">
        <div className="text-2xl font-bold mb-4">Trip Bharat</div>
        <nav className="flex-1 space-y-4">
          <Link to="/agents" className="flex items-center space-x-2 p-2 rounded hover:bg-yellow-400 transition duration-300">
            <FaTachometerAlt />
            <span>Recommendations</span>
          </Link>
          <Link to="/itinerary" className="flex items-center space-x-2 p-2 rounded hover:bg-yellow-400 transition duration-300">
            <FaPlane />
            <span>Itinerary Planner</span>
          </Link>
          <Link to="/weather" className="flex items-center space-x-2 p-2 rounded hover:bg-yellow-400 transition duration-300">
            <FaCloudSun />
            <span>Weather</span>
          </Link>
          <Link to="/news" className="flex items-center space-x-2 p-2 rounded hover:bg-yellow-400 transition duration-300">
            <FaNewspaper />
            <span>News Updates</span>
          </Link>
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 bg-opacity-75 bg-gray-900 text-white lg:ml-64">
        <header className="text-3xl lg:text-5xl font-bold mb-3 text-center mt-10">Let AI Assist Plan Your Trip</header>
        <h2 className="text-lg lg:text-xl mb-8 text-center">Experience the best trip planning with personalized recommendations.</h2>

        {/* City input form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row mb-8 w-full max-w-lg mx-auto mt-4">
          <input
            type="text"
            placeholder="You are travelling to..."
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            className="bg-white text-black py-2 px-4 rounded-t-md sm:rounded-l-md sm:rounded-t-none outline-none flex-grow"
          />
          <button type="submit" className="bg-yellow-500 text-black py-2 px-6 rounded-b-md sm:rounded-r-md sm:rounded-b-none hover:bg-yellow-600 transition duration-300 mt-2 sm:mt-0">
            Set City
          </button>
        </form>

        {/* Buttons to navigate */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
        <Link to="/companion" className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 flex items-center justify-center">
            <FaUserFriends size={22} />
        </Link>
        <Link to="/voicechat" className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 flex items-center justify-center">
            <FaMicrophone size={22} />
        </Link>
        <Link to="/plan" className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 flex items-center justify-center">
            <FaClipboardList size={22} color="black" />
        </Link>
        </div>

        {/* Carousel */}
        <div className="relative w-full max-w-4xl mb-8 mt-10">
          <Slider {...settings}>
            {carouselImages.map((image, index) => (
              <div key={index} className="relative w-64 h-64 flex-shrink-0 bg-gray-200 rounded overflow-hidden shadow-lg mx-4">
                <img
                  src={image.url}
                  alt={image.category}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
                  {image.category}
                </div>
              </div>
            ))}
          </Slider>
        </div>
        
      </div>
    </div>
  );
};

export default LandingPage;
