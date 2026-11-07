import { useState } from 'react';
import { orbitalAchievements } from '../data/projects';
import { sound } from '../utils/audio';
import './Achievements.css';

function Achievements() {
  const [selectedOrbit, setSelectedOrbit] = useState(0);

  const activeAchievement = orbitalAchievements[selectedOrbit];

  const handleSelectNode = (index) => {
    setSelectedOrbit(index);
    sound.playBeep(900 + index * 120, 'sine', 0.04);
  };

  const planetGradients = [
    'radial-gradient(circle, #f59e0b, #b45309)', // Mercury
    'radial-gradient(circle, #fcd34d, #d97706)', // Venus
    'radial-gradient(circle, #38bdf8, #0369a1)', // Earth
    'radial-gradient(circle, #f87171, #b91c1c)', // Mars
    'radial-gradient(circle, #c084fc, #05060b)'  // Event Horizon
  ];

  return (
    <div className="achievements-page container">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-kicker">
          <span>MISSION CHRONOLOGY</span>
        </div>
        <h1 className="section-title">ORBITAL TIMELINE</h1>
        <p className="section-subtitle">
          Planetary trajectory milestones and technological breakthroughs mapped across the solar orbit toward the Event Horizon.
        </p>
        <div className="section-divider">
          <span className="line" />
          <span className="diamond" />
          <span className="line right" />
        </div>
      </div>

      {/* Main Planetary Trajectory Deck */}
      <div className="orbital-trajectory-deck hud-panel hud-corner-brackets">
        {/* Orbital Trajectory Path Visualization */}
        <div className="planetary-path-container">
          <div className="path-guide-line">
            <span className="orbital-probe-pulse" aria-hidden="true" />
          </div>

          <div className="planetary-nodes-row">
            {orbitalAchievements.map((item, index) => {
              const isSelected = selectedOrbit === index;
              return (
                <div 
                  key={item.orbit}
                  className={`planet-waypoint ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectNode(index)}
                  onMouseEnter={() => sound.playBeep(1200 + index * 80, 'sine', 0.02)}
                >
                  <div className="waypoint-orbit-badge font-mono">{item.orbit}</div>
                  
                  <div className="planet-sphere-wrap">
                    <div 
                      className="planet-sphere" 
                      style={{ background: planetGradients[index] }}
                    />
                    <div className="planet-glow-ring" />
                    {index === 2 && <span className="earth-moon-satellite" aria-hidden="true" />}
                    {index === 4 && <div className="singularity-disc-ring" />}
                  </div>

                  <span className="planet-name font-mono">{item.planet.split(' ')[0]}</span>
                  <span className="planet-year font-mono">{item.year}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Planetary Telemetry Readout */}
        <div className="orbital-readout-panel">
          <div className="readout-header">
            <div className="readout-badges">
              <span className="badge-gold font-mono">{activeAchievement.badge}</span>
              <span className="font-mono text-cyan">{activeAchievement.orbit} // {activeAchievement.year}</span>
            </div>
            <div className="readout-status font-mono">
              <span className="telemetry-led pulsing" />
              <span>{activeAchievement.status}</span>
            </div>
          </div>

          <div className="readout-body">
            <div className="readout-title-block">
              <span className="readout-location font-mono">// WAYPOINT: {activeAchievement.planet}</span>
              <h2 className="readout-heading">{activeAchievement.title}</h2>
              <span className="readout-coords font-mono">CELESTIAL COORD: {activeAchievement.coordinates}</span>
            </div>

            <p className="readout-desc">{activeAchievement.description}</p>

            <div className="readout-telemetry-grid">
              <div className="readout-metric">
                <span className="metric-label font-mono">MISSION DISCIPLINE</span>
                <span className="metric-val">{activeAchievement.type}</span>
              </div>
              <div className="readout-metric">
                <span className="metric-label font-mono">TRAJECTORY STATUS</span>
                <span className="metric-val text-cyan">VERIFIED & LOGGED</span>
              </div>
              <div className="readout-metric">
                <span className="metric-label font-mono">ORBITAL CLEARANCE</span>
                <span className="metric-val text-gold">STAGE {selectedOrbit + 1} COMPLETE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orbital Timeline Full Chronology Cards */}
      <div className="timeline-cards-list">
        {orbitalAchievements.map((item, index) => (
          <div 
            key={item.orbit} 
            className={`timeline-card hud-panel hud-corner-brackets ${selectedOrbit === index ? 'active' : ''}`}
            onClick={() => handleSelectNode(index)}
          >
            <div className="timeline-node-marker">
              <div 
                className="marker-planet" 
                style={{ background: planetGradients[index] }}
              />
              <span className="marker-index font-mono">0{index + 1}</span>
            </div>

            <div className="timeline-card-content">
              <div className="timeline-card-meta">
                <span className="font-mono text-cyan">{item.orbit} • {item.year}</span>
                <span className="font-mono text-gold">{item.coordinates}</span>
              </div>
              <h3 className="timeline-card-title">{item.title}</h3>
              <p className="timeline-card-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Achievements;
