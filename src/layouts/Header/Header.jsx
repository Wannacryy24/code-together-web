import { useContext, useState, useEffect, useRef } from 'react';
import './header.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { userNameContext } from '../../ContextAPI/UserNameContext';
import { NavContext } from '../../ContextAPI/NavBarContext';
import RecordingNavIconsHeader from '../../components/RRWEB/RecordingNavIconsHeader/RecordingNavIconsHeader';
import SignInAsGuestBtn from '../../components/SignInAsGuestbtn/SignInAsGuestBtn';
import { AuthContext } from '../../ContextAPI/AuthUser';
import logoutUser from '../../components/Supabase/supabaseLogout';

export const Header = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const { showModal, setShowModal, userName } = useContext(userNameContext);
  const { isUserLogged, AuthUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { isnav, setNav } = useContext(NavContext);
  const location = useLocation();

  // useEffect(() => {
  //   const isRoomRoute = location.pathname.length > 1; // simple check if not home
  //   setNav(!isRoomRoute);
  // }, [location.pathname, setNav]);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" , id:'features-id-for-scroll'},
    { id: "contact", label: "Contact Us" },
  ];

  const dropdownRef = useRef(null);

  const handleGoToHome = () => {
    navigate('/');
    setNav(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const toggleDropDown = () => setShowDropDown(prev => !prev);

  // const openUserNameModal = () => {
  //   setShowDropDown(false);
  //   setShowModal(true);
  // };

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

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo" onClick={handleGoToHome}>
          <img src="/curly1.jpeg" alt="logo" />
          Code2gthr
        </div>
        
        {isnav ? (
          <nav className="header-nav">
            <ul>
              {navItems.map((item) => (
                <li
                  key={item.id}
                  className={activeLink === item.id ? "active" : ""}
                  onClick={() => {
                    if (location.pathname !== '/') {
                      navigate('/');
                    } else {
                      const el = document.getElementById(item.id);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                    setActiveLink(item.id);
                  }
                  }
                >
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
              {
                isUserLogged && <li
                  className={activeLink === "sessions" ? "active" : ""}
                  id='sessions'
                  onClick={() => {
                    setActiveLink("sessions");
                    navigate('/sessions');
                  }}
                >Sessions</li>
              }
            </ul>
          </nav>
        ) : (
          <RecordingNavIconsHeader />
        )}

        {isUserLogged ? (
          <div className="header-userName-dropDown" ref={dropdownRef}>
            <img
              src={AuthUserData?.user_metadata?.avatar_url || AuthUserData?.user_metadata?.picture || "/default-avatar.png"}
              alt="ImgUSer"
              className="header-user-avatar"
              style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 8 }}
            />
            <p>{AuthUserData?.user_metadata?.name || userName}</p>
            <button onClick={toggleDropDown}>X</button>
            {showDropDown && (
              <div className="dropdown">
                {/* <p onClick={openUserNameModal}>Change User Name</p> */}
                <p
                  onClick={logoutUser}
                >Logout</p>
              </div>
            )}
          </div>
        ) : (
          <SignInAsGuestBtn />
        )}
        {/* {showModal && <UserNameModal />} */}
      </header>
      <div style={{ height: "10vh" }} id='home' />
    </>
  );
};