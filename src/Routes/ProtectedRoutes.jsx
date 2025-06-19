// src/routes/ProtectedRoutes.jsx
import { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../ContextAPI/AuthUser';
import trackEvents from '../Utils/mixPanelTrackEvents.js'
export default function ProtectedRoutes({ children }) {
  const { isUserLogged, isAuthLoading } = useContext(AuthContext);
  const location = useLocation();

  useEffect(()=>{
    if(!isAuthLoading && !isUserLogged){
      const fullPath = location.pathname + location.search;
      localStorage.setItem("redirected_Path", fullPath); // ✅ Save intended route

      trackEvents('Redirected to Login', {
        from: fullPath,
        reason: "unauthenticated",
      })
    }
  },[isAuthLoading, isUserLogged, location]);

  if (isAuthLoading) return <div>Loading...</div>;

  if (!isUserLogged) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/signUp?redirect=${redirect}`} state={{from:location}} replace />;
  }

  return children;
}