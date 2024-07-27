// import React, { useState } from 'react';
// import axios from 'axios';

// const Weather = () => {
//   const [city, setCity] = useState('');
//   const [days, setDays] = useState(1);
//   const [date, setDate] = useState('');
//   const [weatherData, setWeatherData] = useState(null);
//   const [astroData, setAstroData] = useState(null);
//   const [error, setError] = useState('');
//   const [weatherType, setWeatherType] = useState('Current');

//   const weather_api_key = import.meta.env.VITE_APP_WEATHER_API_KEY;

//   const fetchWeather = async () => {
//     try {
//       let response;
//       switch (weatherType) {
//         case 'Current':
//           response = await axios.get('https://api.weatherapi.com/v1/current.json', {
//             params: { key: weather_api_key, q: city },
//           });
//           setWeatherData(response.data);
//           setAstroData(null);
//           break;
//         case 'Days':
//           response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
//             params: { key: weather_api_key, q: city, days: days },
//           });
//           setWeatherData(response.data);
//           setAstroData(null);
//           break;
//         case 'Astro':
//           response = await axios.get('https://api.weatherapi.com/v1/astronomy.json', {
//             params: { key: weather_api_key, q: city, dt: date },
//           });
//           setAstroData(response.data);
//           setWeatherData(null);
//           break;
//         case 'Date':
//           response = await axios.get('https://api.weatherapi.com/v1/future.json', {
//             params: { key: weather_api_key, q: city, dt: date },
//           });
//           setWeatherData(response.data);
//           setAstroData(null);
//           break;
//         default:
//           break;
//       }
//       setError('');
//     } catch (err) {
//       setError('Error fetching weather data. Please try again.');
//       setWeatherData(null);
//       setAstroData(null);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (city && weatherType) {
//       fetchWeather();
//     }
//   };

//   const renderWeatherData = () => {
//     if (weatherData) {
//       if (weatherType === 'Current') {
//         return (
//           <div className="card">
//             <h3>Current Weather in {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}</h3>
//             <p>Temperature: {weatherData.current.temp_c}°C ({weatherData.current.temp_f}°F)</p>
//             <p>Condition: {weatherData.current.condition.text}</p>
//             <p>Wind: {weatherData.current.wind_kph} kph ({weatherData.current.wind_mph} mph), Direction: {weatherData.current.wind_dir}</p>
//             <p>Humidity: {weatherData.current.humidity}%</p>
//           </div>
//         );
//       } else if (weatherType === 'Days') {
//         return (
//           <div className="card">
//             <h3>Forecast for {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}:</h3>
//             {weatherData.forecast.forecastday.map((day, index) => (
//               <div key={index} className="forecast-card">
//                 <p>Date: {day.date}</p>
//                 <p>Condition: {day.day.condition.text}</p>
//                 <p>Max Temperature: {day.day.maxtemp_c}°C ({day.day.maxtemp_f}°F)</p>
//                 <p>Min Temperature: {day.day.mintemp_c}°C ({day.day.mintemp_f}°F)</p>
//                 <p>Average Temperature: {day.day.avgtemp_c}°C ({day.day.avgtemp_f}°F)</p>
//               </div>
//             ))}
//           </div>
//         );
//       } else if (weatherType === 'Date') {
//         return (
//           <div className="card">
//             <h3>Forecast for {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country} on {weatherData.forecast.forecastday[0].date}:</h3>
//             <p>Condition: {weatherData.forecast.forecastday[0].day.condition.text}</p>
//             <p>Max Temperature: {weatherData.forecast.forecastday[0].day.maxtemp_c}°C ({weatherData.forecast.forecastday[0].day.maxtemp_f}°F)</p>
//             <p>Min Temperature: {weatherData.forecast.forecastday[0].day.mintemp_c}°C ({weatherData.forecast.forecastday[0].day.mintemp_f}°F)</p>
//             <p>Average Temperature: {weatherData.forecast.forecastday[0].day.avgtemp_c}°C ({weatherData.forecast.forecastday[0].day.avgtemp_f}°F)</p>
//           </div>
//         );
//       }
//     }
//     if (astroData) {
//       return (
//         <div className="card">
//           <h3>Astronomy Data:</h3>
//           <p>Sunrise: {astroData.astronomy.astro.sunrise}</p>
//           <p>Sunset: {astroData.astronomy.astro.sunset}</p>
//           <p>Moonrise: {astroData.astronomy.astro.moonrise}</p>
//           <p>Moonset: {astroData.astronomy.astro.moonset}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-green-500 p-4">
//       <header className="text-4xl font-bold text-white mb-8">Weather Updates</header>
//       <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">City name you are travelling to..</label>
//           <input
//             type="text"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="City Name"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">You want update about..</label>
//           <select
//             value={weatherType}
//             onChange={(e) => setWeatherType(e.target.value)}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           >
//             <option value="Current">Current</option>
//             <option value="Days">Days</option>
//             <option value="Astro">Astro</option>
//             <option value="Date">Date</option>
//           </select>
//         </div>
//         {weatherType === 'Days' && (
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Number of Days:</label>
//             <input
//               type="number"
//               value={days}
//               onChange={(e) => setDays(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               min="1"
//               max="10"
//             />
//           </div>
//         )}
//         {(weatherType === 'Astro' || weatherType === 'Date') && (
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//         )}
//         <button
//           type="submit"
//           className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Send
//         </button>
//       </form>
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mt-8">
//         {error && <p className="text-red-500">{error}</p>}
//         {renderWeatherData()}
//       </div>
//     </div>
//   );
// };

