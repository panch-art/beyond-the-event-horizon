import { useState } from 'react';
import { projectsData, categories } from '../data/projects';
import ProjectGrid from '../components/ProjectGrid/ProjectGrid';
import { sound } from '../utils/audio';

function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const visible = activeFilter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === activeFilter);

  const categoryLabels = {
    all: 'ALL FREQUENCIES',
    frontend: '01 // FRONTEND',
    ml: '02 // AI & ML',
    embedded: '03 // EMBEDDED',
    fullstack: '04 // FULLSTACK'
  };

  return (
    <div className="projects-page container" style={{ padding: '60px 20px 90px' }}>
      {/* Section Header */}
      <div className="section-header">
        <div className="section-kicker">
          <span>NASA RESEARCH ARCHIVES</span>
        </div>
        <h1 className="section-title">CLASSIFIED PROJECT DOSSIERS</h1>
        <p className="section-subtitle">
          Declassified operational software codebases, machine learning pipelines, and autonomous robotic rovers.
        </p>
        <div className="section-divider">
          <span className="line" />
          <span className="diamond" />
          <span className="line right" />
        </div>
      </div>

      {/* Filter Telemetry Bar */}
      <div 
        className="hud-panel hud-corner-brackets"
        style={{
          padding: '16px 24px',
          marginBottom: '36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="telemetry-led pulsing" />
          <span className="font-mono text-cyan" style={{ fontSize: '0.85rem' }}>
            ARCHIVE DOSSIERS: {projectsData.length} MISSIONS DECLASSIFIED
          </span>
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              className={`filter-btn ${cat === activeFilter ? 'active' : ''}`}
              onClick={() => {
                setActiveFilter(cat);
                sound.playBeep(960, 'sine', 0.03);
              }}
            >
              <span>{categoryLabels[cat] || cat.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      <ProjectGrid projects={visible} />
    </div>
  );
}

export default Projects;
