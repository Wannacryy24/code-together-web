import './Homepage2.css';
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { customAlphabet } from "nanoid";
import { AuthContext } from "../../ContextAPI/AuthUser";
import LoginModal from "../../components/LoginModal/LoginModal";
import { LoginModalContext } from '../../ContextAPI/LoginModalContext';
import ButtonGroup from "../../NEWTHEME/ButtonGroup/ButtonGroup";
import { supabase } from '../../components/Supabase/SupabaseClient';
import mixpanel from '../../mixpanel';


const Homepage2 = () => {
  const navigate = useNavigate();
  const { isUserLogged, AuthUserData } = useContext(AuthContext); // ✅ Get user.id here
  const { showLoginModal, setShowLoginModal } = useContext(LoginModalContext);

  const onShareClick = async () => {
    mixpanel.track("Get Started Clicked", {
      source: "Homepage",
      timestamp: new Date().toISOString()
    });

    if (isUserLogged) {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const nanoid = customAlphabet(alphabet, 12);
      const id = nanoid();

      const { data, error } = await supabase.from('session_room').insert([
        {
          room_id: id,
          host_id: AuthUserData.id,
          is_private: false,
        }
      ]);

      if (error) {
        console.error("Error creating room:", error);
        alert("Something went wrong. Please try again.");
        return;
      }

      navigate(`/editor/${id}`, { state: { createdByHost: true } });
    } else {
      navigate('/signUp');
      // Or open modal: setShowLoginModal(true);
    }
  };

  const handleDemo = () => {
    console.log(document.body);
  };

  return (
    <>
      <div className="hero-container" id='headerId-Div'>
        <div className="hero-container-left">
          <h1 className="hero-title">
            Where <span>Interviewers</span> <br />
            and <span>Developers</span><br />
            Meet to <span>Code</span>
            <span>⚡</span>
          </h1>
          <p className="hero-subtext">
            A real-time collaborative code editor built for pair programming, interviews, and remote learning.
            No installs. No sign-ups. Just share a link and start coding.
          </p>
        </div>
        <div className="hero-container-right">
          <video
            className="custom-hero-video video1"
            autoPlay
            muted
            loop
            src="Videos/Modal_CTA.mp4"
          ></video>
        </div>
      </div>
      <ButtonGroup onShareClick={onShareClick} onBookDemo={handleDemo} />
      {showLoginModal && <LoginModal />}
    </>
  );
};

export default Homepage2;
