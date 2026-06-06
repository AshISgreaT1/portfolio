export const profile = {
  name: 'Ayush Hada',
  role: 'Full Stack Developer & Creative Engineer',
  tagline:
    'I build end-to-end web apps with React, Node.js, Express, MongoDB, motion systems, and practical product thinking.',
  location: 'Gwalior, Madhya Pradesh',
  hometown: 'Kota, Rajasthan',
  email: 'ayushhada544@gmail.com',
  resume: '/resume.pdf',
  college: {
    name: 'Madhav Institute of Technology and Science, Gwalior',
    shortName: 'MITS Gwalior',
    url: 'https://web.mitsgwalior.in/',
    details: 'NAAC A++ graded college | 6th semester | Electronics and Telecommunication Engineering'
  },
  socials: {
    github: 'https://github.com/AshISgreaT1',
    linkedin: 'https://www.linkedin.com/in/ayush-hada-008406409',
    twitter: 'https://x.com/ayushhada'
  }
};

export const aboutStats = [
  { value: 4, suffix: '+', label: 'Projects Built' },
  { value: 3, suffix: '+', label: 'AI/ML Projects' },
  { value: 14, suffix: '+', label: 'Technologies Used' },
  { value: 'React + Node', suffix: '', label: 'Primary Stack' }
];

export const timeline = [
  {
    label: 'Now',
    title: 'Full stack internship ready',
    copy: 'Sharpening React, Node.js, Express, database integration, accessibility, and deployment workflows while applying for practical product teams.'
  },
  {
    label: '2025',
    title: 'Built portfolio-grade product surfaces',
    copy: 'Created responsive UI systems, animated sections, AI demos, dashboards, and polished web apps with practical backend thinking.'
  },
  {
    label: '2024',
    title: 'Systems curiosity expanded',
    copy: 'Studied electronics, telecommunication systems, networks, cybersecurity fundamentals, and practical AI tooling.'
  }
];

export const skills = [
  'React',
  'JavaScript',
  'Tailwind CSS',
  'Framer Motion',
  'Three.js',
  'GSAP',
  'Node.js',
  'Express',
  'MongoDB',
  'REST APIs',
  'Git',
  'GitHub',
  'Vite',
  'Responsive UI',
  'Prompt Engineering',
  'AI/ML Fundamentals',
  'Kali Linux',
  'Computer Networks'
];

export const skillCategories = [
  {
    category: 'Frontend',
    description: 'Interfaces, animation systems, component architecture, and responsive layouts.',
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'GSAP'],
    accent: 'cyan'
  },
  {
    category: 'Backend',
    description: 'APIs, server logic, auth-ready patterns, and integration thinking.',
    skills: ['Node.js', 'Express', 'REST APIs', 'JavaScript'],
    accent: 'violet'
  },
  {
    category: 'Database',
    description: 'Data modeling, CRUD workflows, dashboards, and persistence layers.',
    skills: ['MongoDB', 'Data Science', 'Telemetry UI'],
    accent: 'pink'
  },
  {
    category: 'Tools',
    description: 'Developer workflow, collaboration, deployment, and AI-assisted execution.',
    skills: ['Git', 'GitHub', 'Vite', 'VS Code', 'Prompt Engineering', 'Kali Linux'],
    accent: 'blue'
  }
];

export const intro = {
  title: 'A little more about me',
  lead: 'Hello, my name is Ayush. You already saw the polished bio, so here is the more real version.',
  body: [
    'I am currently looking for an internship where I can learn, contribute, and grow in full stack web development, cybersecurity, or electronics core roles. I will not pretend that I have years of experience in all of these fields, but I am genuinely eager to explore them and I am already putting in the work.',
    'I am especially enthusiastic about AI. I enjoy trying new AI tools, understanding how they can improve workflows, and getting better at using them smartly instead of just randomly. I would say I am pretty good at working with AI tools, prompts, and finding practical ways to use them.',
    'I may still lack some practical industry experience, but that is exactly why I am looking for the right opportunity. Real experience is what turns curiosity into confidence, and I am ready for that next step.'
  ],
  closing: 'You can find my contact details here in the portfolio. Hope you like it.'
};

export const experiences = [
  {
    company: 'Open Source Contributor',
    role: 'Frontend Contributor',
    date: '2025 - Present',
    type: 'Remote / Community',
    points: [
      'Fixed UI bugs in React components and refined responsive behavior',
      'Improved accessibility labels, keyboard states, and interaction polish',
      'Documented setup steps so first-time contributors could move faster'
    ]
  },
  {
    company: 'College Innovation Cell',
    role: 'Web Development Intern',
    date: 'Summer 2025',
    type: 'MITS Gwalior',
    points: [
      'Built landing pages and event surfaces for hackathon workflows',
      'Integrated forms with Google Sheets-style operational handoffs',
      'Reduced page weight by optimizing images and reusable UI components'
    ]
  }
];

