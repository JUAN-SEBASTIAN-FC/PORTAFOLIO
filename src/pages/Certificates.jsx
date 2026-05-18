import { Link } from 'react-router-dom';
import './Certificates.css';

const CERTIFICATES = [
  {
    id: 'ciberseguridad',
    title: 'Contexto de Ciberseguridad',
    institution: 'Formación Profesional',
    fileName: 'contexto de ciberseguridad.pdf',
    description: 'Certificación en fundamentos y contexto de ciberseguridad, prácticas seguras y prevención de vulnerabilidades.'
  },
  {
    id: 'python',
    title: 'Python Práctico',
    institution: 'Formación Técnica',
    fileName: 'python practico.pdf',
    description: 'Certificación en desarrollo práctico con Python, abarcando desde conceptos básicos hasta estructuras de datos complejas.'
  }
];

export default function Certificates() {
  return (
    <div className="certificates-page">
      <div className="container">
        
        <div className="certificates__header animate-fade-up">
          <Link to="/" className="btn btn-ghost back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Portafolio
          </Link>
          <div className="section-header">
            <span className="section-label">Formación Continua</span>
            <h2 className="section-title">Mis Certificados</h2>
          </div>
        </div>

        <div className="certificates__grid">
          {CERTIFICATES.map((cert, index) => (
            <div 
              key={cert.id} 
              className="glass glass-card cert-card animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="cert-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 15l-3-3m0 0l3-3m-3 3h8M3 21h18a2 2 0 002-2V5a2 2 0 00-2-2H3a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="cert-card__content">
                <h3 className="cert-card__title">{cert.title}</h3>
                <span className="cert-card__inst">{cert.institution}</span>
                <p className="cert-card__desc">{cert.description}</p>
                
                <div className="cert-card__actions">
                  <a 
                    href={`/certificados/${cert.fileName}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary btn-sm"
                  >
                    Ver Certificado
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
