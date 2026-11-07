import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import TelemetryBar from './components/TelemetryBar/TelemetryBar';
import CosmicBackground from './components/CosmicBackground/CosmicBackground';
import CosmicCursor from './components/CosmicCursor/CosmicCursor';
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

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'quantum' ? 'deepspace' : 'quantum'));
  };

  return (
    <BrowserRouter>
      {/* Route change scroll reset */}
      <ScrollToTop />

      {/* Cosmic Galaxy Custom Cursor */}
      <CosmicCursor />

      {/* Dynamic Cosmic Background Canvas */}
      <CosmicBackground />

      <div className={`app-shell theme-${theme}`}>
        {/* Top NASA Mission Control Telemetry Ticker */}
        <TelemetryBar />

        {/* HUD Navigation Dock */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        {/* Dynamic Route Content */}
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

        {/* Mission Control Base Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
