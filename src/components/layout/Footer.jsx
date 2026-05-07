import './Footer.css';

const NAV_LINKS = [
  { href: '#hero',       label: 'Inicio' },
  { href: '#about',      label: 'Sobre mí' },
  { href: '#skills',     label: 'Habilidades' },
  { href: '#projects',   label: 'Proyectos' },
  { href: '#experience', label: 'Experiencia' },
  { href: '#contact',    label: 'Contacto' },
];

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top-gradient" aria-hidden="true" />

      <div className="container footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <button className="footer-logo" onClick={scrollTop} aria-label="Volver al inicio">
            <span className="footer-logo-mark gradient-text">JS</span>
            <span className="footer-logo-name">Juan&nbsp;Svaya</span>
          </button>
          <p className="footer-tagline">
            Desarrollador Full Stack · Cali, Colombia
          </p>
        </div>

        {/* Nav */}
        <nav className="footer-nav" aria-label="Navegación del footer">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="footer-nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Scroll to top */}
        <button
          className="footer-scroll-top"
          onClick={scrollTop}
          aria-label="Scroll al inicio"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </button>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">
            © {year} Juan Svaya · Todos los derechos reservados.
          </p>
          <p className="footer-made-with">
            Hecho con <span className="footer-heart" aria-label="amor">♥</span> y mucho café
          </p>
        </div>
      </div>
    </footer>
  );
}
