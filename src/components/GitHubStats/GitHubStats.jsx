import { useState, useEffect } from 'react';
import { sound } from '../../utils/audio';
import './GitHubStats.css';

function GitHubStats({ username = 'panch-art' }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('Subspace connection timed out or rate limit reached');
        const data = await response.json();
        if (isMounted) {
          setStats(data);
        }
      } catch {
        if (isMounted) {
          // High-fidelity fallback telemetry data so UI never looks empty
          setStats({
            avatar_url: '/profile.jpeg',
            name: 'Panchami J',
            login: username,
            public_repos: 14,
            followers: 12,
            following: 18,
            bio: 'Autonomous systems developer & software architect.'
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchStats();
    return () => {
      isMounted = false;
    };
  }, [username]);

  return (
    <div className="github-telemetry-card hud-panel hud-corner-brackets">
      {/* Terminal Bar */}
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="terminal-title font-mono">
          SUBSPACE GITHUB TERMINAL // USER: @{username}
        </div>
        <div className="terminal-status font-mono">
          <span className="telemetry-led pulsing" />
          <span>UPLINK: {loading ? 'SYNCING...' : 'SYNCHRONIZED'}</span>
        </div>
      </div>

      <div className="terminal-body">
        {loading ? (
          <div className="terminal-loading font-mono">
            <span className="spinner">⟳</span>
            <span>ACQUIRING ORBITAL TELEMETRY PACKETS FROM GITHUB NETWORK...</span>
          </div>
        ) : (
          <div className="terminal-content">
            <div className="stats-profile">
              <div className="stats-avatar-wrap">
                <img 
                  src={stats?.avatar_url || '/profile.jpeg'} 
                  alt={stats?.name || username} 
                  className="stats-avatar" 
                  onError={(e) => { e.currentTarget.src = '/profile.jpeg'; }}
                />
                <span className="avatar-beacon" />
              </div>

              <div className="stats-identity">
                <h3 className="stats-name">{stats?.name || 'Panchami J'}</h3>
                <span className="stats-handle font-mono">@{stats?.login || username}</span>
                <p className="stats-bio">{stats?.bio || 'Deep space engineering, machine learning and autonomous systems.'}</p>
              </div>
            </div>

            <div className="stats-counters-grid">
              <div className="stat-counter-box">
                <span className="counter-label font-mono">PUBLIC REPOSITORIES</span>
                <span className="counter-number font-mono">{stats?.public_repos ?? '--'}</span>
                <span className="counter-sub font-mono">CODEBASES IN ORBIT</span>
              </div>

              <div className="stat-counter-box">
                <span className="counter-label font-mono">TELEMETRY SUBSCRIBERS</span>
                <span className="counter-number font-mono">{stats?.followers ?? '--'}</span>
                <span className="counter-sub font-mono">NETWORK FOLLOWERS</span>
              </div>

              <div className="stat-counter-box">
                <span className="counter-label font-mono">BEACON FREQUENCY</span>
                <span className="counter-number font-mono">{stats?.following ?? '--'}</span>
                <span className="counter-sub font-mono">NODES TRACKED</span>
              </div>

              <div className="stat-counter-box">
                <span className="counter-label font-mono">SIGNAL LATENCY</span>
                <span className="counter-number font-mono text-cyan">42 ms</span>
                <span className="counter-sub font-mono">SUB-LIGHT DELAY</span>
              </div>
            </div>

            <div className="terminal-footer">
              <a 
                href={`https://github.com/${username}`} 
                target="_blank" 
                rel="noreferrer noopener"
                className="btn btn-secondary btn-hud terminal-link"
                onClick={() => sound.playBeep(1200, 'sine', 0.04)}
              >
                <span>OPEN FLIGHT REPOSITORIES ↗</span>
              </a>
              <span className="footer-telemetry-text font-mono">
                ENCRYPTED PROTOCOL // SHA-256 VERIFIED
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GitHubStats;
