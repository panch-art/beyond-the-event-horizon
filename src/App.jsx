import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import TelemetryBar from './components/TelemetryBar/TelemetryBar';
import CosmicBackground from './components/CosmicBackground/CosmicBackground';
import CosmicCursor from './components/CosmicCursor/CosmicCursor';
import MissionIntro from './components/MissionIntro';

import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Achievements from './pages/Achievements';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'deepspace';
  });

  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('missionIntroPlayed');
  });

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'quantum' ? 'deepspace' : 'quantum'));
  };

  const completeIntro = useCallback(() => {
    sessionStorage.setItem('missionIntroPlayed', 'true');
    setShowIntro(false);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />

      <CosmicCursor />
      <CosmicBackground />

      {showIntro && <MissionIntro onComplete={completeIntro} />}

      <div className={`app-shell theme-${theme}`}>
        <TelemetryBar />

        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
