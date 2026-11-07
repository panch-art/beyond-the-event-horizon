import { Link } from 'react-router-dom';
import { sound } from '../../utils/audio';
import './AboutSection.css';

function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="nebula-ambient-glow" aria-hidden="true" />

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-kicker">
            <span>NASA PERSONNEL DOSSIER</span>
          </div>
          <h2 className="section-title">MISSION SPECIALIST</h2>
          <p className="section-subtitle">
            Holographic telemetry and flight qualifications of Navigator Panchami J.
          </p>
          <div className="section-divider">
            <span className="line" />
            <span className="diamond" />
            <span className="line right" />
          </div>
        </div>

        {/* Main Holographic Grid */}
        <div className="about-holo-grid">
          {/* Column 1: Specialist Scanning Badge */}
          <div className="holo-avatar-deck">
            <div className="holo-ring-container">
              <div className="scanner-sweep" />
              <div className="orbital-hud-ring outer" />
              <div className="orbital-hud-ring middle" />
              <div className="avatar-frame">
                <img 
                  src="/profile.jpeg" 
                  alt="Mission Specialist Panchami J" 
                  className="specialist-avatar"
                  onError={(e) => {
                    // Fallback avatar icon if profile image is not found
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextSibling) {
                      e.currentTarget.nextSibling.style.display = 'flex';
                    }
                  }}
                />
                <div className="avatar-fallback" style={{ display: 'none' }}>
                  <span>PJ</span>
                </div>
              </div>
              <div className="radar-blip" />
            </div>

            <div className="specialist-tag-card hud-panel hud-corner-brackets">
              <div className="card-status-bar">
                <span className="telemetry-led pulsing" />
                <span className="font-mono text-cyan">CLEARANCE: LEVEL 5</span>
              </div>
              <h3 className="specialist-name">PANCHAMI J</h3>
              <p className="specialist-role font-mono">PILOT // AUTONOMOUS SYSTEMS & AI</p>
              <div className="specialist-coord font-mono">
                <span>STATION: 12.9716° N, 77.5946° E</span>
              </div>
            </div>
          </div>

          {/* Column 2: Holographic Data Panels */}
          <div className="holo-dossier-panels">
            {/* Panel 1: Mission Log */}
            <div className="hud-panel hud-corner-brackets holo-panel">
              <div className="panel-header">
                <span className="panel-code font-mono">[LOG-01] // MISSION DIRECTIVE</span>
                <span className="panel-badge font-mono">DECLASSIFIED</span>
              </div>
              <h3 className="panel-title">Venturing Beyond Established Limits</h3>
              <p className="panel-text">
                I am Panchami J, an engineering specialist building high-reliability software architectures, predictive machine learning diagnostics, and autonomous physical robotic explorers.
              </p>
              <p className="panel-text">
                From authoring embedded C++ navigation algorithms for collision-avoiding rovers to training predictive ML pipelines for clinical sepsis detection, my mission is to synthesize elegant code with rigorous computational stability.
              </p>
            </div>

            {/* Panel 2: Flight Capabilities Grid */}
            <div className="hud-panel hud-corner-brackets holo-panel">
              <div className="panel-header">
                <span className="panel-code font-mono">[SYS-02] // SYSTEM TELEMETRY</span>
                <span className="panel-badge font-mono">ONLINE</span>
              </div>
              <div className="specs-grid">
                <div className="spec-card">
                  <span className="spec-label font-mono">CORE PROPULSION</span>
                  <span className="spec-value">Python & Java Architecture</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label font-mono">AUTONOMOUS SENSORS</span>
                  <span className="spec-value">Arduino, PWM, Sonar Arrays</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label font-mono">AI / PREDICTIVE</span>
                  <span className="spec-value">Machine Learning & Analytics</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label font-mono">HOLOGRAPHIC UI</span>
                  <span className="spec-value">React, Web Audio & Canvas</span>
                </div>
              </div>
            </div>

            {/* Navigation Telemetry Actions */}
            <div className="holo-actions">
              <Link
                to="/skills"
                className="btn btn-primary btn-hud"
                onClick={() => sound.playBeep(1100, 'sine', 0.04)}
              >
                <span>Quantum Skills Nodes</span>
                <span className="arrow">❯</span>
              </Link>

              <Link
                to="/achievements"
                className="btn btn-secondary btn-hud"
                onClick={() => sound.playBeep(950, 'sine', 0.04)}
              >
                <span>Orbital Timeline</span>
                <span className="arrow">❯</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
