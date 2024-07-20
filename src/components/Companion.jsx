import React, { useState } from 'react';
import axios from 'axios';
import { useCity } from './CityContext.jsx'; // Ensure this path is correct

const Companion = () => {
    const { cityName } = useCity(); // Access cityName from context
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [response, setResponse] = useState('');

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (!message.trim()) return; // Avoid sending empty messages

        try {
            const res = await axios.post('https://companion-u6wy.onrender.com/chat', {
                message,
                history: chatHistory,
                cityName
            });
    
            // Update chat history and clear the response field
            setChatHistory(res.data.history);
            setMessage('');
            setResponse(res.data.response);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 min-h-screen flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-4xl font-bold mb-4">Chat with Travel India Assistant</h1>
            <div className="bg-white text-black rounded-lg shadow-lg p-6 w-full max-w-3xl mb-4 overflow-y-auto h-64">
                {chatHistory.map((chat, index) => (
                    <div key={index} className="mb-2">
                        <strong className={chat.role === 'assistant' ? 'text-blue-500' : 'text-green-500'}>{chat.role}:</strong> {chat.content}
                    </div>
                ))}
            </div>
            <div className="flex w-full max-w-3xl mb-4">
                <input
                    type="text"
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Type your message..."
                    className="flex-grow p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Send
                </button>
            </div>
            {response && (
                <div className="bg-white text-black rounded-lg shadow-lg p-6 w-full max-w-3xl">
                    <strong>Assistant:</strong> {response}
                </div>
            )}
        </div>
    );
};

export default Companion;