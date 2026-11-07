import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sound } from '../../utils/audio';
import './Hero.css';

function Hero() {
  const accretionCanvasRef = useRef(null);

  // Procedural canvas animation for the black hole accretion disk
  useEffect(() => {
    const canvas = accretionCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let size = (canvas.width = canvas.height = 540);

    const handleResize = () => {
      const container = canvas.parentElement;
      if (container) {
        const clientWidth = container.clientWidth;
        const target = Math.min(540, Math.max(300, clientWidth - 20));
        size = canvas.width = canvas.height = target;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Accretion disk particles
    const particleCount = 220;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        radius: Math.random() * (size * 0.42 - size * 0.16) + size * 0.16,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.015 + 0.008) * (Math.random() > 0.5 ? 1 : 1),
        size: Math.random() * 2.2 + 0.6,
        colorType: Math.random()
      });
    }

    let rot = 0;

    const renderAccretionDisk = () => {
      rot += 0.01;
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const horizonRadius = size * 0.16;

      // 1. Relativistic Jets (vertical beams)
      const jetGrad = ctx.createLinearGradient(cx, 0, cx, size);
      jetGrad.addColorStop(0, 'rgba(0, 240, 255, 0.45)');
      jetGrad.addColorStop(0.35, 'rgba(121, 40, 202, 0.15)');
      jetGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
      jetGrad.addColorStop(0.65, 'rgba(121, 40, 202, 0.15)');
      jetGrad.addColorStop(1, 'rgba(0, 240, 255, 0.45)');

      ctx.fillStyle = jetGrad;
      ctx.beginPath();
      ctx.moveTo(cx - 3, 0);
      ctx.lineTo(cx + 3, 0);
      ctx.lineTo(cx + 1, size);
      ctx.lineTo(cx - 1, size);
      ctx.closePath();
      ctx.fill();

      // 2. Gravitational Lensing Outer Halo (Relativistic warping)
      const outerGlow = ctx.createRadialGradient(cx, cy, horizonRadius, cx, cy, size * 0.48);
      outerGlow.addColorStop(0, 'rgba(244, 196, 102, 0.35)');
      outerGlow.addColorStop(0.25, 'rgba(0, 240, 255, 0.25)');
      outerGlow.addColorStop(0.6, 'rgba(121, 40, 202, 0.12)');
      outerGlow.addColorStop(1, 'rgba(5, 6, 11, 0)');

      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.48, 0, Math.PI * 2);
      ctx.fill();

      // 3. Elliptical Accretion Disk (Perspective tilted ring)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.25); // Cinematic tilt
      ctx.scale(1, 0.38); // Perspective compression

      // Swirling disk glow
      const diskGrad = ctx.createRadialGradient(0, 0, horizonRadius * 0.8, 0, 0, size * 0.46);
      diskGrad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      diskGrad.addColorStop(0.18, 'rgba(244, 196, 102, 0.7)');
      diskGrad.addColorStop(0.45, 'rgba(0, 240, 255, 0.5)');
      diskGrad.addColorStop(0.75, 'rgba(121, 40, 202, 0.3)');
      diskGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = diskGrad;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.46, 0, Math.PI * 2);
      ctx.fill();

      // Keplerian particles spiraling into singularity
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.speed * (horizonRadius / p.radius);
        const px = Math.cos(p.angle) * p.radius;
        const py = Math.sin(p.angle) * p.radius;

        // Doppler beaming: approaching side is brighter & bluer
        const doppler = Math.sin(p.angle + rot);
        let pColor;
        if (p.colorType > 0.6) {
          pColor = doppler > 0 ? '#00f0ff' : '#f4c466';
        } else if (p.colorType > 0.3) {
          pColor = '#ffffff';
        } else {
          pColor = '#a855f7';
        }

        ctx.fillStyle = pColor;
        ctx.shadowColor = pColor;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, p.size * (1 + doppler * 0.3), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.restore();

      // 4. Photon Sphere (Intense Einstein Ring around the Singularity)
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, horizonRadius * 1.15, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(244, 196, 102, 0.85)';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#f4c466';
      ctx.shadowBlur = 18;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, horizonRadius * 1.05, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.9)';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.restore();

      // 5. The Pure Black Event Horizon (Singularity Center)
      ctx.beginPath();
      ctx.arc(cx, cy, horizonRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#010204';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 25;
      ctx.fill();

      animId = requestAnimationFrame(renderAccretionDisk);
    };

    renderAccretionDisk();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-grid container">
        {/* Left Column: Hero Mission Briefing */}
        <div className="hero-content">
          <div className="mission-classification">
            <span className="hud-badge pulse-badge">DECLASSIFIED</span>
            <span className="mission-id font-mono">MISSION ARCHIVE // EVENT-HORIZON-01</span>
          </div>

          <h1 className="hero-callsign">
            PANCHAMI
          </h1>

          <div className="hero-concept">
            <span className="concept-prefix font-mono">// CONCEPT //</span>
            <span className="concept-text">Beyond the Event Horizon</span>
          </div>

          <p className="hero-brief">
            Autonomous Systems Navigator & Quantum Realm Software Architect.
            Bridging embedded robotics, predictive machine learning diagnostics, and fluid human-interface paradigms across digital spacetime.
          </p>

          <div className="hero-cta-group">
            <Link
              to="/projects"
              className="btn btn-primary btn-hud hero-cta-btn"
              onClick={() => sound.playWarp()}
            >
              <span className="btn-icon">⟁</span>
              <span>Initiate Exploration</span>
            </Link>

            <Link
              to="/about"
              className="btn btn-secondary btn-hud"
              onClick={() => sound.playBeep(980, 'sine', 0.05)}
            >
              <span className="btn-icon">◈</span>
              <span>Mission Specialist</span>
            </Link>
          </div>

          {/* Telemetry HUD metrics dock */}
          <div className="hero-telemetry-hud hud-panel hud-corner-brackets">
            <div className="telemetry-stat">
              <span className="stat-label font-mono">GRAVITATIONAL PULL</span>
              <span className="stat-value">3.82 × 10¹² m/s²</span>
            </div>
            <div className="telemetry-stat">
              <span className="stat-label font-mono">QUANTUM COHERENCE</span>
              <span className="stat-value text-cyan">99.98%</span>
            </div>
            <div className="telemetry-stat">
              <span className="stat-label font-mono">HORIZON DISTANCE</span>
              <span className="stat-value text-gold">0.04 AU</span>
            </div>
            <div className="telemetry-stat">
              <span className="stat-label font-mono">SYSTEM STATUS</span>
              <span className="stat-value text-emerald">TRANSCENDING</span>
            </div>
          </div>
        </div>

        {/* Right Column: Black Hole Accretion Disk Visual */}
        <div className="blackhole-visual-wrapper">
          <div className="blackhole-rings">
            <div className="orbital-ring ring-1" />
            <div className="orbital-ring ring-2" />
            <div className="orbital-ring ring-3" />
          </div>

          <canvas ref={accretionCanvasRef} className="accretion-canvas" />

          <div className="blackhole-reticle">
            <span className="reticle-label top font-mono">PHOTON_SPHERE_LOCK</span>
            <span className="reticle-label bottom font-mono">MASS: 4.1 × 10⁶ M☉</span>
            <div className="reticle-corner tl" />
            <div className="reticle-corner tr" />
            <div className="reticle-corner bl" />
            <div className="reticle-corner br" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