// export default Weather;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { FaChevronDown } from 'react-icons/fa'; // Import a dropdown icon

// // Update this path
// const backgroundImage = '/assets/wall6.png';

// const Weather = () => {
//   const [city, setCity] = useState('');
//   const [days, setDays] = useState(1);
//   const [date, setDate] = useState('');
//   const [weatherData, setWeatherData] = useState(null);
//   const [astroData, setAstroData] = useState(null);
//   const [error, setError] = useState('');
//   const [weatherType, setWeatherType] = useState('Current');

//   const api_key = import.meta.env.VITE_APP_WEATHER_API_KEY;

//   const fetchWeather = async () => {
//     try {
//       let response;
//       switch (weatherType) {
//         case 'Current':
//           response = await axios.get('https://api.weatherapi.com/v1/current.json', {
//             params: { key: api_key, q: city },
//           });
//           setWeatherData(response.data);
//           setAstroData(null);
//           break;
//         case 'Days':
//           response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
//             params: { key: api_key, q: city, days: days },
//           });
//           setWeatherData(response.data);
//           setAstroData(null);
//           break;
//         case 'Astro':
//           response = await axios.get('https://api.weatherapi.com/v1/astronomy.json', {
//             params: { key: api_key, q: city, dt: date },
//           });
//           setAstroData(response.data);
//           setWeatherData(null);
//           break;
//         case 'Date':
//           response = await axios.get('https://api.weatherapi.com/v1/future.json', {
//             params: { key: api_key, q: city, dt: date },
//           });
//           setWeatherData(response.data);
//           setAstroData(null);
//           break;
//         default:
//           break;
//       }
//       setError('');
//     } catch (err) {
//       setError('Error fetching weather data. Please try again.');
//       setWeatherData(null);
//       setAstroData(null);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (city && weatherType) {
//       fetchWeather();
//     }
//   };

