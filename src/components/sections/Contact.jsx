import { useState, useRef } from 'react';
import './Contact.css';

const SOCIALS = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/juansvaya',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/juansvaya',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email directo',
    href: 'mailto:juans@example.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
      </svg>
    ),
  },
];

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const formRef = useRef(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate async send (replace with real API call)
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('sent');
    setForm(INITIAL_FORM);
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contacto" className="contact-section">
      <div className="section-top-border" />

      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Hablemos</span>
          <h2 className="section-title">
            Iniciar <span className="gradient-text">Conversación</span>
          </h2>
          <p className="section-subtitle">
            ¿Tenés un proyecto en mente? ¿Querés colaborar o simplemente charlar sobre tecnología?
            Estoy disponible.
          </p>
        </div>

        <div className="contact-layout">
          {/* Left — info */}
          <div className="contact-info">
            <div className="glass-panel contact-availability">
              <div className="availability-dot" aria-hidden="true" />
              <div>
                <p className="availability-title">Disponible para proyectos</p>
                <p className="availability-sub">Respondo en menos de 24 horas</p>
              </div>
            </div>

            <div className="contact-socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target={s.id !== 'email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="contact-social-link glass-panel"
                  aria-label={s.label}
                >
                  <span className="contact-social-icon">{s.icon}</span>
                  <span className="contact-social-label">{s.label}</span>
                  <svg className="contact-social-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <form
            ref={formRef}
            className="contact-form glass-panel"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Formulario de contacto"
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">Nombre</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  className="form-input"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Juan García"
                  autoComplete="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  className="form-input"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="hola@ejemplo.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject" className="form-label">Asunto</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                className="form-input"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder="Proyecto · Consulta · Colaboración"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message" className="form-label">Mensaje</label>
              <textarea
                id="contact-message"
                name="message"
                className="form-input form-textarea"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Contame sobre tu proyecto o idea..."
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary contact-submit"
              disabled={status === 'sending' || status === 'sent'}
              aria-live="polite"
            >
              {status === 'idle'    && 'Enviar mensaje'}
              {status === 'sending' && 'Enviando…'}
              {status === 'sent'    && '✓ Mensaje enviado'}
              {status === 'error'   && 'Error — intentá de nuevo'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
