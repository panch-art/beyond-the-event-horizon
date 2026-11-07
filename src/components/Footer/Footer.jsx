import { Link } from 'react-router-dom';
import { sound } from '../../utils/audio';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mission-control-footer">
      <div className="container footer-inner">
        {/* Top telemetry grid */}
        <div className="footer-telemetry-grid">
          <div className="footer-col">
            <div className="footer-brand font-heading">
              <span className="footer-bracket">[</span>
              <span>PJ // MISSION CONTROL</span>
              <span className="footer-bracket">]</span>
            </div>
            <p className="footer-desc">
              Venturing beyond the event horizon into distributed software autonomy, clinical artificial intelligence, and quantum computing interfaces.
            </p>
            <div className="footer-status font-mono">
              <span className="telemetry-led pulsing" />
              <span>STATUS: ORBITAL TRAJECTORY NOMINAL</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading font-mono">// NAVIGATION RELAYS</h4>
            <ul className="footer-links font-sub">
              <li>
                <Link to="/" onClick={() => sound.playBeep(1100, 'sine', 0.03)}>01 // HOME</Link>
              </li>
              <li>
                <Link to="/about" onClick={() => sound.playBeep(1100, 'sine', 0.03)}>02 // ABOUT</Link>
              </li>
              <li>
                <Link to="/skills" onClick={() => sound.playBeep(1100, 'sine', 0.03)}>03 // SKILLS</Link>
              </li>
              <li>
                <Link to="/projects" onClick={() => sound.playBeep(1100, 'sine', 0.03)}>04 // PROJECTS</Link>
              </li>
              <li>
                <Link to="/achievements" onClick={() => sound.playBeep(1100, 'sine', 0.03)}>05 // ACHIEVEMENTS</Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => sound.playBeep(1100, 'sine', 0.03)}>06 // CONTACT</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading font-mono">// TELEMETRY PROTOCOL</h4>
            <div className="footer-meta-list font-mono">
              <div className="meta-item">
                <span className="meta-k">STATION:</span>
                <span className="meta-v">INDIA GROUND BASE</span>
              </div>
              <div className="meta-item">
                <span className="meta-k">COORDINATES:</span>
                <span className="meta-v">12.9716° N, 77.5946° E</span>
              </div>
              <div className="meta-item">
                <span className="meta-k">FREQ:</span>
                <span className="meta-v">1420.405 MHz</span>
              </div>
              <div className="meta-item">
                <span className="meta-k">SECURITY:</span>
                <span className="meta-v text-cyan">LEVEL 5 CLEARED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="footer-bottom-bar font-mono">
          <p>
            &copy; {year} PANCHAMI J. DEEP SPACE EXPLORATION & REACT ARCHITECTURES.
          </p>
          <p className="footer-motto">
            "BEYOND THE EVENT HORIZON"
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
