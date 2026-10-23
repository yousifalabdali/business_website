"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Dict } from "@/lib/i18n";

// Both languages have the same number of steps, so the scroll math can use a constant.
const STEP_COUNT = 4;

/** Pinned section: scrolling advances through the steps of working together. */
export function Story({ t }: { t: Dict["story"] }) {
  const STEPS = t.steps;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  if (reduce) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <h2 className="text-display mb-12">{t.title}</h2>
        <ol className="grid gap-8 md:grid-cols-2">
          {STEPS.map((s) => (
            <li key={s.title} className="glass rounded-3xl p-8">
              <p className="text-3xl font-bold text-accent">{s.title}</p>
              <p className="mt-3 text-lg leading-loose text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section ref={ref} style={{ height: `${STEPS.length * 90}vh` }} className="relative">
      <div className="sticky top-0 mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-center px-4 py-24 sm:px-6">
        <h2 className="mb-12 text-sm font-medium text-muted">{t.title}</h2>
        <div className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-20">
          <div className="flex gap-6">
            <div className="relative w-px bg-border" aria-hidden>
              <motion.div
                className="absolute inset-x-0 top-0 h-full origin-top bg-accent shadow-[0_0_12px_rgb(var(--glow))]"
                style={{ scaleY: scrollYProgress }}
              />
            </div>
            <ol className="grid gap-3">
              {STEPS.map((s, i) => (
                <StepLabel key={s.title} i={i} title={s.title} progress={scrollYProgress} />
              ))}
            </ol>
          </div>
          <div className="relative min-h-[220px]">
            {STEPS.map((s, i) => (
              <StepBody key={s.title} i={i} body={s.body} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function range(i: number) {
  const n = STEP_COUNT;
  return { start: i / n, end: (i + 1) / n };
}

// Scroll-linked animations reject keyframe offsets outside [0, 1].
const clamp = (stops: number[]) => stops.map((v) => Math.min(1, Math.max(0, v)));

function StepLabel({ i, title, progress }: { i: number; title: string; progress: MotionValue<number> }) {
  const { start, end } = range(i);
  const first = i === 0;
  const last = i === STEP_COUNT - 1;
  const opacity = useTransform(
    progress,
    clamp([start - 0.05, start, end - 0.02, end]),
    [first ? 1 : 0.25, 1, 1, last ? 1 : 0.25],
  );
  return (
    <motion.li style={{ opacity }} className="text-display leading-none">
      {title}
    </motion.li>
  );
}

function StepBody({ i, body, progress }: { i: number; body: string; progress: MotionValue<number> }) {
  const { start, end } = range(i);
  const first = i === 0;
  const last = i === STEP_COUNT - 1;
  const at = clamp([start - 0.04, start + 0.02, end - 0.04, end]);
  const opacity = useTransform(progress, at, [first ? 1 : 0, 1, 1, last ? 1 : 0]);
  const y = useTransform(progress, at, [first ? 0 : 30, 0, 0, last ? 0 : -30]);
  return (
    <motion.p
      style={{ opacity, y }}
      className="glass absolute inset-0 flex items-center rounded-3xl p-8 text-xl leading-loose sm:p-10 sm:text-2xl"
    >
      {body}
    </motion.p>
  );
}
