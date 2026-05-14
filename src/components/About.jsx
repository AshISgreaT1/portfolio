import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import { profile } from '../data/portfolio.js';
import GlassmorphicCard from './GlassmorphicCard.jsx';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const highlights = [
    { title: 'Frontend Craftsmanship', desc: 'Building delightful, performant UI experiences with React, Tailwind, and modern web standards.' },
    { title: 'AI & ML Explorer', desc: 'Curious about AI applications, prompt engineering, and how machine learning is shaping the future.' },
    { title: 'Cybersecurity Enthusiast', desc: 'Learning security fundamentals with Kali Linux and understanding how systems can be protected.' },
    { title: 'Systems & Networks', desc: 'Fascinated by how systems communicate, network architectures, and electronics fundamentals.' }
  ];

  return (
    <section id="about" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="About" title="Curious builder, practical teammate.">
          From Kota to Gwalior, I&apos;m building expertise across frontend, AI, cybersecurity, and networks.
        </SectionHeading>

        <motion.div
          className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Left side - Main intro */}
          <motion.div variants={itemVariants}>
            <GlassmorphicCard className="h-full p-8">
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-300 mb-2">Based in</p>
                <h3 className="font-display text-3xl font-bold text-white mb-6">{profile.location}</h3>

                <div className="space-y-4">
                  <p className="leading-8 text-slate-300">
                    I&apos;m <span className="font-semibold text-cyan-300">Ayush Hada</span>, originally from {profile.hometown}, currently pursuing Electronics and Telecommunication Engineering at{' '}
                    <a href={profile.college.url} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold transition">
                      {profile.college.name}
                    </a>
                  </p>

                  <p className="leading-8 text-slate-300">
                    My philosophy: <em>Learn fast. Stay curious. Build things that matter.</em> I&apos;m fascinated by how technology spans from beautiful frontends to deep systems thinking—from responsive UI to Linux security to network protocols.
                  </p>

                  <p className="leading-8 text-slate-300">
                    Looking for internship and collaboration opportunities where I can contribute real value, learn from experienced engineers, and help build products that users love.
                  </p>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>

          {/* Right side - Highlights grid */}
          <motion.div
            className="grid gap-4 sm:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {highlights.map((item, idx) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
              >
                <motion.div
                  className="group h-full rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent p-6 backdrop-blur hover:border-cyan-400/50 transition-all duration-300 cursor-default"
                  whileHover={{ scale: 1.02, translateY: -4 }}
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-transparent to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none" />

                  <motion.div
                    className="relative mb-4 h-1 w-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '3rem' }}
                    transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
                  />

                  <h4 className="relative font-display text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>

                  <p className="relative mt-3 text-sm leading-6 text-slate-400 group-hover:text-slate-300 transition-colors">
                    {item.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

