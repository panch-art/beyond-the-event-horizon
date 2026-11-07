import { Link } from 'react-router-dom';
import AboutSection from '../components/AboutSection/AboutSection';
import GitHubStats from '../components/GitHubStats/GitHubStats';
import SkillCard from '../components/SkillCard/SkillCard';
import { SKILLS } from '../data/projects';
import { sound } from '../utils/audio';
import './AboutPage.css';

function About() {
  // Show top core skills preview on About page with link to complete constellation
  const previewSkills = SKILLS.slice(0, 6);

  return (
    <div className="about-page">
      {/* Holographic information panels on cosmic nebula backdrop */}
      <AboutSection />

      {/* Skills Constellation Preview */}
      <section className="about-skills-section container">
        <div className="section-header">
          <div className="section-kicker">
            <span>CALIBRATED FLIGHT SYSTEMS</span>
          </div>
          <h2 className="section-title">CORE CAPABILITIES</h2>
          <p className="section-subtitle">
            Essential software competencies powering deep space navigation and intelligent telemetry.
          </p>
          <div className="section-divider">
            <span className="line" />
            <span className="diamond" />
            <span className="line right" />
          </div>
        </div>

        <div className="about-skills-grid">
          {previewSkills.map(s => (
            <SkillCard
              key={s.name}
              name={s.name}
              level={s.level}
              icon={s.icon}
              category={s.category}
              description={s.description}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link
            to="/skills"
            className="btn btn-primary btn-hud"
            onClick={() => sound.playWarp()}
          >
            <span>VIEW ALL 10 QUANTUM SKILL NODES</span>
            <span>⟁</span>
          </Link>
        </div>
      </section>

      {/* Real-time GitHub Telemetry Terminal */}
      <section className="about-github-section container">
        <div className="section-header">
          <div className="section-kicker">
            <span>REAL-TIME SUBSPACE LINK</span>
          </div>
          <h2 className="section-title">TELEMETRY & FLIGHT REPOS</h2>
          <p className="section-subtitle">
            Live synchronization with the GitHub distributed development network.
          </p>
          <div className="section-divider">
            <span className="line" />
            <span className="diamond" />
            <span className="line right" />
          </div>
        </div>

        <GitHubStats username="panch-art" />
      </section>
    </div>
  );
}

export default About;
