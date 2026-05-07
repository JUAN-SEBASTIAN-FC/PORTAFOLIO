import { useEffect, useRef } from 'react';
import './CaveBackground.css';

const PARTICLE_COUNT = 28;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

export default function CaveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x:    randomBetween(0, canvas.width),
        y:    randomBetween(canvas.height * 0.3, canvas.height),
        r:    randomBetween(1, 3),
        vy:   randomBetween(-0.15, -0.4),
        vx:   randomBetween(-0.1, 0.1),
        life: randomBetween(0, 1),
        maxLife: randomBetween(0.4, 1),
      }));
    }

    function drawParticles() {
      particles.forEach((p) => {
        p.life += 0.003;
        if (p.life > p.maxLife) {
          // Reset
          p.x = randomBetween(0, canvas.width);
          p.y = randomBetween(canvas.height * 0.5, canvas.height);
          p.life = 0;
          p.maxLife = randomBetween(0.4, 1);
        }
        p.x += p.vx;
        p.y += p.vy;

        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(111, 234, 255, ${alpha})`;
        ctx.fill();
      });
    }

    function drawAmbientGlow() {
      // Central bottom glow
      const grd = ctx.createRadialGradient(
        canvas.width / 2, canvas.height,  120,
        canvas.width / 2, canvas.height, canvas.height * 0.7
      );
      grd.addColorStop(0, 'rgba(111, 234, 255, 0.04)');
      grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawAmbientGlow();
      drawParticles();
      animId = requestAnimationFrame(loop);
    }

    resize();
    initParticles();
    loop();

    window.addEventListener('resize', () => { resize(); initParticles(); });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="cave-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="cave-bg__canvas" />
      <div className="cave-bg__fog cave-bg__fog--top" />
      <div className="cave-bg__fog cave-bg__fog--bottom" />
      <div className="cave-bg__vignette" />
    </div>
  );
}
