import React, { createContext, useState, useContext } from 'react';

// Create context for city name
const CityContext = createContext();

// Create context provider
export const CityProvider = ({ children }) => {
    const [cityName, setCityName] = useState('');

    return (
        <CityContext.Provider value={{ cityName, setCityName }}>
            {children}
        </CityContext.Provider>
    );
};

// Custom hook to use city context
export const useCity = () => useContext(CityContext);
