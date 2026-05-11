import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import Footer from './components/Footer.jsx';

const About = lazy(() => import('./components/About.jsx'));
const Intro = lazy(() => import('./components/Intro.jsx'));
const Skills = lazy(() => import('./components/Skills.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'));

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-slate-100 selection:bg-cyanGlow selection:text-ink">
      <LoadingScreen />
      <div className="fixed inset-0 -z-10 bg-radial-grid" />
      <div className="fixed inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:72px_72px]" />
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
