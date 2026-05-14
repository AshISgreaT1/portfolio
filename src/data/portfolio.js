export const profile = {
  name: 'Ayush Hada',
  role: 'Frontend Developer, AI Explorer & Cybersecurity Enthusiast',
  tagline: 'I like building clean frontend experiences, exploring AI/ML ideas, and understanding how systems work from networks to security.',
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

export const skills = [
  'VS Code',
  'Frontend Development',
  'React',
  'JavaScript',
  'Tailwind CSS',
  'MongoDB',
  'Data Science',
  'AI/ML Fundamentals',
  'Prompt Engineering',
  'Kali Linux',
  'Cybersecurity Basics',
  'Computer Networks',
  'Electronics',
  'Telecommunication Systems'
];

export const intro = {
  title: 'A little more about me',
  lead: 'Hello, my name is Ayush. You already saw the polished bio, so here is the more real version.',
  body: [
    'I am currently looking for an internship where I can learn, contribute, and grow in web development, cybersecurity, or electronics core roles. I will not pretend that I have years of experience in all of these fields, but I am genuinely eager to explore them and I am already putting in the work.',
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
    points: ['Fixed UI bugs in React components', 'Improved accessibility labels and keyboard states', 'Documented setup steps for first-time contributors']
  },
  {
    company: 'College Innovation Cell',
    role: 'Web Development Intern',
    date: 'Summer 2025',
    points: ['Built landing pages for hackathon events', 'Integrated forms with Google Sheets workflows', 'Reduced page weight by optimizing images and reusable components']
  }
];

export const aiPlaygroundModels = [
  {
    id: 'cnn-audio-denoiser',
    label: 'CNN Audio Denoiser',
    usedFor:
      'Noise reduction in audio, video, and live video streams using deep learning based denoising techniques and real-time media enhancement.',
  },
  {
    id: 'react-frontend-stack',
    label: 'React Frontend Stack',
    usedFor:
      'Freelance frontend development projects using React.js, Tailwind CSS, JavaScript, Framer Motion, and modern responsive UI design.',
  },
  {
    id: 'hsl-classification-model',
    label: 'HSL Classification Model',
    usedFor:
      'Deep learning based HSL classification with preprocessing, model training, prediction analysis, and classification optimization.',
  },
];

export const aiPlaygroundPrompts = [
  {
    id: 'noise-reduction',
    label: 'Noise Reduction using Deep Learning',
    system: 'Audio/Video · Deep learning',
    prompt:
      'AI-based deep learning system capable of reducing unwanted noise from audio, video, and live video streams with real-time processing and media enhancement.',
    response: `Project focus: learned denoising for noisy media.

Scope covers audio waveforms, encoded video frames, and live capture paths where latency budgets are tight. The pipeline emphasizes real-time inference so streams stay watchable while noise is suppressed—not just offline batch cleanup.

Media enhancement sits alongside reduction: normalize dynamics where helpful, preserve speech intelligibility, and avoid smearing fine detail when the model clamps high-frequency junk.

Good fit when you need production-minded ML: measurable SNR gains, bounded GPU/CPU cost, and a clear story from dataset → training → deployment.`,
  },
  {
    id: 'freelance-frontend',
    label: 'Freelance Frontend Development',
    system: 'Product UI · React stack',
    prompt:
      'Built responsive modern websites for freelance clients using React.js, Tailwind CSS, JavaScript, Framer Motion, and modern UI/UX practices.',
    response: `Client work centered on fast, responsive marketing and product surfaces.

Stack: React.js, Tailwind CSS, JavaScript, and Framer Motion—composition-first components, tokenized spacing, and accessible patterns out of the box.

UX habits: mobile-first breakpoints, predictable navigation, and hover/focus states that feel intentional rather than decorative.

Delivery: tight handoffs with readable code structure so iterations stay cheap when copy, sections, or brand accents change mid-project.`,
  },
  {
    id: 'hsl-classification',
    label: 'HSL Classification using Deep Learning',
    system: 'Vision · HSL modeling',
    prompt:
      'Developed a deep learning based HSL classification system with data preprocessing, model training, prediction analysis, and classification optimization.',
    response: `End-to-end HSL classification with a disciplined deep learning workflow.

Preprocessing: clean inputs, balance classes where skewed, and stabilize hue/saturation/lightness representations before training.

Training loop: monitor convergence, watch for overfit on thin slices of the color space, and checkpoint models when validation quality plateaus.

Prediction & analysis: inspect confusion structure, surface systematic errors (e.g., low-light hues), and trace them back to data or augmentations.

Optimization: refine augmentations, learning rates, and architecture choices until classification margins improve without blowing up inference cost.`,
  },
];
