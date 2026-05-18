import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// UI
import CaveBackground from './components/ui/CaveBackground';

// Pages / Sections
import Hero       from './components/sections/Hero';
import About      from './components/sections/About';
import Skills     from './components/sections/Skills';
import Projects   from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact    from './components/sections/Contact';
import Certificates from './pages/Certificates';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'light';
  });

  // Apply theme to root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <>
      {/* Ambient background */}
      <CaveBackground />

      {/* Navigation */}
      <Header theme={theme} onToggleTheme={toggleTheme} />

      {/* Main content with Routing */}
      <main id="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Contact />
            </>
          } />
          <Route path="/certificados" element={<Certificates />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
