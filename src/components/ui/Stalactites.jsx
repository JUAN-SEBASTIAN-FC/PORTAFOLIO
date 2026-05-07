import './Stalactites.css';

const STALACTITES = [
  { left: '4%',  height: 120, width: 18 },
  { left: '11%', height: 70,  width: 12 },
  { left: '18%', height: 160, width: 22 },
  { left: '25%', height: 55,  width: 10 },
  { left: '32%', height: 100, width: 16 },
  { left: '42%', height: 80,  width: 14 },
  { left: '50%', height: 45,  width: 9  },
  { left: '58%', height: 130, width: 20 },
  { left: '65%', height: 65,  width: 11 },
  { left: '72%', height: 90,  width: 15 },
  { left: '80%', height: 170, width: 24 },
  { left: '88%', height: 50,  width: 9  },
  { left: '95%', height: 110, width: 17 },
];

export default function Stalactites({ position = 'top', count = STALACTITES.length }) {
  const items = STALACTITES.slice(0, count);

  return (
    <div className={`stalactites stalactites--${position}`} aria-hidden="true">
      {items.map((s, i) => (
        <div
          key={i}
          className="stalactite"
          style={{
            left:          s.left,
            '--h':         `${s.height}px`,
            '--w':         `${s.width}px`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
      {/* Drip drops */}
      {items.filter((_, i) => i % 3 === 0).map((s, i) => (
        <div
          key={`drip-${i}`}
          className="stalactite-drip"
          style={{
            left:            `calc(${s.left} + ${s.width / 2 - 2}px)`,
            '--drip-top':    `${s.height}px`,
            animationDelay:  `${i * 1.2}s`,
          }}
        />
      ))}
    </div>
  );
}
