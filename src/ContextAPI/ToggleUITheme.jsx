import { createContext, useEffect, useState } from "react";

export const ToggleUiThemeContext = createContext();

export const ToggleUiThemeProvider = ({ children }) => {

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        console.log(savedTheme);
        if (savedTheme && savedTheme !== 'default') {
            setActiveTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            setActiveTheme('default');
            document.documentElement.removeAttribute('data-theme');
        }
    }, []);

    const themes = ['default', 'cyberpunk', 'forest', 'solar-light', 'lavender', 'contrast-dark'];

    const [activeTheme, setActiveTheme] = useState('default');
    return (
        <ToggleUiThemeContext.Provider
            value={
                {
                    activeTheme, setActiveTheme,
                    themes,
                }}>
            {children}
        </ToggleUiThemeContext.Provider>
    );
};