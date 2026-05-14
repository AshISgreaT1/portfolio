import { motion } from 'framer-motion';
import { Code2, Network, Mail, Send } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { profile } from '../data/portfolio.js';
import { useState } from 'react';

export default function Contact() {
  const [hoveredField, setHoveredField] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! Connect this to Formspree or your backend.');
  };

  return (
    <section id="contact" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Contact" title="Let&apos;s build something incredible." >
          Reach out with opportunities, ideas, or just to chat about tech and design.
        </SectionHeading>

        <motion.div
          className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent p-8 shadow-card backdrop-blur hover:border-cyan-400/50 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-transparent to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none" />

            <div className="relative">
              <h3 className="font-display text-3xl font-bold text-white">
                Let&apos;s connect
              </h3>
              <p className="mt-4 leading-8 text-slate-300">
                I&apos;m actively looking for internship and collaboration opportunities. Interested in frontend, full-stack, AI, or creative engineering roles.
              </p>

              {/* Email */}
              <motion.a
                href={`mailto:${profile.email}`}
                className="mt-8 inline-flex items-center gap-3 rounded-lg px-4 py-3 bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-all group/email"
                whileHover={{ scale: 1.05 }}
              >
                <Mail size={18} className="group-hover/email:text-cyan-400 transition-colors" />
                <span>{profile.email}</span>
              </motion.a>

              {/* Social Links */}
              <div className="mt-8 flex gap-3">
                <motion.a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="GitHub"
                >
                  <Code2 size={18} />
                </motion.a>
                <motion.a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="LinkedIn"
                >
                  <Network size={18} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={itemVariants}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent p-8 shadow-card backdrop-blur overflow-hidden group"
            onSubmit={handleSubmit}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-transparent to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none" />

            <div className="relative space-y-5">
              {/* Name and Email fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Name Field */}
                <motion.div
                  onHoverStart={() => setHoveredField('name')}
                  onHoverEnd={() => setHoveredField(null)}
                  className="relative"
                >
                  <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                    Name
                  </label>
                  <motion.input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/[0.03] text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/[0.08]"
                    initial={{ borderColor: 'rgba(255,255,255,0.1)' }}
                    animate={{
                      borderColor:
                        hoveredField === 'name'
                          ? 'rgba(79, 220, 255, 0.3)'
                          : 'rgba(255,255,255,0.1)',
                    }}
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  onHoverStart={() => setHoveredField('email')}
                  onHoverEnd={() => setHoveredField(null)}
                  className="relative"
                >
                  <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                    Email
                  </label>
                  <motion.input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/[0.03] text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/[0.08]"
                    initial={{ borderColor: 'rgba(255,255,255,0.1)' }}
                    animate={{
                      borderColor:
                        hoveredField === 'email'
                          ? 'rgba(79, 220, 255, 0.3)'
                          : 'rgba(255,255,255,0.1)',
                    }}
                  />
                </motion.div>
              </div>

              {/* Message Field */}
              <motion.div
                onHoverStart={() => setHoveredField('message')}
                onHoverEnd={() => setHoveredField(null)}
                className="relative"
              >
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  Message
                </label>
                <motion.textarea
                  placeholder="Tell me about the opportunity, project, or just say hi!"
                  className="w-full min-h-32 px-4 py-3 rounded-lg border border-white/10 bg-white/[0.03] text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-400/50 focus:bg-white/[0.08] resize-none"
                  initial={{ borderColor: 'rgba(255,255,255,0.1)' }}
                  animate={{
                    borderColor:
                      hoveredField === 'message'
                        ? 'rgba(79, 220, 255, 0.3)'
                        : 'rgba(255,255,255,0.1)',
                  }}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full mt-6 relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white overflow-hidden group/btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 group-hover/btn:from-cyan-400 group-hover/btn:via-cyan-500 group-hover/btn:to-cyan-600 transition-all duration-300" />

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['0%', '100%'],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                />

                {/* Text */}
                <span className="relative flex items-center gap-2">
                  <Send size={16} />
                  Send message
                </span>
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
