import { createContext, useEffect, useState } from "react";
import { supabase } from "../components/Supabase/SupabaseClient";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [AuthUserData, setAuthUserData] = useState(null);
  const [isAuthPage, setShowisAuthPage] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true); // 🟢 NEW
  
  useEffect(() => {
    // Initial session load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        console.log("Initial session user:", session.user);
        setAuthUserData(session.user);
        setIsUserLogged(true);
        setShowisAuthPage(false);
      }
      setIsAuthLoading(false); // ✅ Mark as done (after session check)
    });

    // Auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth event:", event, session);
        if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
          if (session?.user) {
            setAuthUserData(session.user);
            setIsUserLogged(true);
            setShowisAuthPage(false);
            setJustLoggedIn(true);
          }
        } else if (event === "SIGNED_OUT") {
          setAuthUserData(null);
          setIsUserLogged(false);
        }
        setIsAuthLoading(false); // ✅ Done loading even if no user
      }
    );

    return () => {
      subscription.subscription?.unsubscribe?.();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthPage,
        setShowisAuthPage,
        AuthUserData,
        setAuthUserData,
        isUserLogged,
        setIsUserLogged,
        justLoggedIn,
        setJustLoggedIn,
        isAuthLoading, // ✅ Export it
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
