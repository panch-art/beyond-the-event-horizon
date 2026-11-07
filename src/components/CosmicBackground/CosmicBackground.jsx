import { useEffect, useRef } from 'react';
import './CosmicBackground.css';

function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates for subtle gravitational interaction
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isActive: false
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isActive = true;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Shooting star / meteor trail
    let shootingStar = null;
    let nextShootingStarTime = Date.now() + 3000;

    function triggerShootingStar() {
      const startX = Math.random() * (width * 0.75);
      const startY = Math.random() * (height * 0.4);
      const length = Math.random() * 120 + 80;
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.25; // ~45 degrees downward
      shootingStar = {
        x: startX,
        y: startY,
        length: length,
        speed: Math.random() * 8 + 10,
        dx: Math.cos(angle),
        dy: Math.sin(angle),
        life: 1.0,
        decay: Math.random() * 0.025 + 0.018,
        color: Math.random() > 0.4 ? '#00f0ff' : '#f4c466'
      };
    }
    let stars = [];
    const numStars = Math.min(180, Math.floor((width * height) / 8000));

    function initStars() {
      stars = [];
      const starColors = ['#ffffff', '#38bdf8', '#00f0ff', '#f4c466', '#a855f7'];

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.4,
          baseAlpha: Math.random() * 0.7 + 0.3,
          alpha: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.35 + 0.1,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          twinkleSpeed: Math.random() * 0.03 + 0.008,
          phase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2
        });
      }
    }

    initStars();

    const render = () => {
      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Deep space background gradient
      const bgGrad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        50,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#0a1024');
      bgGrad.addColorStop(0.4, '#070b18');
      bgGrad.addColorStop(1, '#05060b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw faint cosmic nebula clouds
      const nebula1 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.25,
        10,
        width * 0.8,
        height * 0.25,
        Math.min(width, height) * 0.6
      );
      nebula1.addColorStop(0, 'rgba(121, 40, 202, 0.08)');
      nebula1.addColorStop(0.6, 'rgba(0, 240, 255, 0.03)');
      nebula1.addColorStop(1, 'rgba(5, 6, 11, 0)');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.75,
        10,
        width * 0.2,
        height * 0.75,
        Math.min(width, height) * 0.5
      );
      nebula2.addColorStop(0, 'rgba(14, 165, 233, 0.07)');
      nebula2.addColorStop(0.5, 'rgba(244, 196, 102, 0.02)');
      nebula2.addColorStop(1, 'rgba(5, 6, 11, 0)');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // Render quantum constellation links between close stars
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const linkAlpha = (1 - dist / 90) * 0.12;
            ctx.strokeStyle = `rgba(0, 240, 255, ${linkAlpha})`;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      // Render stars & particles
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Gravitational displacement from cursor
        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const pull = (1 - dist / 150) * 0.6;
          star.x += (dx / dist) * pull;
          star.y += (dy / dist) * pull;
        }

        // Natural movement
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen boundaries
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // Twinkle calculation
        star.phase += star.twinkleSpeed;
        const currentAlpha = Math.max(0.1, star.baseAlpha + Math.sin(star.phase) * 0.3);

        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow for larger stars
        if (star.size > 1.4) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = currentAlpha * 0.15;
          ctx.fill();
        }
      }

      // Check shooting star trigger
      const now = Date.now();
      if (!shootingStar && now > nextShootingStarTime) {
        triggerShootingStar();
      }

      // Render shooting star
      if (shootingStar) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, shootingStar.life);
        
        const tailX = shootingStar.x - shootingStar.dx * shootingStar.length;
        const tailY = shootingStar.y - shootingStar.dy * shootingStar.length;

        const starGrad = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y);
        starGrad.addColorStop(0, 'transparent');
        starGrad.addColorStop(0.7, shootingStar.color);
        starGrad.addColorStop(1, '#ffffff');

        ctx.strokeStyle = starGrad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(shootingStar.x, shootingStar.y);
        ctx.stroke();

        // Shooting star head glow
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(shootingStar.x, shootingStar.y, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Advance shooting star
        shootingStar.x += shootingStar.dx * shootingStar.speed;
        shootingStar.y += shootingStar.dy * shootingStar.speed;
        shootingStar.life -= shootingStar.decay;

        if (shootingStar.life <= 0 || shootingStar.x > width + 100 || shootingStar.y > height + 100) {
          shootingStar = null;
          nextShootingStarTime = Date.now() + Math.random() * 5000 + 4000;
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="cosmic-canvas-container" aria-hidden="true">
      <canvas ref={canvasRef} className="cosmic-canvas" />
      <div className="hud-grid-overlay" />
      <div className="hud-scanline" />
      <div className="hud-vignette" />
    </div>
  );
}

export default CosmicBackground;
