// import React, { useState } from 'react';
// import axios from 'axios';
// import { useCity } from './CityContext.jsx'; // Ensure this path is correct

// const Companion = () => {
//     const { cityName } = useCity(); // Access cityName from context
//     const [message, setMessage] = useState('');
//     const [chatHistory, setChatHistory] = useState([]);
//     const [response, setResponse] = useState('');

//     const handleMessageChange = (e) => {
//         setMessage(e.target.value);
//     };

//     const handleSendMessage = async () => {
//         if (!message.trim()) return; // Avoid sending empty messages

//         try {
//             const res = await axios.post('https://companion-u6wy.onrender.com/chat', {
//                 message,
//                 history: chatHistory,
//                 cityName
//             });
    
//             // Update chat history and clear the response field
//             setChatHistory(res.data.history);
//             setMessage('');
//             setResponse(res.data.response);
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     };

//     return (
//         <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 min-h-screen flex flex-col items-center justify-center text-white p-4">
//             <h1 className="text-4xl font-bold mb-4">Chat with Travel India Assistant</h1>
//             <div className="bg-white text-black rounded-lg shadow-lg p-6 w-full max-w-3xl mb-4 overflow-y-auto h-64">
//                 {chatHistory.map((chat, index) => (
//                     <div key={index} className="mb-2">
//                         <strong className={chat.role === 'assistant' ? 'text-blue-500' : 'text-green-500'}>{chat.role}:</strong> {chat.content}
//                     </div>
//                 ))}
//             </div>
//             <div className="flex w-full max-w-3xl mb-4">
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={handleMessageChange}
//                     placeholder="Type your message..."
//                     className="flex-grow p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
//                 />
//                 <button
//                     onClick={handleSendMessage}
//                     className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 ease-in-out transform hover:scale-105"
//                 >
//                     Send
//                 </button>
//             </div>
//             {response && (
//                 <div className="bg-white text-black rounded-lg shadow-lg p-6 w-full max-w-3xl">
//                     <strong>Assistant:</strong> {response}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Companion;

import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Weather from './Weather'; // Import the Weather component
import News from './News'; // Import the News component
import { FaPaperPlane, FaCloudSun, FaNewspaper } from 'react-icons/fa';

const indiaBackground = '/assets/wall6.png'; // Use relative path from public directory

const Companion = () => {
  const [cityName, setCityName] = useState('');
  const [cityImages, setCityImages] = useState([]);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // State to manage active tab

  const UNSPLASH_API_KEY = import.meta.env.VITE_APP_UNSPLASH_API_KEY; // Replace with your Unsplash API key
  ; // Replace with your Unsplash API key

  const fetchCityImages = async (city) => {
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query: city, client_id: UNSPLASH_API_KEY, per_page: 4 },
      });
      const images = response.data.results.map((result) => result.urls.regular);
      setCityImages(images);
    } catch (error) {
      console.error('Error fetching city images:', error);
      setCityImages([]); // Reset images on error
    }
  };

  // Handle input change for the city name
  const handleCityChange = (e) => {
    setCityName(e.target.value);
  };

  // Handle submission of the city name when Enter key is pressed
  const handleCitySubmit = async (e) => {
    if (e.key === 'Enter' && cityName.trim()) {
      setChatHistory([
        {
          role: 'system',
          content: `Hi! I am your guide for ${cityName}. Ask me anything about this city.`,
        },
      ]);
      // Send initial request to check city validity
      try {
        const res = await axios.post('http://127.0.0.1:5000/chat', {
          message: '',
          history: [],
          cityName,
        });

        if (res.data.response === 'City not found in India.') {
          // If city is not found, update chat history with the response
          setChatHistory([{ role: 'system', content: res.data.response }]);
        } else {
          // If city is found, fetch city images
          await fetchCityImages(cityName);
        }
      } catch (error) {
        console.error('Error validating city name:', error);
        setChatHistory([
          { role: 'system', content: 'Error validating city name.' },
        ]);
      }
    }
  };

  // Handle input change for the user message
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle sending a message when the send button is clicked
  const handleSendMessage = async () => {
    if (!message.trim() || !cityName.trim()) return;

    const newChatHistory = [
      ...chatHistory,
      { role: 'user', content: message },
    ];
    setChatHistory(newChatHistory);
    setMessage('');
    setIsTyping(true);

    try {
      const res = await axios.post('http://127.0.0.1:5000/chat', {
        message,
        history: newChatHistory,
        cityName,
      });

      console.log('Response from backend:', res.data);

      setChatHistory([
        ...newChatHistory,
        { role: 'assistant', content: res.data.response },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setChatHistory([
        ...newChatHistory,
        { role: 'assistant', content: 'Error processing your request.' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 py-10"
      style={{
        backgroundImage: `url(${indiaBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
    >
      <h1 className="text-4xl font-bold text-custom-purple mb-8">Trip Guide</h1>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setActiveTab('chat')}
          className={`w-10 h-10 p-2 rounded-full ${
            activeTab === 'chat'
              ? 'bg-custom-purple text-white'
              : 'bg-white text-custom-purple'
          } hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center`}
        >
          <FaPaperPlane size={19} />
        </button>
        <button
          onClick={() => setActiveTab('weather')}
          className={`ml-2 w-10 h-10 p-2 rounded-full ${
            activeTab === 'weather'
              ? 'bg-white text-custom-purple'
              : 'bg-custom-purple text-white'
          } hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center`}
        >
          <FaCloudSun size={23} />
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`ml-2 w-10 h-10 p-2 rounded-full ${
            activeTab === 'news'
              ? 'bg-white text-custom-purple'
              : 'bg-custom-purple text-white'
          } hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center`}
        >
          <FaNewspaper size={23} />
        </button>
      </div>

      {/* Chat, Weather, and News Tabs */}
      <div className="flex flex-col w-full max-w-3xl bg-white bg-opacity-70 text-black rounded-lg shadow-lg overflow-hidden backdrop-blur-lg">
        {activeTab === 'chat' && (
          <>
            <div className="p-2">
              <input
                type="text"
                value={cityName}
                onChange={handleCityChange}
                onKeyDown={handleCitySubmit}
                placeholder="Enter city name and press Enter..."
                className="w-full p-2 mb-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-orange-500 text-black bg-white bg-opacity-75"
              />
            </div>
            {cityImages.length > 0 && (
              <div className="grid grid-cols-4 gap-4 p-4">
                {cityImages.map((image, index) => (
                  <div key={index} className="w-30 h-30">
                    <img
                      src={image}
                      alt={`City view ${index + 1}`}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex-grow h-64 overflow-y-auto p-4">
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${
                    chat.role === 'assistant'
                      ? 'justify-start'
                      : 'justify-end'
                  } mb-2`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      chat.role === 'assistant'
                        ? 'bg-pink-300 text-purple-800'
                        : 'bg-yellow-300 text-black'
                    }`}
                  >
                    {chat.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start mb-2">
                  <div className="max-w-xs px-4 py-2 rounded-lg bg-pink-300 text-purple-800">
                    <span className="flex items-center">
                      <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                      Typing...
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div
              className="flex items-center p-2"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)' }}
            >
              <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                placeholder="Type your message..."
                className="flex-grow p-2 mr-2 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-custom-purple text-black bg-white bg-opacity-75"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 rounded-lg bg-custom-purple text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <FaPaperPlane />
              </button>
            </div>
          </>
        )}
        {activeTab === 'weather' && <Weather />} {/* Render Weather component */}
        {activeTab === 'news' && <News />} {/* Render News component */}
      </div>
    </div>
  );
};

export default Companion;

