"use client";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";

export function HeroHighlightMain() {
  return (
    <HeroHighlight
    className="bg-transparent text-white">
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-center leading-snug text-white dark:text-white px-4 max-w-5xl mx-auto"
      >
        Rent. Room. Routine.{" "}
        <Highlight className="text-indigo-400 dark:text-indigo-400">
          Sorted.
        </Highlight>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 text-lg sm:text-xl text-center text-zinc-300 dark:text-zinc-300 max-w-3xl mx-auto px-4"
      >
        PGLoom is your all-in-one PG management platform — built for tenants,
        PG owners, and modern living. Simplify payments, rooms, meals,
        complaints, and more — all in one place.
      </motion.p>
    </HeroHighlight>
  );
}
