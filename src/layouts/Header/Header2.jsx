import { useContext, useState, useEffect, useRef } from 'react';
import './header2.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { userNameContext } from '../../ContextAPI/UserNameContext';
import { NavContext } from '../../ContextAPI/NavBarContext';
import RecordingNavIconsHeader from '../../components/RRWEB/RecordingNavIconsHeader/RecordingNavIconsHeader';
import SignInAsGuestBtn from '../../components/SignInAsGuestbtn/SignInAsGuestBtn';
import { AuthContext } from '../../ContextAPI/AuthUser';
import logoutUser from '../../components/Supabase/supabaseLogout';
import { GifContext } from '../../ContextAPI/GifContext';
import ToggleThemes from '../../components/ToggleThemes/ToggleThemes';
import { X } from 'lucide-react';
import { LoginModalContext } from '../../ContextAPI/LoginModalContext';
import trackEvents from '../../Utils/mixPanelTrackEvents.js'

export const Header2 = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {userName } = useContext(userNameContext);
  const { isUserLogged, AuthUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const {setNav } = useContext(NavContext);
  const location = useLocation();
  const { showGif, setShowGif } = useContext(GifContext);
  const gifTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const currentPath = location.pathname.replace("/", "");
  const isInsideEditor = location.pathname.startsWith('/editor/');

  const navItems = [
    { id: "home", label: "Home", route: '' , eventName:'Home clicked from header'},
    { id: "features", label: "Features", route: 'features' , eventName:'features clicked from header' },
    // { id: "contact", label: "Contact Us", route: 'contact' },
    { id: 'working', label: "How it Works", route: 'working' , eventName:'How it works clicked from header'}
  ];

  const handleGoToHome = () => {
    trackEvents('Logo Clicked',{
      source: 'header',
      location: location.pathname,
    })
    navigate('/');
    setNav(true);
    setShowGif(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDropDown = () => setShowDropDown(prev => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showGif) {
      gifTimeoutRef.current = setTimeout(() => {
        setShowGif(false);
      }, 5000);
    }
    return () => clearTimeout(gifTimeoutRef.current);
  }, [showGif]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    // Optional: Cleanup on unmount
    return () => document.body.classList.remove("no-scroll");
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className='header-main-div'>
          <div className="logo" onClick={handleGoToHome}>
            {showGif ? (
              <img src="/unscreen.gif" alt="Animated" />
            ) : (
              <img src="/unscreen2.png" alt="Static" />
            )}
            Code2gthr
          </div>

          {/* Hamburger icon */}
          <div className="hamburger" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <X size={30} color="var(--logo-color)" />
            ) : (
              <>
                <span />
                <span />
                <span />
              </>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className={`header-nav ${isMobileMenuOpen ? 'open' : ''}`}>
            <ul>
              {navItems.map((item) => (
                <li
                  key={item.id}
                  className={currentPath === item.id ? "active" : "defaultLogo"}
                  onClick={() => {
                    trackEvents(`${item.eventName}`,{
                      source:'header',
                      location:location.pathname
                    })
                    navigate(`/${item.route}`);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </li>
              ))}
              {isUserLogged && (
                <li
                  className={currentPath === "sessions" ? "active" : "defaultLogo"}
                  onClick={() => {
                    trackEvents('Recordings clicked' , {
                      source:'Header',
                      isUserLogged: isUserLogged,
                      location:location.pathname
                    })
                    navigate('/sessions');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sessions
                </li>
              )}
              {isMobileMenuOpen && <li>Start Collaborating</li>}
              {isMobileMenuOpen && !isUserLogged && <li
                onClick={
                  () => {

                    setIsMobileMenuOpen(false);
                    navigate('/signUp');
                  }}
              >Sign In</li>}
              {isUserLogged &&
                isMobileMenuOpen &&
                <>
                  <li>{(AuthUserData?.user_metadata?.name || userName)}</li>
                  <li onClick={()=>{
                    logoutUser();
                    setIsMobileMenuOpen(false);
                  }}>Logout</li>
                </>
              }
            </ul>
            {isMobileMenuOpen && <ToggleThemes />}
          </nav>

          {/* Authenticated User Section */}
          {isUserLogged ? (
            <div className="header-userName-dropDown" ref={dropdownRef}>
              {window.innerWidth > 768 && (
                <p>{(AuthUserData?.user_metadata?.name?.split(' ')[0] || userName)?.toUpperCase()}</p>
              )}
              {
                window.innerWidth > 768 &&
                <img
                  src={AuthUserData?.user_metadata?.avatar_url || AuthUserData?.user_metadata?.picture || "/default-avatar.png"}
                  alt="ImgUser"
                  className="header-user-avatar"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    marginRight: 8,
                    cursor: 'pointer'
                  }}
                  onClick={toggleDropDown}
                />
              }
              {showDropDown && (
                <div className="dropdown">
                  <p onClick={()=>{
                    logoutUser();
                    
                  }}>Logout</p>
                  <ToggleThemes />
                </div>
              )}
            </div>
          ) : (
            <SignInAsGuestBtn />
          )}
        </div>
      </header>
      <div style={{ height: "12vh" }} id='home' />
      {isInsideEditor && isUserLogged && <RecordingNavIconsHeader />}
    </>
  );
};