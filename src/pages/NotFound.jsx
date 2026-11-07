import { Link } from 'react-router-dom';
import { sound } from '../utils/audio';

function NotFound() {
  return (
    <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
      <div 
        className="hud-panel hud-corner-brackets"
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: '50px 30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="telemetry-led pulsing" style={{ background: '#ef4444' }} />
          <span className="font-mono" style={{ color: '#ef4444', letterSpacing: '0.15em', fontSize: '0.85rem' }}>
            CRITICAL TRAJECTORY ANOMALY
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: 'var(--accent-gold)' }}>
          404 // SINGULARITY
        </h1>

        <p className="font-sub" style={{ fontSize: '1.25rem', color: '#ffffff', letterSpacing: '0.08em' }}>
          SIGNAL LOST BEYOND THE EVENT HORIZON
        </p>

        <p style={{ maxWidth: '480px', color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.7 }}>
          The requested celestial vector or mission telemetry does not exist in this sector of spacetime. Gravitational lensing has severed the communication relay.
        </p>

        <div style={{ marginTop: '12px' }}>
          <Link 
            to="/" 
            className="btn btn-primary btn-hud"
            onClick={() => sound.playWarp()}
          >
            <span>RE-ESTABLISH ORBITAL LOCK // RETURN HOME</span>
            <span>⟁</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
