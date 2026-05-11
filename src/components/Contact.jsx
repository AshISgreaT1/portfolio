import { motion } from 'framer-motion';
import { Code2, Network, Mail, Send } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { profile } from '../data/portfolio.js';

export default function Contact() {
  return (
    <section id="contact" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Contact" title="Let us build something useful." >
          The form is UI-ready. Connect it to Formspree, Netlify Forms, or your own backend when you deploy.
        </SectionHeading>
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-[2rem] border border-white/10 bg-panel p-8 shadow-card backdrop-blur-xl">
            <h3 className="font-display text-3xl font-bold text-white">Available for internships</h3>
            <p className="mt-4 leading-8 text-slate-400">
              I am especially interested in frontend, full-stack, and creative engineering roles where I can work closely with designers and product engineers.
            </p>
            <a href={`mailto:${profile.email}`} className="mt-6 inline-flex items-center gap-3 text-cyanGlow">
              <Mail size={18} /> {profile.email}
            </a>
            <div className="mt-8 flex gap-3">
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/10 text-white hover:text-cyanGlow"><Code2 size={18} /></a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/10 text-white hover:text-cyanGlow"><Network size={18} /></a>
            </div>
          </motion.div>
          <motion.form initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-card backdrop-blur-xl" onSubmit={(event) => event.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-slate-400">Name<input className="mt-2 w-full rounded-2xl border border-white/10 bg-ink/50 px-4 py-3 text-white outline-none transition focus:border-cyanGlow/60" placeholder="Your name" /></label>
              <label className="text-sm text-slate-400">Email<input className="mt-2 w-full rounded-2xl border border-white/10 bg-ink/50 px-4 py-3 text-white outline-none transition focus:border-cyanGlow/60" placeholder="you@company.com" type="email" /></label>
            </div>
            <label className="mt-4 block text-sm text-slate-400">Message<textarea className="mt-2 min-h-36 w-full rounded-2xl border border-white/10 bg-ink/50 px-4 py-3 text-white outline-none transition focus:border-cyanGlow/60" placeholder="Tell me about the internship or project..." /></label>
            <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyanGlow px-6 py-3 text-sm font-bold text-ink transition hover:-translate-y-1 hover:bg-white" type="submit">
              <Send size={16} /> Send message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
