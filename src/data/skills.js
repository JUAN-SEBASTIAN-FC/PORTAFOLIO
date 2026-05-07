// ── Data ──────────────────────────────────────────────────────────────────────

export const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '/imagenes/skill-frontend.png',
    description: 'Interfaces modernas, accesibles y de alto rendimiento.',
    skills: [
      { name: 'React',       level: 90 },
      { name: 'TypeScript',  level: 82 },
      { name: 'Vue.js',      level: 75 },
      { name: 'CSS / SASS',  level: 92 },
      { name: 'Next.js',     level: 78 },
      { name: 'Vite',        level: 85 },
    ],
    tags: ['React', 'Vue.js', 'Next.js', 'TypeScript', 'Tailwind', 'Vite', 'CSS3', 'HTML5', 'Figma'],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '/imagenes/skill-backend.png',
    description: 'APIs robustas, bases de datos y arquitecturas escalables.',
    skills: [
      { name: 'Node.js',    level: 84 },
      { name: 'Python',     level: 80 },
      { name: 'PostgreSQL', level: 76 },
      { name: 'Django',     level: 70 },
      { name: 'Docker',     level: 72 },
      { name: 'Firebase',   level: 82 },
    ],
    tags: ['Node.js', 'Python', 'Django', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Docker', 'REST API', 'GraphQL'],
  },
  {
    id: 'ai',
    label: 'AI & ML',
    icon: '/imagenes/skill-ai.png',
    description: 'Integración de inteligencia artificial en productos reales.',
    skills: [
      { name: 'OpenAI API',  level: 88 },
      { name: 'LangChain',   level: 70 },
      { name: 'TensorFlow',  level: 60 },
      { name: 'Prompt Eng.', level: 85 },
    ],
    tags: ['OpenAI', 'LangChain', 'Gemini API', 'TensorFlow', 'Prompt Engineering', 'RAG', 'Embeddings'],
  },
];
