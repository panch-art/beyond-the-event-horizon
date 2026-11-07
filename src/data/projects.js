export const SKILLS = [
  { name: 'Python', level: 90, icon: 'python', category: 'Core & Data', description: 'Advanced scripting, data engineering & machine learning pipeline architectures.' },
  { name: 'Java', level: 85, icon: 'java', category: 'Core & Architecture', description: 'Object-oriented systems, robust backend logic & algorithmic computation.' },
  { name: 'HTML5', level: 90, icon: 'html', category: 'Frontend & UI', description: 'Semantic structure, accessible markup & modern canvas integrations.' },
  { name: 'CSS3', level: 80, icon: 'css', category: 'Frontend & UI', description: 'Advanced responsive layouts, keyframe animations, glassmorphism & HUD aesthetics.' },
  { name: 'JavaScript', level: 55, icon: 'js', category: 'Frontend & UI', description: 'Modern ES6+ syntax, asynchronous programming & event-driven client logic.' },
  { name: 'React', level: 30, icon: 'react', category: 'Frontend & UI', description: 'Component-driven user interfaces, state management & single-page application routing.' },
  { name: 'Git', level: 80, icon: 'git', category: 'Mission Ops', description: 'Distributed version control, branch topology management & atomic commits.' },
  { name: 'GitHub', level: 90, icon: 'github', category: 'Mission Ops', description: 'Repository hosting, collaborative workflows, CI/CD actions & open-source releases.' },
  { name: 'VS Code', level: 95, icon: 'code', category: 'Mission Ops', description: 'Primary mission IDE, customized telemetry extensions & rapid debugging workflows.' },
  { name: 'Streamlit', level: 70, icon: 'streamlit', category: 'Core & Data', description: 'Rapid deployment of interactive data dashboards & machine learning UI interfaces.' }
];

export const categories = ['all', 'frontend', 'ml', 'embedded', 'fullstack'];

export const projectsData = [
  {
    id: 1,
    title: 'Musical Delight',
    category: 'frontend',
    categoryLabel: 'Audio-Visual Systems',
    featured: true,
    missionCode: 'NASA-EXP-01',
    status: 'ORBITAL ACTIVE',
    coordinates: 'SECTOR 04 // 43.12° N',
    description: 'Interactive audio-visual web application merging musical elements with visual digital art.',
    longDesc: 'Musical Delight is an interactive audio-visual web application engineered to harmoniously merge musical acoustics with procedural visual digital art. Leveraging the HTML5 Web Audio API and Canvas API, it extracts real-time frequency and time-domain data from audio streams, converting musical dynamics into kinetic visual geometries and responsive animations.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Web Audio API', 'Canvas API'],
    githubUrl: 'https://github.com/panch-art/MUSICAL-DELIGHT',
    liveUrl: '#',
    telemetry: {
      latency: '2.1ms',
      audioChannels: 'Stereo 48kHz',
      renderRate: '60 FPS Canvas',
      architecture: 'Client-Side DSP'
    },
    keyFeatures: [
      'Real-time Fast Fourier Transform (FFT) frequency analysis',
      'Fluid Canvas particle systems dynamically reacting to pitch and gain',
      'Intuitive audio control deck with track manipulation & visualizer presets',
      'Responsive full-viewport canvas scaling with low CPU footprint'
    ]
  },
  {
    id: 2,
    title: 'Sepsis Guardian',
    category: 'ml',
    categoryLabel: 'Predictive Healthcare AI',
    featured: true,
    missionCode: 'NASA-EXP-02',
    status: 'OPERATIONAL',
    coordinates: 'SECTOR 09 // 12.88° S',
    description: 'Healthcare analytics platform for early sepsis detection and patient risk tracking.',
    longDesc: 'Sepsis Guardian is a predictive healthcare analytics platform designed for the early detection and real-time risk stratification of clinical sepsis. By analyzing vital signs and biochemical biomarkers through machine learning models, the system alerts medical responders before severe septic shock sets in.',
    tech: ['Python', 'Machine Learning', 'Pandas', 'Flask', 'Data Visualization'],
    githubUrl: 'https://github.com/niranjanamahendran2006-afk/sepsis-guardian',
    liveUrl: '#',
    telemetry: {
      accuracy: 'High Clinical Precision',
      pipeline: 'Pandas + Scikit-Learn',
      backend: 'Flask RESTful Service',
      dataThroughput: 'Real-time telemetry'
    },
    keyFeatures: [
      'Early warning algorithmic scoring for vital sign degradation',
      'Automated data cleaning and feature normalization via Pandas',
      'Flask microservice serving fast predictive inferences',
      'Interactive risk tracking dashboard for continuous patient observation'
    ]
  },
  {
    id: 3,
    title: 'Obstacle Avoiding Robot',
    category: 'embedded',
    categoryLabel: 'Autonomous Systems & Robotics',
    featured: true,
    missionCode: 'NASA-EXP-03',
    status: 'AUTONOMOUS ACTIVE',
    coordinates: 'SECTOR 14 // 88.02° E',
    description: 'Autonomous robotic system detecting physical barriers and maneuvering dynamically.',
    longDesc: 'An autonomous rover navigation system engineered to detect physical barriers and maneuver dynamically in unmapped physical terrain. Built with an Arduino Uno core, HC-SR04 ultrasonic sonar sensor, and L298N dual H-bridge motor driver, the vehicle continuously monitors collision vectors and adjusts wheel speeds using pulse-width modulation (PWM).',
    tech: ['Arduino Uno', 'Embedded C/C++', 'HC-SR04', 'L298N', 'PWM'],
    githubUrl: '#',
    liveUrl: '#',
    telemetry: {
      sonarRange: '2cm - 400cm',
      clockSpeed: '16 MHz ATmega328P',
      reactionTime: '< 15ms',
      driveSystem: 'L298N Dual H-Bridge'
    },
    keyFeatures: [
      'Continuous ultrasonic distance echo measurement and threshold triggering',
      'Dynamic multi-directional pivot algorithms for obstacle escape',
      'Pulse-Width Modulation (PWM) speed ramping for high traction control',
      'Low-power embedded C/C++ architecture optimized for autonomous duty cycles'
    ]
  },
  {
    id: 4,
    title: 'JobSuite',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Fleet',
    featured: true,
    missionCode: 'NASA-EXP-04',
    status: 'DEPLOYED & LIVE',
    coordinates: 'SECTOR 21 // 55.44° W',
    description: 'Comprehensive recruitment platform streamlining candidate workflows and hiring.',
    longDesc: 'JobSuite is a modern, end-to-end recruitment platform engineered to streamline candidate management workflows, job post tracking, and organizational hiring pipelines. Developed with React, Node.js, and MongoDB, it provides recruiters and applicants with real-time updates and an intuitive interface.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/codesbyjes/JobSuite',
    liveUrl: 'https://jeslene-iniya-portfolio-1asv.vercel.app',
    telemetry: {
      hosting: 'Vercel Cloud Edge',
      database: 'MongoDB Atlas Cluster',
      apiDesign: 'RESTful Endpoints',
      client: 'React Single Page App'
    },
    keyFeatures: [
      'End-to-end candidate lifecycle tracking from submission to interview',
      'Search and filter workflows with category-based job indexing',
      'Responsive recruiter dashboards with candidate status toggles',
      'Secure data validation and cloud-native database integration'
    ]
  }
];

