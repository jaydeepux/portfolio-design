"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Desktop Chatbot Design for Live Assistance",
    year: "/2020",
    img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "AI Search Results - Enhancement",
    year: "/2019",
    img: "https://images.unsplash.com/photo-1684369175833-4b445ad6bfb5?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "AI Search - Analytics Dashboard",
    year: "/2019",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Chatbot UI Designs for the Webpage",
    year: "/2019",
    img: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1200",
  }
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-48 pb-32 px-6 md:px-12 lg:px-24 overflow-hidden relative">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

      {/* Main Title Hero */}
      <div className="w-full max-w-[1400px] mx-auto text-center mb-24 md:mb-32 relative z-10">
        <motion.h1
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="text-6xl md:text-8xl xl:text-[9.5rem] font-bold tracking-tight uppercase font-heading select-none text-white"
        >
          Work
        </motion.h1>
      </div>

      {/* Section Divider & Metadata Header Row */}
      <div className="w-full max-w-[1400px] mx-auto mb-16 relative z-10">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="w-full border-t border-white/10 mb-8 origin-left"
        ></motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-between items-center text-[11px] tracking-widest text-white/80 uppercase font-medium"
        >
          <div>/ PROJECT</div>
          <div>N. 01</div>
        </motion.div>
      </div>

      {/* Two Column Projects Grid */}
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 relative z-10">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 + idx * 0.15, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col gap-5 group cursor-pointer"
          >
            {/* Image Aspect ratio container */}
            <div className="w-full aspect-[16/10] bg-[#111111] border border-white/5 overflow-hidden relative shadow-2xl transition-colors duration-300 group-hover:border-white/20">
              {/* Image zoom on hover */}
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover block transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
              />
            </div>

            {/* Project Metadata details */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-[15px] font-medium text-white/85 transition-all duration-300 group-hover:text-white [text-shadow:0_0_0_transparent] group-hover:[text-shadow:0_0_8px_rgba(255,255,255,0.3)]">
                {project.title}
              </span>
              <span className="text-[13px] font-light text-white/40 tracking-[0.06em]">
                {project.year}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
