import './PulseIndicator.css';

export default function PulseIndicator({ label = 'Disponible', variant = 'green' }) {
  return (
    <div className={`pulse-indicator pulse-indicator--${variant}`}>
      <span className="pulse-indicator__dot" aria-hidden="true" />
      <span className="pulse-indicator__label">{label}</span>
    </div>
  );
}
