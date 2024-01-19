import React, { createContext, useState, useContext } from 'react';
const PropertyContext = createContext();
export const PropertyProvider = ({ children }) => {
    const [propertyId, setPropertyId] = useState(null);

    return (
        <PropertyContext.Provider value={{ propertyId, setPropertyId }}>
            {children}
        </PropertyContext.Provider>
    );
};

export const usePropertyContext = () => useContext(PropertyContext);
