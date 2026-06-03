import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { LenisProvider } from './components/LenisProvider.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import Footer from './components/Footer.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import AnimatedBackground from './components/AnimatedBackground.jsx';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion.js';

const About = lazy(() => import('./components/About.jsx'));
const Intro = lazy(() => import('./components/Intro.jsx'));
const Skills = lazy(() => import('./components/Skills.jsx'));
const Projects = lazy(() => import('./components/Projects.jsx'));
const Experience = lazy(() => import('./components/Experience.jsx'));
const AiPlayground = lazy(() => import('./components/AiPlayground.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'));

export default function App() {
  const reduced = usePrefersReducedMotion();

  return (
    <LenisProvider>
      <div className="min-h-screen overflow-x-hidden bg-ink text-slate-100 selection:bg-cyanGlow/30 selection:text-white">
        <LoadingScreen />
        <ScrollProgress />
        <AnimatedBackground />
        <Navbar />

        {/* Noise Overlay */}
        {!reduced && (
          <div className="noise-overlay pointer-events-none fixed inset-0 z-[9999] opacity-[0.025]" />
        )}

        {/* Ambient Background Glows */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <div className="absolute top-0 left-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyanGlow/5 blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] translate-x-1/4 rounded-full bg-violetGlow/5 blur-[120px]" />
        </div>

        <main>
          <Hero />
          <Suspense fallback={<SectionFallback />}>
            <About />
            <Intro />
            <Skills />
            <Projects />
            <Experience />
            <AiPlayground />
            <Contact />
          </Suspense>
        </main>

        <Footer />
      </div>
    </LenisProvider>
  );
}

function SectionFallback() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto flex min-h-screen max-w-6xl items-center justify-center py-24 text-sm text-slate-400"
    >
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-cyanGlow/30 border-t-cyanGlow" />
        Loading content...
      </div>
    </motion.div>
  );
}
