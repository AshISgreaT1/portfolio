import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { LenisProvider } from './components/LenisProvider.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import Footer from './components/Footer.jsx';
import AnimatedBackground from './components/AnimatedBackground.jsx';
import CursorGlow from './components/CursorGlow.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';

const About = lazy(() => import('./components/About.jsx'));
const Intro = lazy(() => import('./components/Intro.jsx'));
const Skills = lazy(() => import('./components/Skills.jsx'));
const AiPlayground = lazy(() => import('./components/AiPlayground.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'));

export default function App() {
  return (
    <LenisProvider>
      <div className="min-h-screen overflow-x-hidden bg-ink text-slate-100 selection:bg-cyanGlow selection:text-ink">
        <LoadingScreen />
        <ScrollProgress />
        <AnimatedBackground />

        <div className="fixed inset-0 -z-20 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:72px_72px] pointer-events-none" />

        <div className="fixed inset-0 -z-20 pointer-events-none">
          <div className="absolute top-0 left-0 h-[min(520px,70vw)] w-[min(520px,70vw)] rounded-full bg-cyan-500/6 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[min(520px,70vw)] w-[min(520px,70vw)] rounded-full bg-purple-500/6 blur-3xl" />
        </div>

        <CursorGlow />
        <Navbar />

        <main>
          <Hero />
          <Suspense fallback={<SectionFallback />}>
            <About />
            <Intro />
            <Skills />
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
      className="mx-auto flex max-w-6xl items-center justify-center py-24 text-sm text-slate-400"
    >
      Preparing portfolio sections…
    </motion.div>
  );
}
