"use client";
import { motion } from "framer-motion";
import { 
    Facebook,
    Instagram,
    InstagramIcon,
    Linkedin,
    Mail
 } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-white px-6 md:px-16 py-12 border-t border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8"
      >
        {/* Logo Section */}
        <div className="space-y-3 col-span-2">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            PGLoom
          </h1>
          <p className="text-sm text-gray-400">
            Rent. Room. Routine. Sorted. Discover and manage your PG living with
            ease.
          </p>
        </div>
        {/* <InstagramIcon className="col-span-2 md:col-span-1 text-purple-500 w-8 h-8" /> */}

        {/* Quick Links */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white underline decoration-purple-500 decoration-2 underline-offset-4">
            Quick Links
          </h2>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/features" className="hover:text-white">Features</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white underline decoration-blue-500 decoration-2 underline-offset-4">
            Get in Touch
          </h2>
          <div className="flex items-center gap-3 text-gray-300 text-sm">
            <Mail size={18} /> hello@pgloom.in
          </div>
          <div className="flex gap-4 pt-2">
            <a href="#" className="hover:text-purple-400">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-blue-400">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-sky-400">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </motion.div>

      <div className="pt-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} PGLoom. All rights reserved.
      </div>
    </footer>
  );
};
