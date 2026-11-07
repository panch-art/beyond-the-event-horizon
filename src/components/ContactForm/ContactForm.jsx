import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sound } from '../../utils/audio';
import './ContactForm.css';

function ContactForm() {
  const navigate = useNavigate();
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle', 'encrypting', 'transmitting', 'success'
  const [terminalLogs, setTerminalLogs] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFields(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    sound.playBeep(1200, 'sine', 0.015);
  }

  function validateForm() {
    const newErrors = {};

    if (!fields.name.trim()) {
      newErrors.name = 'PILOT CALLSIGN IS REQUIRED!';
    }

    if (!fields.email.includes('@')) {
      newErrors.email = 'VALID SUBSPACE EMAIL FREQUENCY REQUIRED!';
    }

    if (fields.message.trim().length < 10) {
      newErrors.message = 'TRANSMISSION PAYLOAD MUST BE AT LEAST 10 CHARACTERS!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      sound.playBeep(400, 'sawtooth', 0.15);
      return;
    }

    sound.playWarp();
    setStatus('encrypting');
    setTerminalLogs([
      'INITIATING QUANTUM HANDSHAKE WITH MISSION CONTROL...',
      `ENCRYPTING PACKET VIA SHA-512 ENTANGLED PROTOCOL...`
    ]);

    await new Promise(resolve => setTimeout(resolve, 1200));

    setStatus('transmitting');
    setTerminalLogs(prev => [
      ...prev,
      'ALIGNING TACHYON ARRAY WITH WORMHOLE COORDINATES...',
      `BEAMING ${fields.message.length} BYTES THROUGH SUBSPACE RELAY...`
    ]);

    await new Promise(resolve => setTimeout(resolve, 1600));

    setStatus('success');
    setTerminalLogs(prev => [
      ...prev,
      'TRANSMISSION RECEIVED & ACKNOWLEDGED BY NAVIGATOR PANCHAMI J.'
    ]);
    sound.playBeep(1440, 'sine', 0.1);

    setFields({ name: '', email: '', message: '' });
  }

  return (
    <div className="quantum-terminal-wrapper hud-panel hud-corner-brackets">
      {/* CLI Terminal Bar */}
      <div className="terminal-header-bar">
        <div className="terminal-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="terminal-prompt font-mono">
          USER@EVENT-HORIZON:~$ ./initiate_transmission.sh --recipient "PANCHAMI J"
        </div>
        <div className="terminal-baud font-mono desktop-only">
          BAUD: 921600 // PORT: 443
        </div>
      </div>

      <div className="terminal-form-body">
        {status === 'success' ? (
          <div className="transmission-success-view">
            <div className="success-icon-wrap">
              <span className="telemetry-led pulsing" />
              <span className="success-glyph">✓</span>
            </div>
            <h3 className="success-title font-heading">TRANSMISSION CONFIRMED</h3>
            <p className="success-message">
              Your message packet has successfully bypassed the event horizon and been delivered directly to Navigator Panchami J.
            </p>

            <div className="terminal-log-output font-mono">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="log-line">
                  <span className="log-prefix">&gt;</span> {log}
                </div>
              ))}
            </div>

            <div className="success-actions">
              <button 
                type="button" 
                className="btn btn-secondary btn-hud"
                onClick={() => setStatus('idle')}
              >
                Send Another Transmission
              </button>

              <button 
                type="button" 
                className="btn btn-primary btn-hud"
                onClick={() => {
                  sound.playWarp();
                  navigate('/');
                }}
              >
                Return to Mission Control Home
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-terminal-form" noValidate>
            {/* Field 1: Name */}
            <div className={`terminal-field-group ${errors.name ? 'invalid' : ''}`}>
              <label className="terminal-label font-mono">
                <span className="field-code">01 //</span> PILOT CALLSIGN / FULL NAME:
              </label>
              <input
                name="name"
                type="text"
                value={fields.name}
                onChange={handleChange}
                placeholder="e.g. Dr. Carl Sagan / Commander Shepard"
                disabled={status !== 'idle'}
                autoComplete="name"
              />
              {errors.name && <p className="terminal-error font-mono">{errors.name}</p>}
            </div>

            {/* Field 2: Email */}
            <div className={`terminal-field-group ${errors.email ? 'invalid' : ''}`}>
              <label className="terminal-label font-mono">
                <span className="field-code">02 //</span> SUBSPACE FREQUENCY / EMAIL:
              </label>
              <input
                name="email"
                type="email"
                value={fields.email}
                onChange={handleChange}
                placeholder="e.g. pilot@mission-control.nasa.gov"
                disabled={status !== 'idle'}
                autoComplete="email"
              />
              {errors.email && <p className="terminal-error font-mono">{errors.email}</p>}
            </div>

            {/* Field 3: Message */}
            <div className={`terminal-field-group ${errors.message ? 'invalid' : ''}`}>
              <label className="terminal-label font-mono">
                <span className="field-code">03 //</span> TRANSMISSION PAYLOAD / MESSAGE:
              </label>
              <textarea
                name="message"
                rows="5"
                value={fields.message}
                onChange={handleChange}
                placeholder="Compose your inquiry, collaboration dispatch, or project mission briefing..."
                disabled={status !== 'idle'}
              />
              {errors.message && <p className="terminal-error font-mono">{errors.message}</p>}
            </div>

            {/* Live Terminal Log readout during transmission */}
            {(status === 'encrypting' || status === 'transmitting') && (
              <div className="terminal-live-feed font-mono">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="feed-line">
                    <span className="feed-arrow">&gt;&gt;</span> {log}
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            <div className="form-submit-row">
              <button 
                type="submit" 
                disabled={status !== 'idle'} 
                className="btn btn-primary btn-hud terminal-submit-btn"
              >
                {status === 'encrypting'
                  ? 'ENCRYPTING PACKET ⟳'
                  : status === 'transmitting'
                  ? 'BEAMING THROUGH WORMHOLE ⟁'
                  : 'TRANSMIT SUBSPACE PACKET ❯'}
              </button>

              <span className="terminal-encryption-badge font-mono">
                ENCRYPTION: 4096-BIT QUANTUM COHERENT
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ContactForm;
