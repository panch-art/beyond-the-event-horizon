import { useState } from 'react';
import { SKILLS } from '../data/projects';
import SkillCard from '../components/SkillCard/SkillCard';
import { sound } from '../utils/audio';

function Skills() {
  const [filter, setFilter] = useState('all');

  const categories = [
    { key: 'all', label: 'ALL QUANTUM NODES' },
    { key: 'Core & Data', label: 'CORE & DATA' },
    { key: 'Frontend & UI', label: 'FRONTEND & UI' },
    { key: 'Mission Ops', label: 'MISSION OPS' }
  ];

  const visibleSkills = filter === 'all' 
    ? SKILLS 
    : SKILLS.filter(s => s.category === filter);

  return (
    <div className="skills-page container" style={{ padding: '60px 20px 80px' }}>
      {/* Section Header */}
      <div className="section-header">
        <div className="section-kicker">
          <span>QUANTUM REALM ARCHITECTURE</span>
        </div>
        <h1 className="section-title">CONSTELLATION NODES</h1>
        <p className="section-subtitle">
          Quantum particles and computational faculties calibrated for deep space navigation and software resilience.
        </p>
        <div className="section-divider">
          <span className="line" />
          <span className="diamond" />
          <span className="line right" />
        </div>
      </div>

      {/* Telemetry Summary Banner & Constellation Matrix */}
      <div 
        className="hud-panel hud-corner-brackets"
        style={{
          padding: '20px 24px',
          marginBottom: '36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="telemetry-led pulsing" />
            <span className="font-mono text-cyan" style={{ fontSize: '0.85rem' }}>
              CONSTELLATION NETWORK: 10 QUANTUM NODES SYNCHRONIZED
            </span>
          </div>

          <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>
            AVERAGE COHERENCE: 76.5% // PEAK: 95% (VS CODE)
          </div>
        </div>

        {/* Constellation Sectors Radar Track */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '10px',
            borderTop: '1px dashed rgba(0, 240, 255, 0.15)',
            paddingTop: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.72rem' }} className="font-mono">
            <span style={{ color: 'var(--accent-gold)' }}>[α]</span>
            <span style={{ color: 'var(--text-muted)' }}>CORE LOGIC:</span>
            <span style={{ color: '#ffffff' }}>Py • Java</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.72rem' }} className="font-mono">
            <span style={{ color: 'var(--accent-gold)' }}>[β]</span>
            <span style={{ color: 'var(--text-muted)' }}>DATA / ML:</span>
            <span style={{ color: '#ffffff' }}>Streamlit</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.72rem' }} className="font-mono">
            <span style={{ color: 'var(--accent-gold)' }}>[γ]</span>
            <span style={{ color: 'var(--text-muted)' }}>HOLOGRAPHIC:</span>
            <span style={{ color: '#ffffff' }}>HTML5 • CSS • JS • React</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.72rem' }} className="font-mono">
            <span style={{ color: 'var(--accent-gold)' }}>[δ]</span>
            <span style={{ color: 'var(--text-muted)' }}>OPS DECK:</span>
            <span style={{ color: '#ffffff' }}>Git • GitHub • VS Code</span>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '40px'
        }}
      >
        {categories.map(cat => (
          <button
            key={cat.key}
            type="button"
            className={`filter-btn ${filter === cat.key ? 'active' : ''}`}
            onClick={() => {
              setFilter(cat.key);
              sound.playBeep(1000, 'sine', 0.03);
            }}
          >
            <span>⬡</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}
      >
        {visibleSkills.map(skill => (
          <SkillCard
            key={skill.name}
            name={skill.name}
            level={skill.level}
            icon={skill.icon}
            category={skill.category}
            description={skill.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Skills;
