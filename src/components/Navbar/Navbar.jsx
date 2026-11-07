import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { sound } from '../../utils/audio';
import './Navbar.css';

function Navbar({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    sound.playBeep(980, 'sine', 0.04);
  };

  const handleHover = () => {
    sound.playBeep(1400, 'sine', 0.02);
  };

  const navItems = [
    { path: '/', label: 'HOME', code: '01' },
    { path: '/about', label: 'ABOUT', code: '02' },
    { path: '/skills', label: 'SKILLS', code: '03' },
    { path: '/projects', label: 'PROJECTS', code: '04' },
    { path: '/achievements', label: 'ACHIEVEMENTS', code: '05' },
    { path: '/contact', label: 'CONTACT', code: '06' },
  ];

  return (
    <header className="site-header">
      <nav className="navbar container">
        <Link 
          to="/" 
          className="brand-logo" 
          onClick={handleLinkClick}
          onMouseEnter={handleHover}
        >
          <div className="logo-symbol">
            <span className="logo-beacon" />
            <span className="logo-bracket">[</span>
            <span className="logo-core">PJ</span>
            <span className="logo-bracket">]</span>
          </div>
          <div className="logo-meta">
            <span className="logo-title">PANCHAMI</span>
            <span className="logo-sub">MISSION CONTROL</span>
          </div>
        </Link>

        {/* Desktop & Mobile Navigation Links */}
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-hud-header">
            <span>// NAVIGATION RELAY</span>
            <button 
              className="close-menu-btn"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              ✕
            </button>
          </div>

          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <NavLink
                to={item.path}
                onClick={handleLinkClick}
                onMouseEnter={handleHover}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                <span className="nav-code">{item.code} //</span>
                <span className="nav-text">{item.label}</span>
                <span className="nav-indicator" />
              </NavLink>
            </li>
          ))}

          <li className="mobile-hud-footer">
            <div className="mobile-telemetry">
              <span>COORD: 28.5721° N, 80.6480° W</span>
              <span>ORBIT: DEEP SPACE 07</span>
            </div>
          </li>
        </ul>

        {/* Right HUD Controls */}
        <div className="navbar-controls">
          <button
            className="hud-toggle-btn"
            onClick={() => {
              toggleTheme();
              sound.playWarp();
            }}
            title="Toggle Quantum HUD Mode"
            aria-label="Toggle Quantum HUD Mode"
          >
            <span className="toggle-icon">⬡</span>
            <span className="toggle-label">{theme === 'quantum' ? 'QUANTUM' : 'DEEP SPACE'}</span>
          </button>

          <button
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              sound.playBeep(880, 'sine', 0.05);
            }}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
