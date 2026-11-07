
import { useEffect, useState } from "react";
import "./MissionIntro.css";

export default function MissionIntro({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      onComplete();
      return;
    }

    const phases = [
      { time: 0, phase: 0, progress: 10 },
      { time: 900, phase: 1, progress: 30 },
      { time: 1900, phase: 2, progress: 55 },
      { time: 3100, phase: 3, progress: 80 },
      { time: 4500, phase: 4, progress: 100 },
    ];

    const timers = phases.map(({ time, phase, progress }) =>
      setTimeout(() => {
        setPhase(phase);
        setProgress(progress);
      }, time)
    );

    const finishTimer = setTimeout(onComplete, 5600);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className={`mission-intro phase-${phase}`}>
      <div className="intro-stars" />
      <div className="intro-nebula" />

      <div className="mission-top">
        <span>PANCHAMI // SPACE EXPLORATION</span>
        <span>SYS.ONLINE</span>
      </div>

      <div className="black-hole">
        <div className="accretion-ring ring-one" />
        <div className="accretion-ring ring-two" />
        <div className="event-horizon" />
      </div>

      <div className="mission-readout">
        <p>MISSION INITIALIZATION</p>

        <h1>
          {phase === 0 && "ESTABLISHING CONNECTION"}
          {phase === 1 && "ANOMALY DETECTED"}
          {phase === 2 && "APPROACHING EVENT HORIZON"}
          {phase === 3 && "ENTERING THE UNKNOWN"}
          {phase === 4 && "MISSION READY"}
        </h1>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span>{progress}% SYSTEMS INITIALIZED</span>

        {phase === 4 && (
          <h2 className="welcome-text">
            WELCOME, EXPLORER.
          </h2>
        )}
      </div>

      <div className="mission-footer">
        <span>COORDINATES: BEYOND THE EVENT HORIZON</span>
        <span>EST. 2026</span>
      </div>
    </div>
  );
}

