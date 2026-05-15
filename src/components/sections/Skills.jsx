import { useState, useRef, useEffect } from 'react';
import { skillCategories } from '../../data/skills';
import './Skills.css';

function SkillBar({ name, level, inView }) {
  return (
    <div className="skill-bar-item">
      <div className="skill-bar-header">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-level">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ width: inView ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

function CategoryCard({ category, isActive, onClick }) {
  return (
    <button
      className={`skill-category-btn${isActive ? ' active' : ''}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <span className="skill-cat-label">{category.label}</span>
    </button>
  );
}

export default function Skills() {
  const [activeId, setActiveId] = useState('frontend');
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  const active = skillCategories.find((c) => c.id === activeId);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Reset bars when switching category so they animate again
  const handleCategory = (id) => {
    if (id === activeId) return;
    setInView(false);
    setActiveId(id);
    requestAnimationFrame(() => requestAnimationFrame(() => setInView(true)));
  };

  return (
    <section id="habilidades" className="skills-section" ref={sectionRef}>
      {/* Decorative top border */}
      <div className="section-top-border" />

      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-eyebrow">Arsenal técnico</span>
          <h2 className="section-title">
            Habilidades &amp; <span className="gradient-text">Tecnologías</span>
          </h2>
          <p className="section-subtitle">
            Stack completo desde la interfaz hasta el servidor, con integración de IA en productos reales.
          </p>
        </div>

        {/* Category tabs */}
        <div className="skill-categories-nav" role="tablist" aria-label="Categorías de habilidades">
          {skillCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isActive={cat.id === activeId}
              onClick={() => handleCategory(cat.id)}
            />
          ))}
        </div>

        {/* Active panel */}
        <div className="skills-panel glass-panel" key={activeId}>
          <div className="skills-panel-meta">
            <p className="skills-panel-description">{active.description}</p>
          </div>

          <div className="skills-grid">
            {/* Bars */}
            <div className="skill-bars">
              {active.skills.map((s) => (
                <SkillBar key={s.name} name={s.name} level={s.level} inView={inView} />
              ))}
            </div>

            {/* Tags cloud */}
            <div className="skill-tags-panel">
              <p className="skill-tags-title">Ecosistema</p>
              <div className="skill-tags">
                {active.tags.map((tag) => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="skills-stats">
          {[
            { value: '18',      label: 'Años' },
            { value: '4',       label: 'Proyectos publicados' },
            { value: '3',       label: 'Categorías de tecnología' },
            { value: 'Univalle', label: 'Universidad del Valle' },
          ].map((stat) => (
            <div key={stat.label} className="skills-stat glass-panel">
              <span className="skills-stat-value gradient-text">{stat.value}</span>
              <span className="skills-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
