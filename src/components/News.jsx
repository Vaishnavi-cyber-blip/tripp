
import React, { useState } from 'react';
import axios from 'axios';


const News = () => {
  const [city, setCity] = useState('');
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');

  const getNews = async (city) => {
    try {
      const params = new URLSearchParams({
        api_token: import.meta.env.VITE_APP_NEWS_API_KEY, // Use the environment variable
        locale: 'in',
        language: 'en',
        search: city,
      }).toString();

      const response = await axios.get(`https://api.thenewsapi.com/v1/news/top?${params}`);

      setNews(response.data.data);
      setError('');
    } catch (err) {
      setError('Error fetching news. Please try again.');
      setNews([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      getNews(city);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-custom-image bg-cover bg-center p-4">
      <header className="text-4xl font-bold text-custom-purple mb-8">News Update</header>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md flex items-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-grow shadow appearance-none border rounded-l-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="City name you are travelling to.."
        />
        <button
          type="submit"
          className="bg-custom-purple hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-r-full focus:outline-none focus:shadow-outline"
        >
          SEND
        </button>
      </form>
      <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-lg mt-8">
        {error && <p className="text-red-500">{error}</p>}
        {news.length > 0 && (
          <div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article, index) => (
                <li key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="block hover:shadow-xl transition-shadow duration-300">
                    {article.image_url && (
                      <img src={article.image_url} alt={article.title} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="bg-gray-200 text-gray-800 text-xs font-bold px-2 py-1 rounded-full">Latest</span>
                        <span className="text-gray-500 text-xs">{new Date(article.published_at).toLocaleTimeString()}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h3>
                      <p className="text-gray-600">{article.description}</p>
                      <p className="text-blue-500 font-bold mt-2">Read more</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;


