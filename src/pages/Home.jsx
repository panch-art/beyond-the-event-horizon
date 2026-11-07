import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import Hero from '../components/Hero/Hero';
import AboutSection from '../components/AboutSection/AboutSection';
import { sound } from '../utils/audio';

function Home() {
  const featured = projectsData.filter(p => p.featured);

  return (
    <div className="home-page">
      {/* 1. Black hole accretion disk Hero */}
      <Hero />

      {/* 2. Holographic information panels on cosmic nebula backdrop */}
      <AboutSection />

      {/* 3. Featured NASA Research Files & Holographic Data Cards */}
      <section className="featured-section container" id="projects">
        <div className="section-header">
          <div className="section-kicker">
            <span>EVENT HORIZON DISPATCHES</span>
          </div>
          <h2 className="section-title">FEATURED RESEARCH DOSSIERS</h2>
          <p className="section-subtitle">
            Classified mission archives declassified for public scientific inspection.
          </p>
          <div className="section-divider">
            <span className="line" />
            <span className="diamond" />
            <span className="line right" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {featured.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link 
            to="/projects" 
            className="btn btn-primary btn-hud"
            onClick={() => sound.playWarp()}
          >
            <span>ACCESS ALL NASA RESEARCH FILES</span>
            <span>⟁</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
