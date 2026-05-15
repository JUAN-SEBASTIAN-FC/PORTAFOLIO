// ── Skills reales — fuente: informacion real.md ──────────────────────────────

export const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '/imagenes/skill-frontend.png',
    description: 'Interfaces web modernas y responsivas.',
    skills: [
      { name: 'HTML',       level: 90 },
      { name: 'CSS',        level: 88 },
      { name: 'JavaScript', level: 85 },
      { name: 'React',      level: 80 },
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive Design'],
  },
  {
    id: 'backend',
    label: 'Backend & Datos',
    icon: '/imagenes/skill-backend.png',
    description: 'Servidores, APIs y bases de datos relacionales.',
    skills: [
      { name: 'Node.js / Express', level: 75 },
      { name: 'Python',            level: 72 },
      { name: 'SQL / PostgreSQL',  level: 70 },
      { name: 'Java',              level: 65 },
      { name: 'Supabase',          level: 72 },
      { name: 'Docker',            level: 60 },
    ],
    tags: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'Java', 'Supabase', 'Docker'],
  },
  {
    id: 'herramientas',
    label: 'Herramientas',
    icon: '/imagenes/skill-herramientas.png',
    description: 'Control de versiones, diseño y gestión de proyectos.',
    skills: [
      { name: 'Git / GitHub', level: 82 },
      { name: 'Figma',        level: 70 },
      { name: 'Notion',       level: 75 },
      { name: 'Jira',         level: 65 },
    ],
    tags: ['Git', 'GitHub', 'Figma', 'Notion', 'Jira'],
  },
];
