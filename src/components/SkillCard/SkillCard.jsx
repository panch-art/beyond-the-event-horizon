import { sound } from '../../utils/audio';
import './SkillCard.css';

const SKILL_ICONS = {
  python: '🐍',
  java: '☕',
  html: '🌐',
  css: '🎨',
  js: '⚡',
  react: '⚛',
  git: '🌿',
  github: '🐙',
  code: '💻',
  streamlit: '📊'
};

function SkillCard({ name, level, icon, category, description }) {
  // Ensure percentage calculation handles both numbers and strings safely
  const pct = typeof level === 'number' ? level : 80;

  const handleHover = () => {
    sound.playBeep(800 + pct * 6, 'sine', 0.03);
  };

  return (
    <div 
      className="quantum-skill-card hud-panel hud-corner-brackets"
      onMouseEnter={handleHover}
    >
      {/* Constellation Node Beacon */}
      <div className="quantum-node-beacon" aria-hidden="true">
        <span className="beacon-core" />
        <span className="beacon-radar" />
      </div>

      {/* Top Header */}
      <div className="quantum-card-header">
        <div className="quantum-icon-wrapper">
          <span className="quantum-ring" />
          <span className="skill-glyph">{SKILL_ICONS[icon] || '⬡'}</span>
        </div>

        <div className="quantum-meta">
          <span className="skill-category font-mono">{category || 'QUANTUM CORE'}</span>
          <h4 className="skill-title">{name}</h4>
        </div>

        <div className="resonance-badge font-mono">
          <span className="resonance-num">{pct}%</span>
        </div>
      </div>

      {description && (
        <p className="skill-description">{description}</p>
      )}

      {/* Quantum Resonance Fuel / Telemetry Gauge */}
      <div className="quantum-gauge-section">
        <div className="gauge-label-bar font-mono">
          <span>COHERENCE LEVEL</span>
          <span className="text-cyan">{pct >= 85 ? 'OPTIMAL' : pct >= 60 ? 'STABLE' : 'INTEGRATING'}</span>
        </div>

        <div className="quantum-bar-track">
          <div 
            className="quantum-bar-fill" 
            style={{ width: `${pct}%` }}
          >
            <span className="bar-particle-head" />
          </div>
          {/* Gauge tick marks */}
          <div className="gauge-ticks">
            <span className="tick" style={{ left: '25%' }} />
            <span className="tick" style={{ left: '50%' }} />
            <span className="tick" style={{ left: '75%' }} />
          </div>
        </div>
      </div>

      <div className="card-footer-telemetry font-mono">
        <span>STATUS: ACTIVE_NODE</span>
        <span className="node-id">ID: {name.toUpperCase().slice(0, 3)}-{pct}</span>
      </div>
    </div>
  );
}

export default SkillCard;
