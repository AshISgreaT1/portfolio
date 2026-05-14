import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Cpu, Layers, Sparkles, Terminal } from 'lucide-react';
import { aiPlaygroundModels, aiPlaygroundPrompts } from '../data/portfolio.js';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

function streamText(full, setOut, reduced, onDone) {
  if (reduced) {
    setOut(full);
    onDone?.();
    return () => {};
  }
  let i = 0;
  let cancelled = false;
  const id = window.setInterval(() => {
    if (cancelled) return;
    i += 2;
    setOut(full.slice(0, i));
    if (i >= full.length) {
      window.clearInterval(id);
      if (!cancelled) onDone?.();
    }
  }, 18);
  return () => {
    cancelled = true;
    window.clearInterval(id);
  };
}

export default function AiPlayground() {
  const reduced = usePrefersReducedMotion();
  const [activeModelId, setActiveModelId] = useState(aiPlaygroundModels[0].id);
  const [activeId, setActiveId] = useState(aiPlaygroundPrompts[0].id);
  const [output, setOutput] = useState('');
  const [busy, setBusy] = useState(false);

  const activeModel = useMemo(
    () => aiPlaygroundModels.find((m) => m.id === activeModelId) ?? aiPlaygroundModels[0],
    [activeModelId]
  );

  const active = useMemo(
    () => aiPlaygroundPrompts.find((p) => p.id === activeId) ?? aiPlaygroundPrompts[0],
    [activeId]
  );

  const fakeResponse = useCallback(
    (p) => {
      const header = `[${activeModel.label}] · ${p.system}\n\n`;
      const body = p.response ?? p.prompt;
      return header + body;
    },
    [activeModel.label]
  );

  useEffect(() => {
    let cleanup = () => {};
    setBusy(true);
    setOutput('');
    cleanup = streamText(fakeResponse(active), setOutput, reduced, () => setBusy(false));
    return () => cleanup();
  }, [active, fakeResponse, reduced, activeModelId]);

  return (
    <section id="lab" className="relative scroll-mt-28 px-4 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div className="absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(79,220,255,0.14),transparent_62%)] blur-2xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="mb-12 max-w-3xl"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyanGlow">AI Lab</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            AI Engineering Playground — Real Projects, Real Systems.
          </h2>
          <p className="mt-4 max-w-2xl text-slate-400">
            An interactive showcase of my deep learning systems, frontend development work, and AI-driven projects with futuristic UI, smooth motion, and modern engineering design.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(12,18,38,0.92),rgba(5,8,22,0.88))] p-6 shadow-card backdrop-blur-2xl sm:p-10"
        >
          <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                  <Terminal size={14} className="text-cyanGlow" />
                  Session
                </span>
                {busy && !reduced && (
                  <motion.span
                    layout
                    className="h-2 w-2 rounded-full bg-cyanGlow"
                    animate={{ opacity: [0.35, 1, 0.35] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                  />
                )}
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Model</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {aiPlaygroundModels.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveModelId(m.id)}
                    className={`min-w-0 flex-1 basis-full rounded-2xl border px-4 py-2.5 text-left text-xs font-semibold leading-snug transition sm:basis-[calc(50%-0.25rem)] lg:basis-[calc(33.333%-0.34rem)] ${
                      activeModelId === m.id
                        ? 'border-cyanGlow/50 bg-cyanGlow/15 text-cyanGlow shadow-neon'
                        : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-ink/40 p-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Layers size={14} className="text-cyanGlow/80" />
                  <span className="uppercase tracking-[0.2em]">Used for</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{activeModel.usedFor}</p>
              </div>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Scenarios</p>
              <div className="mt-3 space-y-2">
                {aiPlaygroundPrompts.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActiveId(p.id)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      activeId === p.id
                        ? 'border-cyanGlow/40 bg-white/[0.06] text-white'
                        : 'border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className="pr-2 font-medium leading-snug">{p.label}</span>
                    <Sparkles size={16} className={activeId === p.id ? 'text-cyanGlow' : 'text-slate-500'} />
                  </button>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-ink/40 p-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Cpu size={14} className="text-cyanGlow/80" />
                  <span className="uppercase tracking-[0.2em]">Context</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{active.prompt}</p>
              </div>
            </div>

            <div className="relative min-h-[280px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#070b18]/80 shadow-inner">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <Bot size={16} className="text-cyanGlow" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Assistant</span>
              </div>
              <div className="relative p-5 sm:p-6">
                <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:28px_28px]" />
                <AnimatePresence mode="wait">
                  <motion.pre
                    key={`${activeId}-${activeModelId}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35 }}
                    className="relative whitespace-pre-wrap font-mono text-[13px] leading-7 text-slate-200 sm:text-sm"
                  >
                    {output}
                    {!reduced && busy && <span className="ml-1 inline-block h-4 w-1.5 animate-pulse bg-cyanGlow/80 align-middle" />}
                  </motion.pre>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
