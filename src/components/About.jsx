import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import { profile } from '../data/portfolio.js';

export default function About() {
  return (
    <section id="about" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="About" title="Curious builder, practical teammate.">
          From Kota to Gwalior, I am building my lane across frontend, AI, cybersecurity, and networks.
        </SectionHeading>
        <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-white/10 bg-panel p-8 shadow-card backdrop-blur-xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-cyanGlow">Currently based in</p>
            <h3 className="mt-3 font-display text-3xl font-bold text-white">{profile.location}</h3>
            <p className="mt-5 leading-8 text-slate-400">
              I am Ayush Hada, originally from {profile.hometown}, currently studying Electronics and Telecommunication Engineering at{' '}
              <a href={profile.college.url} target="_blank" rel="noreferrer" className="text-cyanGlow underline-offset-4 hover:underline">
                {profile.college.name}
              </a>
              . I am in my 6th semester, curious about AI, cybersecurity, networks, and building frontend projects that actually feel good to use.
            </p>
            <p className="mt-4 leading-8 text-slate-400">
              My vibe is simple: learn fast, stay curious, and turn ideas into clean, working things. I enjoy exploring how tech connects across layers, from UI and databases to Linux tools, network concepts, and AI workflows.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {['Frontend projects with polish', 'AI/ML curiosity and experiments', 'Cybersecurity and Kali Linux basics', 'Electronics, telecom, and networks'].map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-cyanGlow/30">
                <div className="mb-5 h-2 w-16 rounded-full bg-gradient-to-r from-cyanGlow to-violetGlow" />
                <h4 className="font-display text-xl font-semibold text-white">{item}</h4>
                <p className="mt-3 text-sm leading-7 text-slate-500">A practical mix of college fundamentals, self-learning, and hands-on project curiosity.</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

