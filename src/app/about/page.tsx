"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ExperienceItem {
  role: string;
  company: string;
  date: string;
  details: string;
  num: string;
  previousRoles?: {
    title: string;
    date: string;
    details: string;
  }[];
}

const experiences: ExperienceItem[] = [
  {
    role: "Lead Product Designer - UX",
    company: "WellStack, Bangalore",
    date: "Aug 2022 - Present",
    num: "/01",
    details: "As a Lead Product Designer, I lead the design vision for healthcare solutions, managing a team to deliver intuitive dashboards, including PowerBI dashboards and reports, data analytics interfaces, and seamless user experiences. My role involves planning tasks, mentoring designers, ensuring alignment with project goals, and overseeing the design of PowerBI dashboard reports.",
    previousRoles: [
      {
        title: "Sr. Product Designer - UX",
        date: "Aug 2022 - July 2024",
        details: "Handling the prodcut design for our healthcare solution, I create intuitive dashboards, data analytics interfaces, and reports to ensure a seamless user experience. My role includes UX research, iterative design improvements, setting brand standards, and crafting user-friendly interactions. By developing detailed flows and prototypes, I help build a modern data ecosystem that empowers healthcare organizations to make informed decisions."
      }
    ]
  },
  {
    role: "UX Designer",
    company: "Mindtree, Bangalore",
    date: "2021 - 2022",
    num: "/02",
    details: "Executed diverse B2B and B2C projects across domains, delivering effective websites, portals, and applications. Designed impactful PowerBI analytics dashboards for a major consumer goods corporation, enhancing product rating and review analytics across e-commerce platforms. Created user-friendly product and article webpages for a leading personal care brand, alongside marketing video edits for global markets including France and Thailand. Contributed to presales strategies for dashboard, app, and webpage designs."
  },
  {
    role: "UI/UX Designer",
    company: "OneOrigin Inc, Bangalore",
    date: "Oct 2018 - 2021",
    num: "/03",
    details: "Creating wireframes, prototypes, and user flows to communicate design concepts effectively, including for Chat AI product UI design and product user interaction UI design. Proficient in front-end languages for seamless implementation. Delivered animations for Voice AI and Chat AI, while also designing product analytics dashboards. Leveraging technology for effective client communication and project alignment.",
    previousRoles: [
      {
        title: "Associate UI/UX Designer",
        date: "Oct 2018 - July 2019",
        details: "Understanding OneOrigin's business goals and principles, I develop proficiency in UI/UX designing to meet project requirements. Creating wireframes, prototypes, user flows, and other visualizations, I ensure effective communication of design concepts, aligning with project objectives and enhancing user experience. Additionally, I produce collaterals for marketing purposes."
      }
    ]
  },
  {
    role: "Research Analyst",
    company: "Protocolleads Infotech, Kolhapur",
    date: "2016 - 2017",
    num: "/04",
    details: "Conducting thorough research to fulfill client needs and align with their marketing objectives, I deliver tailored information to clients, ensuring it meets their specific requirements and supports their marketing strategies effectively."
  }
];

interface EducationItem {
  degree: string;
  college: string;
}

const education: EducationItem[] = [
  {
    degree: "Bachelor’s Degree in <br/>UI/UX Design & Development",
    college: "ICAT Design & Media College (April 2026)"
  },
  {
    degree: "Higher Diploma in <br/>UI/UX Design",
    college: "Image Creative Education"
  },
  {
    degree: "Diploma in <br/>Computer Engineering",
    college: "Maharashtra State Board of Technical Education"
  }
];

interface AwardItem {
  title: string;
  issuer: string;
  link?: string;
}

const awards: AwardItem[] = [
  {
    title: "UI / UX Portfolio - Honor",
    issuer: "RR Donnelley - Metamorphix",
    link: "https://www.linkedin.com/in/jay-deep/overlay/Honor/292147689/treasury/?profileId=ACoAABNNlRcBxrbnddgDvFH-5L8hkG19Zui4cxA"
  },
  {
    title: "Hackathon Winner 2019",
    issuer: "OneOrigin"
  },
  {
    title: "Human-Centered Design",
    issuer: "University of California San Diego",
    link: "https://www.coursera.org/account/accomplishments/verify/JSLJH7ZEXWPY?utm_source=ln&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course"
  }
];

