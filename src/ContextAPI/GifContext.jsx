import { createContext, useState } from "react";

export const GifContext = createContext();

export const GifContextProvider = ({ children }) => {
    const [showGif, setShowGif] = useState(true);

    return (
        <GifContext.Provider 
            value={
                { 
                    showGif, setShowGif
                }}>
            {children}
        </GifContext.Provider>
    );
};
