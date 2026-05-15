import PulseIndicator from '../ui/PulseIndicator';
import DragonSequence  from '../ui/DragonSequence';
import Stalactites     from '../ui/Stalactites';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Hero.css';

export default function Hero() {
  const titleRef    = useScrollAnimation();
  const subtitleRef = useScrollAnimation();
  const ctaRef      = useScrollAnimation();

  return (
    <section className="hero section" id="inicio">
      <Stalactites position="top" count={13} />

      <div className="hero__inner container">
        {/* ── Text side ── */}
        <div className="hero__content">
          <div ref={titleRef} className="animate-fade-up">
            <span className="section-label">Portafolio</span>
            <h1 className="hero__name">
              Juan Sebastián<br />
              <span className="text-glow">Falla Cañarte</span>
            </h1>
          </div>

          <div ref={subtitleRef} className="hero__meta animate-fade-up delay-2">
            <PulseIndicator label="Disponible para trabajo" variant="green" />
            <p className="hero__role">
              Desarrollador de Software<br />
              <span className="text-gold">Universidad del Valle</span>
            </p>
            <p className="hero__bio">
              Diseño y construyo aplicaciones web reales: desde la interfaz hasta
              el servidor. Me apasiona escribir código limpio que resuelva
              problemas concretos.
            </p>
          </div>

          <div ref={ctaRef} className="hero__actions animate-fade-up delay-4">
            <a href="#proyectos" className="btn btn-primary" id="hero-cta-projects">
              Ver proyectos
            </a>
            <a href="#contacto" className="btn btn-ghost" id="hero-cta-contact">
              Contactar
            </a>
          </div>

          {/* Stats */}
          <div className="hero__stats animate-fade-up delay-4">
            <div className="hero__stat">
              <strong>18</strong>
              <span>Años</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat">
              <strong>4</strong>
              <span>Proyectos publicados</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat">
              <strong>Tuluá</strong>
              <span>Colombia</span>
            </div>
          </div>
        </div>

        {/* ── Dragon side ── */}
        <div className="hero__dragon-wrapper">
          <div className="hero__dragon-glow" aria-hidden="true" />
          <DragonSequence />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </div>
    </section>
  );
}
