import { useState, useEffect, useRef } from 'react';
import './CosmicCursor.css';

function CosmicCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorHeadRef = useRef(null);
  const canvasRef = useRef(null);

  // Position references for smooth interpolation
  const pos = useRef({
    currentX: -100,
    currentY: -100,
    targetX: -100,
    targetY: -100
  });

  const particlesRef = useRef([]);
  const ripplesRef = useRef([]);
  const animFrameRef = useRef(null);

  useEffect(() => {
    // 1. Accessibility & Touch Detection: Only enable on fine pointer devices without reduced motion preference
    const finePointerQuery = window.matchMedia('(pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const checkEnabled = () => {
      const isFinePointer = finePointerQuery.matches;
      const prefersReducedMotion = reducedMotionQuery.matches;
      setEnabled(isFinePointer && !prefersReducedMotion);
    };

    checkEnabled();

    finePointerQuery.addEventListener('change', checkEnabled);
    reducedMotionQuery.addEventListener('change', checkEnabled);

    return () => {
      finePointerQuery.removeEventListener('change', checkEnabled);
      reducedMotionQuery.removeEventListener('change', checkEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Particle colors: electric blue, cosmic violet, cyan, and starlight gold
    const trailColors = ['#00f0ff', '#38bdf8', '#a855f7', '#7928ca', '#f4c466'];

    const handleMouseMove = (e) => {
      pos.current.targetX = e.clientX;
      pos.current.targetY = e.clientY;
      setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target;
      const interactive = target && target.closest(
        'a, button, input, textarea, select, [role="button"], .filter-btn, .btn, .planet-waypoint, .timeline-card, .terminal-link-row, .external-icon-btn, .hud-toggle-btn, .telemetry-audio-btn'
      );
      setIsHovering(!!interactive);

      // Add a subtle particle to trail if moved enough (max 20 particles for light footprint)
      const lastP = particlesRef.current[particlesRef.current.length - 1];
      const dist = lastP ? Math.hypot(e.clientX - lastP.x, e.clientY - lastP.y) : 20;

      if (dist > 8 && particlesRef.current.length < 24) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 2.2 + 0.8,
          alpha: 0.85,
          color: trailColors[Math.floor(Math.random() * trailColors.length)]
        });
      }
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      // Spawn expanding cosmic ripple
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 36,
        alpha: 0.9,
        color: '#00f0ff'
      });
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    // Render loop for smooth cursor tracking, particle trail, and ripples
    const render = () => {
      // 1. Smooth interpolation for cursor head
      pos.current.currentX += (pos.current.targetX - pos.current.currentX) * 0.35;
      pos.current.currentY += (pos.current.targetY - pos.current.currentY) * 0.35;

      if (cursorHeadRef.current) {
        cursorHeadRef.current.style.transform = `translate3d(${pos.current.currentX}px, ${pos.current.currentY}px, 0)`;
      }

      // 2. Clear canvas trail
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 3. Render cosmic particle trail
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.035;
        p.size *= 0.96;

        if (p.alpha <= 0 || p.size <= 0.2) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. Render expanding cosmic ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += (r.maxRadius - r.radius) * 0.18 + 0.6;
        r.alpha -= 0.04;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, r.alpha);
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Faint second harmonic wave
        if (r.radius > 12) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.65, 0, Math.PI * 2);
          ctx.strokeStyle = '#a855f7';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cosmic-cursor-system" aria-hidden="true">
      {/* Particle trail & cosmic ripple canvas */}
      <canvas ref={canvasRef} className="cosmic-cursor-canvas" />

      {/* Cosmic cursor star / orbital ring */}
      <div
        ref={cursorHeadRef}
        className={`cosmic-cursor-head ${isHovering ? 'is-hovering' : ''} ${
          isClicking ? 'is-clicking' : ''
        } ${isVisible ? 'is-visible' : ''}`}
      >
        {/* Normal Cosmic Star Icon */}
        <div className="cursor-star-shape">
          <span className="star-core" />
          <span className="star-ray horizontal" />
          <span className="star-ray vertical" />
        </div>

        {/* Hover Orbital Ring */}
        <div className="cursor-orbital-ring">
          <span className="orbital-ring-line" />
          <span className="orbital-satellite" />
        </div>
      </div>
    </div>
  );
}

export default CosmicCursor;