export const projectFilters = ['All', 'Frontend', 'Full Stack', 'AI', 'Experiments'];

export const projects = [
  {
    id: 'ai-lab-interactive',
    title: 'TaskForge - Team Task Management Platform',
    category: 'Full Stack',
    description:
      'A modern task management platform that helps users organize projects, track task progress, and manage workflows through an intuitive and responsive interface.',
    tags: ['React', 'Task Management', 'Dashboard', 'Responsive'],
    github: 'https://github.com/AshISgreaT1/taskforge',
    demo: 'https://glistening-intuition-production-69a1.up.railway.app',
    visual: 'from-violetGlow/45 via-cyanGlow/20 to-[#050816]'
  },
  {
    id: 'secure-ops-dashboard',
    title: 'AI-Workspace-Orchestrator',
    category: 'Full Stack',
    description:
      'Developed an AI-powered VS Code extension with persistent project memory, intelligent code automation, and multi-agent workflow orchestration.',
    tags: ['VS Code', 'AI', 'Automation', 'Multi-Agent'],
    github: 'https://github.com/AshISgreaT1/AI-Workspace-Orchestrator',
    visual: 'from-pinkGlow/35 via-violetGlow/20 to-[#050816]'
  }
];

export const aiPlaygroundModels = [
  {
    id: 'cnn-audio-denoiser',
    label: 'CNN Audio Denoiser',
    usedFor:
      'Noise reduction in audio, video, and live video streams using deep learning based denoising techniques and real-time media enhancement.'
  },
  {
    id: 'react-frontend-stack',
    label: 'TaskForge Productivity Platform',
    usedFor:
      'Task and project management with real-time tracking, workflow organization, backend integration, and productivity-focused collaboration.'
  },
  {
    id: 'hsl-classification-model',
    label: 'HSL Classification Model',
    usedFor:
      'Deep learning based HSL classification with preprocessing, model training, prediction analysis, and classification optimization.'
  }
];

export const aiPlaygroundPrompts = [
  {
    id: 'noise-reduction',
    label: 'Noise Reduction using Deep Learning',
    system: 'Audio/Video | Deep learning',
    prompt:
      'AI-based deep learning system capable of reducing unwanted noise from audio, video, and live video streams with real-time processing and media enhancement.',
    response: `Project focus: learned denoising for noisy media.

Scope covers audio waveforms, encoded video frames, and live capture paths where latency budgets are tight. The pipeline emphasizes real-time inference so streams stay watchable while noise is suppressed, not just offline batch cleanup.

Media enhancement sits alongside reduction: normalize dynamics where helpful, preserve speech intelligibility, and avoid smearing fine detail when the model clamps high-frequency noise.

Good fit when you need production-minded ML: measurable SNR gains, bounded GPU/CPU cost, and a clear story from dataset to training to deployment.`
  },
  {
    id: 'freelance-frontend',
    label: 'TaskForge - Full Stack Productivity Platform',
    system: 'Productivity Platform | Task Management',
    prompt:
      'TaskForge - Full Stack Productivity Platform',
    response: `[TaskForge] - Full Stack Productivity Platform

Project focus: streamlined task and project management for teams and individuals.

Core features: task creation, status tracking, project organization, and workflow management through a clean and responsive interface.

Stack: React.js, JavaScript, modern UI components, backend integration, and persistent data handling for real-time task updates.

Design approach: productivity-first experience with intuitive navigation, responsive layouts, and efficient state management.

Outcome: built a scalable platform that helps users organize work, monitor progress, and improve daily productivity through a modern web experience.`
  },
  {
    id: 'hsl-classification',
    label: 'HSL Classification using Deep Learning',
    system: 'Vision | HSL modeling',
    prompt:
      'Developed a deep learning based HSL classification system with data preprocessing, model training, prediction analysis, and classification optimization.',
    response: `End-to-end HSL classification with a disciplined deep learning workflow.

Preprocessing: clean inputs, balance classes where skewed, and stabilize hue/saturation/lightness representations before training.

Training loop: monitor convergence, watch for overfit on thin slices of the color space, and checkpoint models when validation quality plateaus.

Prediction and analysis: inspect confusion structure, surface systematic errors, and trace them back to data or augmentations.

Optimization: refine augmentations, learning rates, and architecture choices until classification margins improve without increasing inference cost.`
  }
];
