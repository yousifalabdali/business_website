"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Headline that rises in word by word. Splits on words only: splitting
 * Arabic into letters would break the joined glyph forms.
 */
export function KineticHeading({
  text,
  as: Tag = "h1",
  className,
}: {
  text: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);
  const MotionTag = Tag === "h1" ? motion.h1 : motion.h2;

  return (
    <MotionTag
      className={className}
      aria-label={text}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.07 }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="-mb-[0.2em] inline-block overflow-hidden pb-[0.32em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "105%", opacity: 0 },
              show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </MotionTag>
  );
}
