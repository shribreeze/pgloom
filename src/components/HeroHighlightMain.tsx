"use client";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { Button } from "./ui/button";
import Link from "next/link";
// import { Link } from "lucide-react";

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
      <div className="text-center mt-8">
        <Link href="/signup">
        <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-base font-semibold leading-6 text-white inline-block">
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-4 md:py-4 md:px-8 ring-1 ring-white/10 ">
          <span>{`Get Started`}</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10.75 8.75L14.25 12L10.75 15.25"
              ></path>
          </svg>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
        </button>
        </Link>
      </div>
      </motion.p>
    </HeroHighlight>
  );
}
