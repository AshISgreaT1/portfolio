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
    <section id="lab" className="relative min-h-screen snap-start scroll-mt-28 px-4 py-24 md:py-32 lg:py-40">
      {/* Background Accents */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyanGlow/5 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-pinkGlow/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyanGlow/30 bg-cyanGlow/8 px-4 py-1.5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles className="h-3.5 w-3.5 text-cyanGlow" />
            <span className="text-xs font-semibold uppercase tracking-widest text-cyanGlow">AI Lab</span>
          </motion.div>

          <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            AI Engineering
            <br />
            <span className="bg-gradient-to-r from-cyanGlow via-violetGlow to-pinkGlow bg-clip-text text-transparent">
              Playground
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Interactive showcase of deep learning systems, frontend development work, and AI-driven projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-6 shadow-2xl backdrop-blur-xl sm:p-10"
        >
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -right-32 top-0 h-72 w-72 rounded-full bg-violetGlow/10 blur-[100px]" />
          <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-cyanGlow/10 blur-[100px]" />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
            {/* Left Panel */}
            <div>
              {/* Session Badge */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
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

              {/* Model Selection */}
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Model</p>
              <div className="mb-6 flex flex-wrap gap-2">
                {aiPlaygroundModels.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveModelId(m.id)}
                    className={`min-w-0 flex-1 basis-full rounded-xl border px-4 py-3 text-left text-sm font-semibold leading-snug transition sm:basis-[calc(50%-0.25rem)] ${
                      activeModelId === m.id
                        ? 'border-cyanGlow/50 bg-cyanGlow/15 text-cyanGlow shadow-glow'
                        : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Model Info */}
              <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Layers size={14} className="text-cyanGlow/80" />
                  <span className="uppercase tracking-[0.2em]">Used for</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{activeModel.usedFor}</p>
              </div>

              {/* Scenario Selection */}
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Scenarios</p>
              <div className="mb-6 space-y-2">
                {aiPlaygroundPrompts.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActiveId(p.id)}
                    className={`flex w-full items-center justify-between rounded-xl border px-5 py-4 text-left text-sm transition ${
                      activeId === p.id
                        ? 'border-cyanGlow/40 bg-white/[0.06] text-white'
                        : 'border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className="font-medium leading-snug">{p.label}</span>
                    <Sparkles size={16} className={activeId === p.id ? 'text-cyanGlow' : 'text-slate-500'} />
                  </button>
                ))}
              </div>

              {/* Context */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Cpu size={14} className="text-cyanGlow/80" />
                  <span className="uppercase tracking-[0.2em]">Context</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{active.prompt}</p>
              </div>
            </div>

            {/* Right Panel - Output */}
            <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-[#030712]/80">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-4">
                <Bot size={18} className="text-cyanGlow" />
                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Assistant</span>
              </div>

              {/* Output */}
              <div className="relative p-6 sm:p-8">
                <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:28px_28px]" />
                <AnimatePresence mode="wait">
                  <motion.pre
                    key={`${activeId}-${activeModelId}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35 }}
                    className="relative whitespace-pre-wrap font-mono text-sm leading-7 text-slate-200"
                  >
                    {output}
                    {!reduced && busy && (
                      <span className="ml-1 inline-block h-4 w-1.5 animate-pulse bg-cyanGlow/80 align-middle" />
                    )}
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