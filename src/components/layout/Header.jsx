import { useState, useEffect } from 'react';
import './Header.css';

const NAV_LINKS = [
  { href: '#inicio',      label: 'Inicio'      },
  { href: '#sobre-mi',    label: 'Sobre mí'    },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#proyectos',   label: 'Proyectos'   },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#contacto',    label: 'Contacto'    },
];

export default function Header({ theme, onToggleTheme }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [activeLink,  setActiveLink]  = useState('#inicio');
  const [menuOpen,    setMenuOpen]    = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection observer to track active section
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1));
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const ob = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveLink(`#${id}`); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      ob.observe(el);
      return ob;
    });
    return () => observers.forEach(ob => ob?.disconnect());
  }, []);

  function handleNavClick(href) {
    setMenuOpen(false);
    setActiveLink(href);
  }

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`} role="banner">
      <div className="header__inner container">
        {/* Logo */}
        <a href="#inicio" className="header__logo" aria-label="Ir al inicio">
          <span className="header__logo-mark">JS</span>
          <span className="header__logo-dot" aria-hidden="true">·</span>
          <span className="header__logo-sub">Dev</span>
        </a>

        {/* Nav */}
        <nav
          className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}
          aria-label="Navegación principal"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`header__link ${activeLink === href ? 'header__link--active' : ''}`}
              onClick={() => handleNavClick(href)}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="header__actions">
          {/* Theme toggle */}
          <button
            className="header__theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            id="btn-theme-toggle"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>

          {/* CTA */}
          <a href="#contacto" className="btn btn-primary header__cta">
            Contactar
          </a>

          {/* Hamburger */}
          <button
            className={`header__hamburger ${menuOpen ? 'header__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menú"
            aria-expanded={menuOpen}
            id="btn-menu-hamburger"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
