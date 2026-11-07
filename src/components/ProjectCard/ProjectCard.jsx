import { Link } from 'react-router-dom';
import { sound } from '../../utils/audio';
import './ProjectCard.css';

function ProjectCard({ project }) {
  const handleHover = () => {
    sound.playBeep(1150, 'sine', 0.03);
  };

  return (
    <article 
      className="project-dossier-card hud-panel hud-corner-brackets"
      onMouseEnter={handleHover}
    >
      {/* Top NASA File Header */}
      <div className="dossier-header">
        <div className="dossier-meta">
          <span className="file-code font-mono">{project.missionCode || `NASA-EXP-0${project.id}`}</span>
          <span className="file-stamp font-mono">DECLASSIFIED</span>
        </div>

        <div className="dossier-status">
          <span className="telemetry-led pulsing" />
          <span className="status-text font-mono">{project.status || 'OPERATIONAL'}</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="dossier-body">
        {/* Discovery Specimen Watermark & Sensor Tag */}
        <div className="discovery-specimen-strip font-mono">
          <span className="specimen-label">// DISCOVERY SPECIMEN</span>
          <span className="specimen-signal">FREQ: LOCKED ▮▮▮▯</span>
        </div>

        <div className="dossier-category font-mono">
          <span>// SECTOR: {project.categoryLabel || project.category.toUpperCase()}</span>
        </div>

        <h3 className="dossier-title">{project.title}</h3>

        <p className="dossier-desc">{project.description}</p>

        {/* Tech Chips */}
        <div className="dossier-tech-tags">
          {project.tech.map((t, idx) => (
            <span key={idx} className="tag">{t}</span>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="dossier-footer">
        <Link 
          to={`/projects/${project.id}`}
          className="btn btn-primary btn-hud dossier-inspect-btn"
          onClick={() => sound.playBeep(1300, 'sine', 0.05)}
        >
          <span>INSPECT DOSSIER</span>
          <span className="btn-arrow">❯</span>
        </Link>

        <div className="dossier-external-links">
          {project.githubUrl && project.githubUrl !== '#' && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noreferrer noopener"
              className="external-icon-btn"
              title="View Source on GitHub"
              onClick={() => sound.playBeep(1000, 'sine', 0.03)}
              aria-label={`View ${project.title} source on GitHub`}
            >
              <span>GITHUB ↗</span>
            </a>
          )}

          {project.liveUrl && project.liveUrl !== '#' && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noreferrer noopener"
              className="external-icon-btn live-btn"
              title="Open Live Orbital Mission"
              onClick={() => sound.playWarp()}
              aria-label={`Open live mission for ${project.title}`}
            >
              <span>ORBITAL DEMO ↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
