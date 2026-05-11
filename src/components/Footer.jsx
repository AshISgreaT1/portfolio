import { profile } from '../data/portfolio.js';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-slate-500">
      <p>Built with React, Three.js, and a recruiter-friendly amount of neon.</p>
      <p className="mt-2">© 2026 {profile.name}. All rights reserved.</p>
    </footer>
  );
}
