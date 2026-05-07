import { useEffect, useRef, useState, useCallback } from 'react';
import './DragonSequence.css';

const TOTAL_FRAMES  = 200;
const IDLE_FRAMES   = [1, 60];    // loop while idle
const ATTACK_START  = 61;
const ATTACK_END    = 200;
const FPS_IDLE      = 14;
const FPS_ATTACK    = 22;

function pad(n) {
  return String(n).padStart(3, '0');
}

function frameSrc(n) {
  return `/animacion/ezgif-frame-${pad(n)}.jpg`;
}

export default function DragonSequence() {
  const canvasRef  = useRef(null);
  const imagesRef  = useRef([]);          // pre-loaded Image objects
  const frameRef   = useRef(1);
  const animRef    = useRef(null);
  const lastTRef   = useRef(0);
  const phaseRef   = useRef('idle');      // idle | attacking | dead | resetting

  const [phase,    setPhase]    = useState('idle');
  const [loaded,   setLoaded]   = useState(0);
  const [ready,    setReady]    = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  // ── Pre-load all frames ────────────────────────────────────
  useEffect(() => {
    let count = 0;
    const imgs = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        count++;
        setLoaded(count);
        if (count === TOTAL_FRAMES) setReady(true);
      };
      img.onerror = () => { count++; setLoaded(count); };
      imgs[i] = img;
    }
    imagesRef.current = imgs;
  }, []);

  // ── Draw a frame to canvas ─────────────────────────────────
  const drawFrame = useCallback((n) => {
    const canvas = canvasRef.current;
    const img    = imagesRef.current[n];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    // Letterbox / cover fit
    const iw = img.naturalWidth  || 1;
    const ih = img.naturalHeight || 1;
    const scale = Math.max(W / iw, H / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (W - dw) / 2;
    const dy = (H - dh) / 2;

    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // ── Animation loop ─────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;

    const fpsDuration = () => {
      return phaseRef.current === 'idle' ? 1000 / FPS_IDLE : 1000 / FPS_ATTACK;
    };

    function tick(ts) {
      if (ts - lastTRef.current >= fpsDuration()) {
        lastTRef.current = ts;
        const cur = frameRef.current;
        const ph  = phaseRef.current;

        if (ph === 'idle') {
          const next = cur >= IDLE_FRAMES[1] ? IDLE_FRAMES[0] : cur + 1;
          frameRef.current = next;
          drawFrame(next);
        } else if (ph === 'attacking') {
          const next = cur + 1;
          if (next >= ATTACK_END) {
            frameRef.current = ATTACK_END;
            drawFrame(ATTACK_END);
            phaseRef.current = 'dead';
            setPhase('dead');
            setShowFlash(true);
            setTimeout(() => setShowFlash(false), 600);
            return;                      // stop loop until reset
          }
          frameRef.current = next;
          drawFrame(next);
        } else if (ph === 'resetting') {
          const next = cur - 3;
          if (next <= IDLE_FRAMES[0]) {
            frameRef.current = IDLE_FRAMES[0];
            drawFrame(IDLE_FRAMES[0]);
            phaseRef.current = 'idle';
            setPhase('idle');
            return;
          }
          frameRef.current = next;
          drawFrame(next);
        }
      }
      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [ready, drawFrame]);

  // ── Canvas resize ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      const parent = canvas.parentElement;
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = parent.clientWidth  * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width  = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      drawFrame(frameRef.current);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    resize();
    return () => ro.disconnect();
  }, [drawFrame]);

  // ── Actions ────────────────────────────────────────────────
  function handleShoot() {
    if (phaseRef.current !== 'idle') return;
    phaseRef.current = 'attacking';
    setPhase('attacking');
    frameRef.current = ATTACK_START;
    cancelAnimationFrame(animRef.current);
    // Re-kick the loop
    let last = 0;
    function tick(ts) {
      if (ts - last >= 1000 / FPS_ATTACK) {
        last = ts;
        const cur = frameRef.current;
        if (cur >= ATTACK_END || phaseRef.current === 'dead') return;
        frameRef.current = cur + 1;
        drawFrame(cur + 1);
        if (cur + 1 >= ATTACK_END) {
          phaseRef.current = 'dead';
          setPhase('dead');
          setShowFlash(true);
          setTimeout(() => setShowFlash(false), 600);
          return;
        }
      }
      animRef.current = requestAnimationFrame(tick);
    }
    animRef.current = requestAnimationFrame(tick);
  }

  function handleReset() {
    if (phaseRef.current === 'idle') return;
    phaseRef.current = 'resetting';
    setPhase('resetting');
    cancelAnimationFrame(animRef.current);
    let last = 0;
    function tick(ts) {
      if (ts - last >= 1000 / 30) {
        last = ts;
        const cur = frameRef.current;
        const next = cur - 4;
        if (next <= IDLE_FRAMES[0]) {
          frameRef.current = IDLE_FRAMES[0];
          drawFrame(IDLE_FRAMES[0]);
          phaseRef.current = 'idle';
          setPhase('idle');
          return;
        }
        frameRef.current = next;
        drawFrame(next);
      }
      animRef.current = requestAnimationFrame(tick);
    }
    animRef.current = requestAnimationFrame(tick);
  }

  const loadPct = Math.round((loaded / TOTAL_FRAMES) * 100);

  return (
    <div className={`dragon-seq dragon-seq--${phase}`}>
      {/* Loading overlay */}
      {!ready && (
        <div className="dragon-seq__loading">
          <div className="dragon-seq__loading-bar" style={{ width: `${loadPct}%` }} />
          <span className="dragon-seq__loading-text">
            Invocando criatura… {loadPct}%
          </span>
        </div>
      )}

      {/* Flash overlay on kill */}
      {showFlash && <div className="dragon-seq__flash" />}

      {/* Canvas */}
      <canvas ref={canvasRef} className="dragon-seq__canvas" />

      {/* Crosshair */}
      {(phase === 'idle') && (
        <div className="dragon-seq__crosshair" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
      )}

      {/* Controls */}
      {ready && (
        <div className="dragon-seq__controls">
          {phase === 'idle' && (
            <button
              className="dragon-seq__btn dragon-seq__btn--fire"
              onClick={handleShoot}
              id="btn-fire-dragon"
            >
              <span className="dragon-seq__btn-icon">◎</span>
              Disparar
            </button>
          )}
          {phase === 'attacking' && (
            <div className="dragon-seq__status">
              <span className="dragon-seq__pulse" />
              Atacando…
            </div>
          )}
          {phase === 'dead' && (
            <button
              className="dragon-seq__btn dragon-seq__btn--reset"
              onClick={handleReset}
              id="btn-reset-dragon"
            >
              ↺ Reinvocar
            </button>
          )}
        </div>
      )}

      {/* Weapon silhouette */}
      {ready && (
        <div className={`dragon-seq__weapon ${phase === 'attacking' ? 'dragon-seq__weapon--fired' : ''}`}>
          <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 55 L120 35 L130 20 L160 28 L148 42 L130 38 L130 55 Z"
              fill="rgba(25,45,70,0.9)" stroke="rgba(111,234,255,0.4)" strokeWidth="1" />
            <path d="M130 20 L160 10 L165 20 L160 28 Z"
              fill="rgba(111,234,255,0.15)" stroke="rgba(111,234,255,0.5)" strokeWidth="1" />
            <circle cx="145" cy="34" r="4" fill="rgba(111,234,255,0.4)" />
          </svg>
        </div>
      )}

      {/* Muzzle flash */}
      {phase === 'attacking' && (
        <div className="dragon-seq__muzzle-flash" aria-hidden="true" />
      )}
    </div>
  );
}