const Character = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
  const color = useTransform(progress, range, ["#404040", "#ffffff"]);
  return <motion.span style={{ color }}>{children}</motion.span>;
}

const ExperienceRow = ({
  exp,
  idx,
  total,
  timelineProgress
}: {
  exp: ExperienceItem;
  idx: number;
  total: number;
  timelineProgress: MotionValue<number>;
}) => {
  const isFirst = idx === 0;
  const isLast = idx === total - 1;

  // Map segment progress (completes immediately for the last card's 40px tail to end exactly on the dot)
  const segmentProgress = useTransform(
    timelineProgress,
    isLast
      ? [idx / total, (idx + 0.05) / total]
      : [idx / total, (idx + 1) / total],
    [0, 1]
  );

  // Highlight dot when progress enters the segment
  const dotBorderColor = useTransform(
    timelineProgress,
    [idx / total, (idx + 0.15) / total],
    ["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 1)"],
    { clamp: true }
  );

  const dotBg = useTransform(
    timelineProgress,
    [idx / total, (idx + 0.15) / total],
    ["rgba(10, 10, 10, 1)", "rgba(255, 255, 255, 1)"],
    { clamp: true }
  );

  const dotScale = useTransform(
    timelineProgress,
    [idx / total, (idx + 0.15) / total],
    [1, 1.25],
    { clamp: true }
  );

  return (
    <div className="w-full flex flex-row items-stretch group relative">
      {/* Left Timeline Bar Column */}
      <div className="w-8 md:w-16 flex flex-col items-center justify-start relative self-stretch select-none">
        {/* Dark Background Line Segment */}
        <div
          className={`absolute w-[1px] bg-white/10 left-1/2 -translate-x-1/2 ${isFirst ? "top-10 bottom-0" : isLast ? "top-0 h-10" : "top-0 bottom-0"
            }`}
        />

        {/* Active Highlighted Line Segment */}
        <motion.div
          style={{ scaleY: segmentProgress }}
          className={`absolute w-[1px] bg-white left-1/2 -translate-x-1/2 origin-top ${isFirst ? "top-10 bottom-0" : isLast ? "top-0 h-10" : "top-0 bottom-0"
            }`}
        />

        {/* Stepping Milestone Dot */}
        <motion.div
          style={{
            left: "50%",
            x: "-50%",
            borderColor: dotBorderColor,
            backgroundColor: dotBg,
            scale: dotScale
          }}
          className="absolute top-10 w-3 h-3 rounded-full z-10 border transition-shadow duration-300 group-hover:shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        />
      </div>

      {/* Right Content Column */}
      <div className="flex-1 py-10 pr-6 flex flex-col gap-6">
        {/* Top Header Row (Role, Company & Date) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-4 w-full">
          <div>
            <h4 className="text-xl md:text-2xl font-bold font-heading text-white tracking-wide transition-all duration-300 bg-clip-text bg-gradient-to-r from-white to-white group-hover:from-[#ff6b00] group-hover:to-[#0055ff] group-hover:text-transparent">
              {exp.role}
            </h4>
            <div className="text-[13px] text-white/50 mt-1 font-mono tracking-wider font-light">
              {exp.company}
            </div>
          </div>

          {/* Date timeline (aligned on the far right on desktop) */}
          <div className="font-mono text-[13px] text-white/40 tracking-wider md:text-right shrink-0">
            {exp.date}
          </div>
        </div>

        {/* Details & Progression (Spans 100% full-width all the way to the right) */}
        <div className="w-full">
          {/* Main Details Description */}
          <p className="text-white/70 text-sm md:text-base leading-[1.8] font-light tracking-wide w-full">
            {exp.details}
          </p>

          {/* Previous roles inside the company (Promotion path) */}
          {exp.previousRoles && (
            <div className="mt-8 flex flex-col gap-8 w-full">
              {exp.previousRoles.map((r, rIdx) => (
                <div key={rIdx} className="flex flex-col gap-2 group/sub cursor-pointer">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 w-full">
                    <h5 className="text-base md:text-lg font-bold font-heading text-white tracking-wide transition-all duration-300 bg-clip-text bg-gradient-to-r from-white to-white group-hover/sub:from-[#ff6b00] group-hover/sub:to-[#0055ff] group-hover/sub:text-transparent">
                      {r.title}
                    </h5>
                    <span className="text-[12px] font-mono text-white/40 tracking-wider shrink-0">
                      {r.date}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm md:text-base leading-[1.8] font-light tracking-wide w-full">
                    {r.details}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top Border Line with Gradient Hover */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#ff6b00] to-[#0055ff] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

export default function AboutPage() {

  // Scroll targets for text-reveal animations
  const section2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: s2Progress } = useScroll({
    target: section2Ref,
    offset: ["start 80%", "center center"]
  });

  const section3Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: s3Progress } = useScroll({
    target: section3Ref,
    offset: ["start 80%", "center center"]
  });

  // Dedicated timeline container ref and offset to animate vertical lifeline progress
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 60%", "end 60%"]
  });

  // Text contents for scroll-reveal
  const descText = "Lead Product Designer – UX | AI-Powered Experiences | Healthcare & Analytics Platforms | Human-Centered Design | Bangalore, India";
  const descAnimLength = "Lead Product Designer – UX | AI-Powered Experiences | Healthcare & Analytics Platforms | Human-Centered Design |".length;

  const expSubText = "My work experience designing digital products across AI, Healthcare, and Consumer focused industries.";
  const expAnimLength = "My work experience designing digital products".length;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-40 pb-32 overflow-hidden relative">
      {/* Decorative Background Grid */}
      <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">

        {/* ================= HERO SECTION ================= */}
        <section className="flex flex-col items-center justify-center min-h-[85vh] relative">
          {/* Massive Overlapping Name Title */}
          <div className="w-full text-center relative z-20 select-none translate-y-10">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="text-6xl md:text-8xl lg:text-[9vw] font-bold tracking-[-0.03em] font-heading leading-[0.82] text-white drop-shadow-2xl"
            >
              Jaydeep
            </motion.h1>
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="text-6xl md:text-8xl lg:text-[9vw] font-bold tracking-[-0.03em] font-heading leading-[0.82] text-white/95 mt-2"
            >
              Badadare
            </motion.h1>
          </div>

          {/* Portrait Graphic Silhouette Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="w-[85vw] max-w-[520px] aspect-[520/694.02] overflow-hidden relative mt-[-20px] md:mt-[-35px] lg:mt-[-50px] z-0 shadow-[0_24px_80px_rgba(0,0,0,0.8)] bg-[#151515]"
          >
            {/* Left to Right Expanding & Shrinking White wipe reveal block */}
            <motion.div
              initial={{ left: "0%", right: "100%" }}
              animate={{
                left: ["0%", "0%", "100%"],
                right: ["100%", "0%", "0%"]
              }}
              transition={{
                duration: 1.2,
                delay: 0.8,
                ease: [0.76, 0, 0.24, 1]
              }}
              className="absolute inset-y-0 bg-white z-20"
            />

            {/* Soft Landing Image */}
            <motion.img
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 1.4,
                ease: [0.76, 0, 0.24, 1]
              }}
              src="/aboutprofile.png"
              alt="Jaydeep Profile"
              className="w-full h-full object-cover block"
            />
          </motion.div>

          {/* Symmetrical Floating Side Info (Desktop / Tablet absolute at 60% of viewport line) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="absolute left-0 lg:left-8 top-[60%] -translate-y-1/2 hidden md:flex items-center gap-2 h-5 text-[11px] uppercase tracking-widest text-white/40 font-mono"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.35 6.75012H18.15M1.35 12.7501H18.15M0.75 9.75012C0.75 10.932 0.982792 12.1023 1.43508 13.1943C1.88738 14.2862 2.55031 15.2784 3.38604 16.1141C4.22177 16.9498 5.21392 17.6127 6.30585 18.065C7.39778 18.5173 8.5681 18.7501 9.75 18.7501C10.9319 18.7501 12.1022 18.5173 13.1942 18.065C14.2861 17.6127 15.2782 16.9498 16.114 16.1141C16.9497 15.2784 17.6126 14.2862 18.0649 13.1943C18.5172 12.1023 18.75 10.932 18.75 9.75012C18.75 7.36317 17.8018 5.07399 16.114 3.38616C14.4261 1.69833 12.1369 0.750122 9.75 0.750122C7.36305 0.750122 5.07387 1.69833 3.38604 3.38616C1.69821 5.07399 0.75 7.36317 0.75 9.75012Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M9.24967 0.750122C7.56501 3.44973 6.67188 6.56799 6.67188 9.75012C6.67188 12.9323 7.56501 16.0505 9.24967 18.7501M10.2497 0.750122C11.9343 3.44973 12.8275 6.56799 12.8275 9.75012C12.8275 12.9323 11.9343 16.0505 10.2497 18.7501" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            Based in Bengaluru
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="absolute right-0 lg:right-8 top-[60%] -translate-y-1/2 hidden md:flex items-center justify-end h-5 text-[11px] uppercase tracking-widest text-white/40 font-mono text-right"
          >
            8+ years in the game
          </motion.div>

          {/* Mobile Info Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="w-full flex flex-row justify-between items-center gap-6 mt-16 text-xs uppercase tracking-widest text-white/40 font-mono md:hidden"
          >
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.35 6.75012H18.15M1.35 12.7501H18.15M0.75 9.75012C0.75 10.932 0.982792 12.1023 1.43508 13.1943C1.88738 14.2862 2.55031 15.2784 3.38604 16.1141C4.22177 16.9498 5.21392 17.6127 6.30585 18.065C7.39778 18.5173 8.5681 18.7501 9.75 18.7501C10.9319 18.7501 12.1022 18.5173 13.1942 18.065C14.2861 17.6127 15.2782 16.9498 16.114 16.1141C16.9497 15.2784 17.6126 14.2862 18.0649 13.1943C18.5172 12.1023 18.75 10.932 18.75 9.75012C18.75 7.36317 17.8018 5.07399 16.114 3.38616C14.4261 1.69833 12.1369 0.750122 9.75 0.750122C7.36305 0.750122 5.07387 1.69833 3.38604 3.38616C1.69821 5.07399 0.75 7.36317 0.75 9.75012Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M9.24967 0.750122C7.56501 3.44973 6.67188 6.56799 6.67188 9.75012C6.67188 12.9323 7.56501 16.0505 9.24967 18.7501M10.2497 0.750122C11.9343 3.44973 12.8275 6.56799 12.8275 9.75012C12.8275 12.9323 11.9343 16.0505 10.2497 18.7501" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              Based in Bengaluru
            </div>
            <div>8+ years in the game</div>
          </motion.div>
        </section>

        {/* ================= DESCRIPTION & STATS SECTION ================= */}
        <section ref={section2Ref} className="py-24 relative">

          {/* Scroll-Revealed Subtitle Heading */}
          <h2 className="text-3xl md:text-5xl lg:text-[3rem] lg:leading-[1.25] font-semibold text-center tracking-[-0.02em] max-w-5xl mx-auto font-heading mb-16 select-none">
            {descText.split("").map((char, i) => {
              const isAnimated = i < descAnimLength;
              if (isAnimated) {
                const start = i / descAnimLength;
                const end = start + (1 / descAnimLength);
                return (
                  <Character key={i} progress={s2Progress} range={[start, end]}>
                    {char}
                  </Character>
                );
              } else {
                return <span key={i} className="text-[#404040]">{char}</span>;
              }
            })}
          </h2>

          {/* Download CV CTA */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-32"
          >
            <a
              href="/Jaydeep_Vijay_Badadare.pdf"
              download
              className="inline-flex items-center justify-center min-w-[180px] h-[62px] border border-white/20 hover:border-white transition-all duration-300 rounded-none bg-transparent hover:scale-[1.03] text-xs font-semibold uppercase tracking-widest text-white tracking-widest"
            >
              Download Resume
            </a>
          </motion.div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-16 md:gap-8 items-center justify-between text-center relative pt-12">

            {/* Stat 1 */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center col-span-1"
            >
              <div className="text-6xl md:text-8xl font-bold font-heading tracking-tight text-white mb-3">08+</div>
              <div className="text-[10px] tracking-widest uppercase text-white/40 font-mono">Years of Experience</div>
            </motion.div>

            {/* Decorator plus */}
            <div className="hidden md:block text-white/10 text-xl font-light font-mono select-none col-span-1">+</div>

            {/* Stat 2 */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center col-span-1"
            >
              <div className="text-6xl md:text-8xl font-bold font-heading tracking-tight text-white mb-3">07+</div>
              <div className="text-[10px] tracking-widest uppercase text-white/40 font-mono">UI/UX Product Design</div>
            </motion.div>

            {/* Decorator plus */}
            <div className="hidden md:block text-white/10 text-xl font-light font-mono select-none col-span-1">+</div>

            {/* Stat 3 */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center col-span-1"
            >
              <div className="text-6xl md:text-8xl font-bold font-heading tracking-tight text-white mb-3">01+</div>
              <div className="text-[10px] tracking-widest uppercase text-white/40 font-mono">Research Analyst</div>
            </motion.div>

          </div>
        </section>

        {/* ================= WORK EXPERIENCE SECTION ================= */}
        <section ref={section3Ref} className="py-24 border-t border-white/10 relative">

          {/* Mini Metadata Header */}
          <div className="flex justify-between items-center text-[11px] tracking-widest text-white/40 uppercase font-mono font-medium mb-12">
            <div>/ Work Experience</div>
          </div>

          {/* Scroll-linked subtitle heading */}
          <h3 className="text-3xl md:text-5xl lg:text-6xl xl:text-[4.2rem] font-bold tracking-tight leading-[1.12] max-w-5xl text-left mb-20 font-heading select-none">
            {expSubText.split("").map((char, i) => {
              const isAnimated = i < expAnimLength;
              if (isAnimated) {
                const start = i / expAnimLength;
                const end = start + (1 / expAnimLength);
                return (
                  <Character key={i} progress={s3Progress} range={[start, end]}>
                    {char}
                  </Character>
                );
              } else {
                return <span key={i} className="text-[#404040]">{char}</span>;
              }
            })}
          </h3>

          {/* Static Experience List */}
          <div ref={timelineRef} className="w-full relative">
            {experiences.map((exp, idx) => (
              <ExperienceRow
                key={idx}
                exp={exp}
                idx={idx}
                total={experiences.length}
                timelineProgress={timelineProgress}
              />
            ))}
          </div>

        </section>

        {/* ================= EDUCATION SECTION ================= */}
        <section className="py-24 border-t border-white/10 relative z-10">

          {/* Mini Metadata Header */}
          <div className="flex justify-between items-center text-[11px] tracking-widest text-white/40 uppercase font-mono font-medium mb-12">
            <div>/ Education</div>
          </div>

          <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] max-w-5xl text-left mb-16 font-heading select-none">
            Education
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full mt-12">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 group relative pl-6 border-l border-white/10 hover:border-white transition-colors duration-300"
              >
                <h4
                  className="text-xl font-bold font-heading text-white tracking-wide group-hover:text-white transition-colors duration-300"
                  dangerouslySetInnerHTML={{ __html: edu.degree }}
                />

                <div className="text-[13px] text-white/50 font-mono tracking-wider font-light">
                  {edu.college}
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ================= AWARDS & CERTIFICATIONS SECTION ================= */}
        <section className="py-24 border-t border-white/10 relative z-10">

          {/* Mini Metadata Header */}
          <div className="flex justify-between items-center text-[11px] tracking-widest text-white/40 uppercase font-mono font-medium mb-12">
            <div>/ Awards & Certifications</div>
          </div>

          <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] max-w-5xl text-left mb-16 font-heading select-none">
            Awards & Certifications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full mt-12">
            {awards.map((award, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 group relative pl-6 border-l border-white/10 hover:border-white transition-colors duration-300"
              >
                {award.link ? (
                  <a
                    href={award.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-baseline gap-1 group/link w-fit"
                  >
                    <h4 className="text-xl font-bold font-heading text-white tracking-wide group-hover:text-white transition-colors duration-300 group-hover/link:underline group-hover/link:underline-offset-4 decoration-white/40">
                      {award.title}
                    </h4>
                    <span className="text-[12px] font-mono text-white/40 group-hover/link:text-white transition-colors duration-300 ml-1">
                      ↗
                    </span>
                  </a>
                ) : (
                  <h4 className="text-xl font-bold font-heading text-white tracking-wide group-hover:text-white transition-colors duration-300">
                    {award.title}
                  </h4>
                )}

                <div className="text-[13px] text-white/50 font-mono tracking-wider font-light">
                  {award.issuer}
                </div>
              </div>
            ))}
          </div>

        </section>

      </div>
    </main>
  );
}