//   const renderWeatherData = () => {
//     if (weatherData) {
//       if (weatherType === 'Current') {
//         return (
//           <div className="card">
//             <h3>
//               Current Weather in {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}
//             </h3>
//             <p>
//               Temperature: {weatherData.current.temp_c}°C ({weatherData.current.temp_f}°F)
//             </p>
//             <p>Condition: {weatherData.current.condition.text}</p>
//             <p>
//               Wind: {weatherData.current.wind_kph} kph ({weatherData.current.wind_mph} mph), Direction: {weatherData.current.wind_dir}
//             </p>
//             <p>Humidity: {weatherData.current.humidity}%</p>
//           </div>
//         );
//       } else if (weatherType === 'Days') {
//         return (
//           <div className="card">
//             <h3>
//               Forecast for {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}:
//             </h3>
//             {weatherData.forecast.forecastday.map((day, index) => (
//               <div key={index} className="forecast-card">
//                 <p>Date: {day.date}</p>
//                 <p>Condition: {day.day.condition.text}</p>
//                 <p>
//                   Max Temperature: {day.day.maxtemp_c}°C ({day.day.maxtemp_f}°F)
//                 </p>
//                 <p>
//                   Min Temperature: {day.day.mintemp_c}°C ({day.day.mintemp_f}°F)
//                 </p>
//                 <p>
//                   Average Temperature: {day.day.avgtemp_c}°C ({day.day.avgtemp_f}°F)
//                 </p>
//               </div>
//             ))}
//           </div>
//         );
//       } else if (weatherType === 'Date') {
//         return (
//           <div className="card">
//             <h3>
//               Forecast for {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country} on{' '}
//               {weatherData.forecast.forecastday[0].date}:
//             </h3>
//             <p>Condition: {weatherData.forecast.forecastday[0].day.condition.text}</p>
//             <p>
//               Max Temperature: {weatherData.forecast.forecastday[0].day.maxtemp_c}°C ({weatherData.forecast.forecastday[0].day.maxtemp_f}°F)
//             </p>
//             <p>
//               Min Temperature: {weatherData.forecast.forecastday[0].day.mintemp_c}°C ({weatherData.forecast.forecastday[0].day.mintemp_f}°F)
//             </p>
//             <p>
//               Average Temperature: {weatherData.forecast.forecastday[0].day.avgtemp_c}°C (
//               {weatherData.forecast.forecastday[0].day.avgtemp_f}°F)
//             </p>
//           </div>
//         );
//       }
//     }
//     if (astroData) {
//       return (
//         <div className="card">
//           <h3>Astronomy Data:</h3>
//           <p>Sunrise: {astroData.astronomy.astro.sunrise}</p>
//           <p>Sunset: {astroData.astronomy.astro.sunset}</p>
//           <p>Moonrise: {astroData.astronomy.astro.moonrise}</p>
//           <p>Moonset: {astroData.astronomy.astro.moonset}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div
//       className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       <header className="text-4xl font-bold text-custom-purple mb-8">Weather</header>
//       <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         <div className="mb-4">
//           <label className="block text-custom-purple text-sm font-bold mb-2">City name you are traveling to :</label>
//           <input
//             type="text"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             className="shadow appearance-none border border border-gray-300 hover:border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="City Name"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-custom-purple text-sm font-bold mb-2">You want an update on : </label>
//           <div className="relative">
//             <select
//               value={weatherType}
//               onChange={(e) => setWeatherType(e.target.value)}
//               className="block w-full appearance-none bg-white border border-gray-300 hover:border-blue-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition duration-300 ease-in-out text-gray-700"
//             >
//               <option value="Current">Current Weather</option>
//               <option value="Days">Days</option>
//               <option value="Astro">Astro</option>
//               <option value="Date">On Date</option>
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
//               <FaChevronDown />
//             </div>
//           </div>
//         </div>
//         {weatherType === 'Days' && (
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Number of Days:</label>
//             <input
//               type="number"
//               value={days}
//               onChange={(e) => setDays(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               min="1"
//               max="10"
//             />
//           </div>
//         )}
//         {(weatherType === 'Astro' || weatherType === 'Date') && (
//           <div className="mb-4">
//             <label className="block text-custom-purple text-sm font-bold mb-2">Date:</label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//         )}
//         <button
//           type="submit"
//           className="bg-custom-purple hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Updates
//         </button>
//       </form>
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mt-8">
//         {error && <p className="text-red-500">{error}</p>}
//         {renderWeatherData()}
//       </div>
//     </div>
//   );
// };

// export default Weather;

import React, { useState } from 'react';
import axios from 'axios';
import { FaChevronDown } from 'react-icons/fa'; // Import a dropdown icon

// Update this path
const backgroundImage = '/assets/wall6.png';

