"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ArticleItem {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
}

const articlesList: ArticleItem[] = [
  {
    slug: "token-economy-ux",
    title: "Designing for the Token Economy",
    category: "AI UX & SYSTEM DESIGN",
    readTime: "6 min read",
    date: "May 2026",
    summary: "How top tech companies handle the cognitive load and token budgets of real-time AI generation."
  },
  {
    slug: "vibe-coding-security",
    title: "Vibe Coding Is Powerful — But Is It Safe?",
    category: "Vibe Coding",
    readTime: "5 min read",
    date: "May 2026",
    summary: "45% of AI-generated code has security flaws. The real skill is knowing when to trust it and how to audit."
  },
  {
    slug: "shadow-ai-healthcare-risk",
    title: "Shadow AI is a Hospital's Biggest Hidden Risk",
    category: "Healthcare × AI",
    readTime: "6 min read",
    date: "April 2026",
    summary: "Staff are using unauthorized AI tools at work — and health systems are scrambling to secure sensitive patient data workflows."
  },
  {
    slug: "agentic-ai-development",
    title: "The Rise of Agentic AI in Development",
    category: "AI Agents",
    readTime: "5 min read",
    date: "April 2026",
    summary: "AI no longer waits for prompts — it plans, codes, tests, and deploys autonomously, shifting the digital canvas."
  },
  {
    slug: "ai-design-partner",
    title: "AI is the New Design Partner",
    category: "AI DESIGN",
    readTime: "4 min read",
    date: "March 2026",
    summary: "How AI tools are shifting designers from makers to decision-makers, altering layout loops and systems."
  }
];

export default function AllInsightsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-48 pb-32 px-6 md:px-12 lg:px-24 overflow-hidden relative">
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

      {/* Main Title Hero */}
      <div className="w-full max-w-[1400px] mx-auto text-center mb-24 md:mb-32 relative z-10">
        <motion.h1
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="text-6xl md:text-8xl xl:text-[9.5rem] font-bold tracking-tight uppercase font-heading select-none text-white"
        >
          Insights
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
          <div>/ REFLECTIONS & WRITING</div>
          <div>N. 04</div>
        </motion.div>
      </div>

      {/* Articles List Stack */}
      <div className="w-full max-w-[1400px] mx-auto relative z-10 flex flex-col">
          {articlesList.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/insights/${article.slug}`}
                className="group border-b border-white/10 py-12 px-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 transition-colors duration-350 hover:bg-white/[0.01] block"
              >
                {/* Left Side: Meta + Title */}
                <div className="max-w-2xl">
                  <div className="flex items-center gap-4 text-[10px] font-semibold tracking-widest text-white/50 uppercase select-none mb-4 group-hover:text-white transition-colors duration-300">
                    <span className="px-3 py-1 border border-white/10 rounded-full bg-white/5">
                      {article.category}
                    </span>
                    <span>{article.date}</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3 transition-all duration-300 group-hover:[text-shadow:0_0_8px_rgba(255,255,255,0.4)]">
                    {article.title}
                  </h2>

                  <p className="text-sm text-white/50 leading-relaxed font-light">
                    {article.summary}
                  </p>
                </div>

                {/* Right Side: Read Time + Custom Hover Arrow */}
                <div className="flex items-center gap-6 self-end md:self-center">
                  <span className="text-xs text-white/30 font-mono group-hover:text-white/60 transition-colors">
                    {article.readTime}
                  </span>

                  {/* Premium circular arrow */}
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </main>
    );
  }
