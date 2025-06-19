import Lottie from 'lottie-react';
import './Footer.css';
import { FaTwitter, FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';
import animationData from '../../assets/LotteJson/Animation - 1750005972682.json'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-column intro">
          <h3>Code Collaboration</h3>
          <p>Powering rooms for interviews, pair programming, and more.</p>
          <div
            style={{
              display:'flex',
              height:'100%',
              justifyContent:'space-evenly',
              alignItems:'center'
            }}
          >
            <div>
              <button className="footer-btn">Start a Session →</button>
              <button className="footer-btn dark">Stars on GitHub →</button>
            </div>
            <div
              style={{
                height: '150px',
                width: '150px'
              }}
            >
              <Lottie animationData={animationData} />
            </div>
          </div>
        </div>

        <div className='footer-right-div'>
          <div className="footer-column">
            <h4>Developers</h4>
            <ul>
              <li>Quickstart</li>
              <li>API Reference</li>
              <li>SDK Setup (Monaco, Socket.io)</li>
              <li>Custom Themes Guide</li>
              <li>Cursor & Selection Sharing</li>
              <li>Changelog</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Features</h4>
            <ul>
              <li>Collaborative Code Editor</li>
              <li>Real-time Cursor Sync</li>
              <li>Remote Interviews</li>
              <li>Voice Room Integration</li>
              <li>Anonymous Guest Mode</li>
              <li>Code Playback (Coming Soon)</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Product</h4>
            <ul>
              <li>For Interviewers</li>
              <li>For Developers</li>
              <li>For Bootcamps</li>
              <li>For Teams</li>
              <li>For Hackathons</li>
              <li>Pricing</li>
            </ul>
          </div>

          {/* <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Blog</li>
            </ul>
          </div> */}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-brand">© Code2gthr 2025</div>
        <div className="footer-links">Terms of Service</div>
        <div className="footer-icons">
          <FaTwitter className="icon" />
          <FaGithub className="icon" />
          <FaLinkedin className="icon" />
          <FaDiscord className="icon" />
        </div>

      </div>
    </footer>
  );
};

export default Footer;