import { useState, useEffect } from 'react';
import { sound } from '../../utils/audio';
import './TelemetryBar.css';

function TelemetryBar() {
  const [utcTime, setUtcTime] = useState('');
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toISOString().slice(11, 19) + ' UTC';
      setUtcTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAudioToggle = () => {
    sound.toggleAmbient((isPlaying) => {
      setAudioActive(isPlaying);
    });
    sound.playBeep(920, 'sine', 0.05);
  };

  return (
    <div className="telemetry-bar" role="region" aria-label="NASA Mission Control Telemetry">
      <div className="telemetry-inner container">
        <div className="telemetry-item">
          <span className="telemetry-led pulsing" />
          <span className="telemetry-label">SYS_STATUS:</span>
          <span className="telemetry-value active">NOMINAL // EVENT HORIZON LOCKED</span>
        </div>

        <div className="telemetry-item desktop-only">
          <span className="telemetry-label">MISSION ID:</span>
          <span className="telemetry-value">PJ-HORIZON-2026</span>
        </div>

        <div className="telemetry-item desktop-only">
          <span className="telemetry-label">HYDROGEN FREQ:</span>
          <span className="telemetry-value">1420.405 MHz</span>
        </div>

        <div className="telemetry-actions">
          <div className="telemetry-item">
            <span className="telemetry-label">MISSION TIME:</span>
            <span className="telemetry-value time-code">{utcTime || '00:00:00 UTC'}</span>
          </div>

          <button 
            type="button"
            className={`telemetry-audio-btn ${audioActive ? 'active' : ''}`}
            onClick={handleAudioToggle}
            title={audioActive ? 'Mute Subspace Audio Drone' : 'Enable NASA Mission Subspace Audio'}
            aria-pressed={audioActive}
          >
            <span className="audio-icon">{audioActive ? '🔊' : '🔇'}</span>
            <span className="audio-text">SUBSPACE FREQ: {audioActive ? 'ACTIVE' : 'MUTED'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TelemetryBar;