export const orbitalAchievements = [
  {
    orbit: 'Orbit I',
    planet: 'Mercury Orbital Insertion',
    badge: 'STAGE 01',
    year: '2023 - 2024',
    title: 'Algorithmic Genesis & Foundation Systems',
    description: 'Mastered foundational computing paradigms, algorithmic complexity, and structured software architecture in Python and Java with 90%+ proficiency.',
    coordinates: 'RA 04h 35m / DEC +16° 30′',
    status: 'SYSTEMS NOMINAL',
    type: 'Core Mastery'
  },
  {
    orbit: 'Orbit II',
    planet: 'Venus Gravity Assist',
    badge: 'STAGE 02',
    year: '2024',
    title: 'Hardware Autonomy & Robotics Engineering',
    description: 'Engineered an autonomous obstacle-avoiding planetary rover utilizing ultrasonic HC-SR04 sonar arrays, embedded C/C++ controllers, and dynamic PWM motor maneuvering.',
    coordinates: 'RA 09h 45m / DEC +23° 49′',
    status: 'MISSION SUCCESS',
    type: 'Robotics & Embedded'
  },
  {
    orbit: 'Orbit III',
    planet: 'Earth Telemetry Station',
    badge: 'STAGE 03',
    year: '2025',
    title: 'Healthcare AI Diagnostics: Sepsis Guardian',
    description: 'Co-developed predictive clinical machine learning models for early sepsis diagnosis, integrating biomarker data processing with Pandas and real-time Flask analytics.',
    coordinates: 'RA 17h 57m / DEC +04° 41′',
    status: 'ORBIT ACHIEVED',
    type: 'Machine Learning'
  },
  {
    orbit: 'Orbit IV',
    planet: 'Mars Proximity Vector',
    badge: 'STAGE 04',
    year: '2025 - 2026',
    title: 'Full-Stack Fleet Launch: JobSuite & Musical Delight',
    description: 'Architected and launched interactive Web Audio canvas applications and end-to-end recruitment cloud platforms (JobSuite) deployed live to global edge networks.',
    coordinates: 'RA 21h 12m / DEC -11° 20′',
    status: 'FLEET ACTIVE',
    type: 'Full-Stack & Web Audio'
  },
  {
    orbit: 'Orbit V',
    planet: 'Deep Space Event Horizon',
    badge: 'HORIZON',
    year: '2026 & Beyond',
    title: 'Quantum & Autonomous Frontiers Exploration',
    description: 'Venturing beyond the event horizon: advancing quantum computing paradigms, resilient distributed architectures, and next-generation autonomous software systems.',
    coordinates: 'RA 19h 50m / DEC +08° 52′',
    status: 'TRAJECTORY LOCKED',
    type: 'Deep Space Exploration'
  }
];