const Weather = () => {
  const [city, setCity] = useState('');
  const [days, setDays] = useState(1);
  const [date, setDate] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [astroData, setAstroData] = useState(null);
  const [error, setError] = useState('');
  const [weatherType, setWeatherType] = useState('Current');

  const api_key = import.meta.env.VITE_APP_WEATHER_API_KEY;

  const fetchWeather = async () => {
    try {
      let response;
      switch (weatherType) {
        case 'Current':
          response = await axios.get('https://api.weatherapi.com/v1/current.json', {
            params: { key: api_key, q: city },
          });
          setWeatherData(response.data);
          setAstroData(null);
          break;
        case 'Days':
          response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
            params: { key: api_key, q: city, days: days },
          });
          setWeatherData(response.data);
          setAstroData(null);
          break;
        case 'Astro':
          response = await axios.get('https://api.weatherapi.com/v1/astronomy.json', {
            params: { key: api_key, q: city, dt: date },
          });
          setAstroData(response.data);
          setWeatherData(null);
          break;
        case 'Date':
          response = await axios.get('https://api.weatherapi.com/v1/future.json', {
            params: { key: api_key, q: city, dt: date },
          });
          setWeatherData(response.data);
          setAstroData(null);
          break;
        default:
          break;
      }
      setError('');
    } catch (err) {
      setError('Error fetching weather data. Please try again.');
      setWeatherData(null);
      setAstroData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city && weatherType) {
      fetchWeather();
    }
  };

  const renderWeatherData = () => {
    if (weatherData) {
      if (weatherType === 'Current') {
        return (
          <div className="card">
            <h3>
              Current Weather in {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}
            </h3>
            <p>
              Temperature: {weatherData.current.temp_c}°C ({weatherData.current.temp_f}°F)
            </p>
            <p>Condition: {weatherData.current.condition.text}</p>
            <p>
              Wind: {weatherData.current.wind_kph} kph ({weatherData.current.wind_mph} mph), Direction: {weatherData.current.wind_dir}
            </p>
            <p>Humidity: {weatherData.current.humidity}%</p>
          </div>
        );
      } else if (weatherType === 'Days') {
        return (
          <div className="card">
            <h3>
              Forecast for {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}:
            </h3>
            {weatherData.forecast.forecastday.map((day, index) => (
              <div key={index} className="forecast-card">
                <p>Date: {day.date}</p>
                <p>Condition: {day.day.condition.text}</p>
                <p>
                  Max Temperature: {day.day.maxtemp_c}°C ({day.day.maxtemp_f}°F)
                </p>
                <p>
                  Min Temperature: {day.day.mintemp_c}°C ({day.day.mintemp_f}°F)
                </p>
                <p>
                  Average Temperature: {day.day.avgtemp_c}°C ({day.day.avgtemp_f}°F)
                </p>
              </div>
            ))}
          </div>
        );
      } else if (weatherType === 'Date') {
        return (
          <div className="card">
            <h3>
              Forecast for {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country} on{' '}
              {weatherData.forecast.forecastday[0].date}:
            </h3>
            <p>Condition: {weatherData.forecast.forecastday[0].day.condition.text}</p>
            <p>
              Max Temperature: {weatherData.forecast.forecastday[0].day.maxtemp_c}°C ({weatherData.forecast.forecastday[0].day.maxtemp_f}°F)
            </p>
            <p>
              Min Temperature: {weatherData.forecast.forecastday[0].day.mintemp_c}°C ({weatherData.forecast.forecastday[0].day.mintemp_f}°F)
            </p>
            <p>
              Average Temperature: {weatherData.forecast.forecastday[0].day.avgtemp_c}°C (
              {weatherData.forecast.forecastday[0].day.avgtemp_f}°F)
            </p>
          </div>
        );
      }
    }
    if (astroData) {
      return (
        <div className="card">
          <h3>Astronomy Data:</h3>
          <p>Sunrise: {astroData.astronomy.astro.sunrise}</p>
          <p>Sunset: {astroData.astronomy.astro.sunset}</p>
          <p>Moonrise: {astroData.astronomy.astro.moonrise}</p>
          <p>Moonset: {astroData.astronomy.astro.moonset}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <header className="text-4xl font-bold text-custom-purple mb-8">Weather</header>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-custom-purple text-sm font-bold mb-2">City name you are traveling to :</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="shadow appearance-none border border border-gray-300 hover:border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="City Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-custom-purple text-sm font-bold mb-2">You want an update on : </label>
          <div className="relative">
            <select
              value={weatherType}
              onChange={(e) => setWeatherType(e.target.value)}
              className="block w-full appearance-none bg-white border border-gray-300 hover:border-blue-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition duration-300 ease-in-out text-gray-700"
            >
              <option value="Current">Current Weather</option>
              <option value="Days">Days</option>
              <option value="Astro">Astro</option>
              <option value="Date">On Date</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
              <FaChevronDown />
            </div>
          </div>
        </div>
        {weatherType === 'Days' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Number of Days:</label>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="1"
              max="10"
            />
          </div>
        )}
        {(weatherType === 'Astro' || weatherType === 'Date') && (
          <div className="mb-4">
            <label className="block text-custom-purple text-sm font-bold mb-2">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-custom-purple hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Updates
        </button>
      </form>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mt-8">
        {error && <p className="text-red-500">{error}</p>}
        {renderWeatherData()}
      </div>
    </div>
  );
};

export default Weather;
