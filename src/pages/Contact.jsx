import { useRef, useEffect } from 'react';
import ContactForm from '../components/ContactForm/ContactForm';
import { sound } from '../utils/audio';

function Contact() {
  const wormholeCanvasRef = useRef(null);

  // Procedural wormhole portal vortex animation
  useEffect(() => {
    const canvas = wormholeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let size = (canvas.width = canvas.height = 360);

    const handleResize = () => {
      const container = canvas.parentElement;
      if (container) {
        const clientWidth = container.clientWidth;
        const target = Math.min(360, Math.max(260, clientWidth - 20));
        size = canvas.width = canvas.height = target;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const vortexParticles = [];
    const count = 120;
    for (let i = 0; i < count; i++) {
      vortexParticles.push({
        radius: Math.random() * (size * 0.45) + 10,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.03 + 0.015,
        spiralSpeed: Math.random() * 0.6 + 0.3,
        size: Math.random() * 2 + 0.5,
        hue: Math.random() > 0.5 ? 185 : 275 // Cyan or Violet
      });
    }

    const renderWormhole = () => {
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;

      // Tilted perspective tunnel effect
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, 0.72); // 3D Perspective tilt

      // Ambient outer throat glow
      const outerGlow = ctx.createRadialGradient(0, 0, 15, 0, 0, size * 0.46);
      outerGlow.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
      outerGlow.addColorStop(0.35, 'rgba(121, 40, 202, 0.25)');
      outerGlow.addColorStop(0.7, 'rgba(0, 240, 255, 0.15)');
      outerGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.46, 0, Math.PI * 2);
      ctx.fill();

      // Concentric wormhole event horizon rings with depth fading
      for (let r = 10; r >= 1; r--) {
        const ringRadius = (size * 0.46 * r) / 10;
        ctx.beginPath();
        ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = r % 2 === 0 ? 'rgba(0, 240, 255, 0.22)' : 'rgba(244, 196, 102, 0.2)';
        ctx.lineWidth = r <= 2 ? 2.5 : 1.2;
        ctx.stroke();
      }

      // Swirling particles spiraling inward toward the wormhole throat
      for (let i = 0; i < vortexParticles.length; i++) {
        const p = vortexParticles[i];
        p.angle += p.speed;
        p.radius -= p.spiralSpeed;

        if (p.radius < 6) {
          p.radius = size * 0.44;
          p.angle = Math.random() * Math.PI * 2;
        }

        const px = Math.cos(p.angle) * p.radius;
        const py = Math.sin(p.angle) * p.radius;

        const alpha = Math.min(1, Math.max(0.1, p.radius / (size * 0.22)));
        ctx.fillStyle = p.hue === 185 ? `rgba(0, 240, 255, ${alpha})` : `rgba(244, 196, 102, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size * (p.radius < 25 ? 1.5 : 1), 0, Math.PI * 2);
        ctx.fill();
      }

      // Wormhole throat singularity
      const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 28);
      coreGrad.addColorStop(0, '#010204');
      coreGrad.addColorStop(0.5, 'rgba(0, 240, 255, 0.6)');
      coreGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 28, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animId = requestAnimationFrame(renderWormhole);
    };

    renderWormhole();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="contact-page container" style={{ padding: '60px 20px 90px' }}>
      {/* Section Header */}
      <div className="section-header">
        <div className="section-kicker">
          <span>SUBSPACE COMM-LINK</span>
        </div>
        <h1 className="section-title">WORMHOLE PORTAL TERMINAL</h1>
        <p className="section-subtitle">
          Transmit encrypted telemetric communications across the quantum realm to Mission Control.
        </p>
        <div className="section-divider">
          <span className="line" />
          <span className="diamond" />
          <span className="line right" />
        </div>
      </div>

      {/* Main Grid: Wormhole & Interactive Terminal */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 360px) 1fr',
          gap: '40px',
          alignItems: 'start'
        }}
        className="contact-layout-grid"
      >
        {/* Left Column: Wormhole Portal & Quick Terminal Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Cosmic Wormhole Portal Card */}
          <div 
            className="hud-panel hud-corner-brackets"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '14px',
              position: 'relative'
            }}
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: '320px', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <canvas ref={wormholeCanvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  border: '1px dashed rgba(0, 240, 255, 0.3)',
                  borderRadius: '50%',
                  animation: 'spinSlow 20s linear infinite',
                  pointerEvents: 'none'
                }}
              />
            </div>

            <div className="font-mono text-cyan" style={{ fontSize: '0.82rem', letterSpacing: '0.12em' }}>
              EINSTEIN-ROSEN BRIDGE // ONLINE
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
              Continuous tachyon subspace portal linking ground station telemetry to deep-space mission explorers.
            </p>
          </div>

          {/* Interactive Terminal Links */}
          <div className="hud-panel hud-corner-brackets" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span className="font-mono text-gold" style={{ fontSize: '0.75rem', letterSpacing: '0.12em' }}>
              // INTERACTIVE TERMINAL LINKS
            </span>

            <a 
              href="https://github.com/panch-art" 
              target="_blank" 
              rel="noreferrer noopener"
              className="terminal-link-row"
              onClick={() => sound.playBeep(1200, 'sine', 0.03)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: 'rgba(7, 11, 22, 0.7)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                borderRadius: '4px',
                textDecoration: 'none',
                color: '#ffffff',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.2rem' }}>🐙</span>
                <div>
                  <div className="font-sub" style={{ fontSize: '0.95rem', fontWeight: 600 }}>GITHUB UPLINK</div>
                  <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>github.com/panch-art</div>
                </div>
              </div>
              <span className="font-mono text-cyan" style={{ fontSize: '0.8rem' }}>OPEN ↗</span>
            </a>

            <div 
              className="terminal-link-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: 'rgba(7, 11, 22, 0.7)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                borderRadius: '4px',
                color: '#ffffff'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.2rem' }}>📡</span>
                <div>
                  <div className="font-sub" style={{ fontSize: '0.95rem', fontWeight: 600 }}>STATION COORDINATES</div>
                  <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>12.9716° N, 77.5946° E</div>
                </div>
              </div>
              <span className="font-mono text-cyan" style={{ fontSize: '0.8rem' }}>INDIA</span>
            </div>

            <div 
              className="terminal-link-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: 'rgba(7, 11, 22, 0.7)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                borderRadius: '4px',
                color: '#ffffff'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.2rem' }}>🛡️</span>
                <div>
                  <div className="font-sub" style={{ fontSize: '0.95rem', fontWeight: 600 }}>TRANSMISSION ENCRYPTION</div>
                  <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>AES-GCM // Quantum Key</div>
                </div>
              </div>
              <span className="font-mono" style={{ fontSize: '0.8rem', color: '#10b981' }}>SECURE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Quantum Command Terminal Form */}
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default Contact;
