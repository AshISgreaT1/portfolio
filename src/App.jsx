import { lazy, Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import Footer from './components/Footer.jsx';
import AnimatedBackground from './components/AnimatedBackground.jsx';
import CursorGlow from './components/CursorGlow.jsx';

const About = lazy(() => import('./components/About.jsx'));
const Intro = lazy(() => import('./components/Intro.jsx'));
const Skills = lazy(() => import('./components/Skills.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'));

export default function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-slate-100 selection:bg-cyanGlow selection:text-ink">
      <LoadingScreen />
      <AnimatedBackground />
      
      {/* Grid Background */}
      <div className="fixed inset-0 -z-20 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:72px_72px] pointer-events-none" />
      
      {/* Gradient overlays */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>
      
      <CursorGlow />
      <Navbar />
      
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Intro />
          <Skills />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function SectionFallback() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto flex max-w-6xl items-center justify-center py-24 text-sm text-slate-400"
    >
      Preparing portfolio sections...
    </motion.div>
  );
}
