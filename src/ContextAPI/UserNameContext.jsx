import { createContext, useEffect, useState } from "react";

export const userNameContext = createContext();

const UserNameContextProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [showModal, setShowModal] = useState(false);

  
  useEffect(() => {
    const storedName = localStorage.getItem('user_name');
    if (storedName) {
      setUserName(storedName);
    } else {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <userNameContext.Provider
      value={{ userName, setUserName, showModal, setShowModal }}
    >
      {children}
    </userNameContext.Provider>
  );
};

export default UserNameContextProvider;
