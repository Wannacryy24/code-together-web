// src/ContextAPI/LoginModalContext.js
import { createContext, useState } from "react";

export const LoginModalContext = createContext();

export const LoginModalProvider = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  return (
    <LoginModalContext.Provider value={{ showLoginModal, setShowLoginModal }}>
      {children}
    </LoginModalContext.Provider>
  );
};
