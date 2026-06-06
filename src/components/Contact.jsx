import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Download, Mail, MapPin, Network, Send, Sparkles } from 'lucide-react';
import { profile } from '../data/portfolio.js';
import { useGsapReveal } from '../hooks/useGsapReveal.js';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const scope = useGsapReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${formState.name || 'visitor'}`);
    const body = encodeURIComponent(`${formState.message}\n\nReply to: ${formState.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section ref={scope} id="contact" className="relative min-h-screen snap-start px-4 py-24 md:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-cyanGlow/7 blur-[130px]" />
        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-violetGlow/8 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div data-reveal className="mb-14 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyanGlow/30 bg-cyanGlow/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyanGlow">
            <Sparkles className="h-3.5 w-3.5" />
            Contact
          </div>
          <h2 className="font-display text-4xl font-bold leading-[0.98] text-white md:text-6xl">
            Let us build
            <br />
            <span className="bg-gradient-to-r from-cyanGlow via-violetGlow to-pinkGlow bg-clip-text text-transparent">
              something useful.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Open to full stack internships, collaboration, backend or UI work, and learning-focused engineering teams.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal className="luxury-panel rounded-3xl p-7 md:p-9">
            <h3 className="font-display text-3xl font-bold text-white">Reach me directly</h3>
            <p className="mt-4 leading-8 text-slate-300">
              Send an internship brief, project idea, or role description. I respond best when the message includes the
              role, expected stack, and what kind of contribution you need.
            </p>

            <div className="mt-8 space-y-3">
              <a className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-slate-200 transition hover:border-cyanGlow/45 hover:bg-cyanGlow/8" href={`mailto:${profile.email}`}>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyanGlow/10 text-cyanGlow">
                  <Mail size={18} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.25em] text-slate-500">Email</span>
                  <span className="font-medium">{profile.email}</span>
                </span>
              </a>
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-slate-200">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-violetGlow/10 text-violetGlow">
                  <MapPin size={18} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.25em] text-slate-500">Location</span>
                  <span className="font-medium">{profile.location}</span>
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a className="ripple-button relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyanGlow/50 hover:bg-cyanGlow/10" href={profile.socials.github} target="_blank" rel="noreferrer">
                <Code2 size={16} />
                GitHub
              </a>
              <a className="ripple-button relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyanGlow/50 hover:bg-cyanGlow/10" href={profile.socials.linkedin} target="_blank" rel="noreferrer">
                <Network size={16} />
                LinkedIn
              </a>
              <a className="ripple-button relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyanGlow to-violetGlow px-5 py-3 text-sm font-semibold text-white" href={profile.resume} download>
                <Download size={16} />
                Resume
              </a>
            </div>
          </div>

          <motion.form data-reveal className="luxury-panel rounded-3xl p-7 md:p-9" onSubmit={handleSubmit} whileHover={{ y: -4 }}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Name</span>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyanGlow/55 focus:bg-white/[0.07]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyanGlow/55 focus:bg-white/[0.07]"
                />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Message</span>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Tell me about the role, project, or collaboration..."
                rows={7}
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyanGlow/55 focus:bg-white/[0.07]"
              />
            </label>
            <motion.button
              type="submit"
              className="ripple-button relative mt-5 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyanGlow via-violetGlow to-cyanGlow bg-[length:200%_100%] px-6 py-4 text-sm font-bold text-white transition hover:bg-[position:100%_0]"
              whileTap={{ scale: 0.99 }}
            >
              <Send size={18} />
              Send message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
