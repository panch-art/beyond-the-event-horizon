import { Link, useParams } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { sound } from '../utils/audio';
import './ProjectDetails.css';

function ProjectDetails() {
  const { projectId } = useParams();
  const project = projectsData.find(item => String(item.id) === projectId);

  if (!project) {
    return (
      <section className="project-details container">
        <div className="not-found-dossier hud-panel hud-corner-brackets">
          <span className="telemetry-led pulsing" style={{ background: '#ef4444' }} />
          <h2>ERROR // MISSION FILE NOT FOUND</h2>
          <p>The requested NASA mission dossier does not exist or has been placed under classified quarantine.</p>
          <Link 
            className="btn btn-primary btn-hud" 
            to="/projects"
            onClick={() => sound.playWarp()}
          >
            Back to Research Archives
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="project-details-page container">
      {/* Back button */}
      <div className="details-nav-bar">
        <Link 
          className="details-back-link font-mono" 
          to="/projects"
          onClick={() => sound.playBeep(900, 'sine', 0.04)}
        >
          &larr; BACK TO MISSION ARCHIVES
        </Link>
        <span className="details-file-id font-mono">
          CLASSIFICATION: DECLASSIFIED // FILE: {project.missionCode || `NASA-EXP-0${project.id}`}
        </span>
      </div>

      {/* Main Dossier Container */}
      <div className="dossier-main-container hud-panel hud-corner-brackets">
        {/* Top Header Banner */}
        <div className="details-header-banner">
          <div className="header-meta">
            <span className="telemetry-led pulsing" />
            <span className="status-label font-mono">{project.status || 'OPERATIONAL'}</span>
            <span className="sector-tag font-mono">// {project.coordinates || 'DEEP SPACE'}</span>
          </div>

          <h1 className="details-title">{project.title}</h1>
          <p className="details-category-sub font-sub">{project.categoryLabel || project.category.toUpperCase()}</p>
        </div>

        {/* Content Layout Grid */}
        <div className="details-layout-grid">
          {/* Left Column: Mission Description & Schematics */}
          <div className="details-left-col">
            <div className="dossier-subpanel">
              <h3 className="subpanel-title font-mono">// MISSION OBJECTIVE & ARCHITECTURE</h3>
              <p className="subpanel-body">{project.longDesc}</p>
            </div>

            {project.keyFeatures && (
              <div className="dossier-subpanel">
                <h3 className="subpanel-title font-mono">// KEY SYSTEM CAPABILITIES</h3>
                <ul className="features-list">
                  {project.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="feature-item">
                      <span className="feature-bullet">⬡</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Telemetry Specs & Actions */}
          <div className="details-right-col">
            {/* Telemetry Matrix */}
            {project.telemetry && (
              <div className="dossier-subpanel telemetry-box">
                <h3 className="subpanel-title font-mono">// TELEMETRY DIAGNOSTICS</h3>
                <div className="telemetry-specs-list">
                  {Object.entries(project.telemetry).map(([key, val]) => (
                    <div key={key} className="spec-row">
                      <span className="spec-key font-mono">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</span>
                      <span className="spec-val font-mono">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="dossier-subpanel">
              <h3 className="subpanel-title font-mono">// INTEGRATED TECHNOLOGIES</h3>
              <div className="details-tech-tags">
                {project.tech.map(tech => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="details-actions-deck">
              {project.liveUrl && project.liveUrl !== '#' && (
                <a 
                  className="btn btn-primary btn-hud details-btn" 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => sound.playWarp()}
                >
                  <span>LAUNCH ORBITAL DEMO</span>
                  <span>↗</span>
                </a>
              )}

              {project.githubUrl && project.githubUrl !== '#' && (
                <a 
                  className="btn btn-secondary btn-hud details-btn" 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => sound.playBeep(1100, 'sine', 0.04)}
                >
                  <span>GITHUB MISSION REPO</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
