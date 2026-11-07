import ProjectCard from '../ProjectCard/ProjectCard';
import './ProjectGrid.css';

function ProjectGrid({ projects }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="project-grid-empty hud-panel font-mono">
        <span className="telemetry-led pulsing" />
        <p>NO CLASSIFIED RESEARCH DOSSIERS FOUND MATCHING THIS FREQUENCY FILTER.</p>
      </div>
    );
  }

  return (
    <div className="project-grid">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export default ProjectGrid;
