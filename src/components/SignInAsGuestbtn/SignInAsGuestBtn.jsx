import { useContext } from "react";
import { AuthContext } from "../../ContextAPI/AuthUser";
import LoginModal from "../LoginModal/LoginModal";
import { LoginModalContext } from "../../ContextAPI/LoginModalContext";
import { useLocation, useNavigate } from "react-router-dom";
import trackEvents from "../../Utils/mixPanelTrackEvents";

export default function SignInAsGuestBtn() {
  const { showLoginModal, setShowLoginModal } = useContext(LoginModalContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    isAuthPage,
    isUserLogged,
    AuthUserData,
    isAuthLoading
  } = useContext(AuthContext);

  const handleAuthPage = () => {
    trackEvents('Sign Up btn',{
      location: location.pathname    
    });
    navigate('/signUp')
  };

  if (showLoginModal) return <LoginModal />;
  
  if (isAuthLoading) {
    return null; 
  }

  // 📍 Show login modal if auth page is triggered
  if (isAuthPage) return <LoginModal />;

  // ✅ Show avatar if logged in
  if (isUserLogged && AuthUserData) {
    return (
      <img
        src={AuthUserData.user_metadata?.avatar_url}
        alt={AuthUserData.email}
        className="user-avatar"
        style={{
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          objectFit: "cover"
        }}
      />
    );
  }

  // 👤 Default: show guest login button
  return (
    <button className="guest-signin" onClick={handleAuthPage}>
      <img src="/signinHeader.png" alt="" />
      Sign In as Guest
    </button>
  );
}
