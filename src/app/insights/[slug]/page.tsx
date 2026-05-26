"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface Article {
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  content: JSX.Element;
}

const articlesData: Record<string, Article> = {
  "ai-design-partner": {
    title: "AI is the New Design Partner",
    category: "AI DESIGN",
    readTime: "4 min read",
    date: "March 2026",
    summary: "How AI tools are shifting designers from makers to decision-makers.",
    content: (
      <>
        <p className="text-white/80 leading-relaxed mb-6">
          Over the past few years, there has been a very volatile narrative on artificial intelligence in the design field between pessimistic doom-mongers and optimistic fanatics. Coming as a Lead Product Designer with experience of being involved in complex data platforms and new technologies daily, I would say that AI is not going to replace us, although it will definitely change our point of gravity. We are moving from the makers to decision-makers.
        </p>
        <p className="text-white/80 leading-relaxed mb-6">
          The classic approach to product design requires a large amount of time for production level tasks – from aligning the layout manually to creating infinite iterations of wireframes and nested autolayout components. Nowadays, using AI-driven tools and systems, we can perform pixel-level processes in just a few seconds. Thus, we should concentrate more on what makes us different from machines – system thinking, behavioral psychology, and human-AI interaction coordination.
        </p>
        <blockquote className="border-l-2 border-white/20 pl-6 py-2 my-8 italic text-white/90">
          "Tomorrow’s designer is not a pixel-pusher, but a system orchestrator. Our value is in our taste, empathy and our ability to orchestrate trust."
        </blockquote>

        <h3 className="text-xl md:text-2xl font-semibold text-white mt-10 mb-4 font-heading">The Shift to Intent-Based Design</h3>
        <p className="text-white/80 leading-relaxed mb-6">
          Designing with AI takes us to a paradigm of prioritizing what users want to accomplish. Of just drawing a button we think about the situation and goals of the person using it. For example we ask: How is the doctor feeling when using this dashboard? What might influence a researcher when looking at this data? AI can help with layout ideas. Only a human designer can make the design feel right for the user by understanding their needs and feelings.
        </p>
        <p className="text-white/80 leading-relaxed mb-6">
          AI has also changed how we work together on designs. It can quickly suggest different ways to structure a project. Our job is to guide these suggestions making sure they fit with our vision of a product that's good for users.
        </p>

        <h3 className="text-xl md:text-2xl font-semibold text-white mt-10 mb-4 font-heading">Designing the Future</h3>
        <p className="text-white/80 leading-relaxed mb-6">
          Working with AI means we don't have to do all the tasks ourselves. The best products, in the future will be those that are designed by people who really understand how humans behave. By using AI to handle the parts we can focus on creating experiences that truly matter to users and last a long time.
        </p>
      </>
    )
  },
  "vibe-coding-security": {
    title: "Vibe Coding Is Powerful — But Is It Safe?",
    category: "Vibe Coding",
    readTime: "5 min read",
    date: "May 2026",
    summary: "45% of AI-generated code has security flaws. The real skill is knowing when to trust it.",
    content: (
      <>
        <p className="text-white/80 leading-relaxed mb-6">
          The idea of Vibe Coding is really cool. It is when you use language to tell computers to make software. You can just write down what you want something to look like or do. Then the computer makes it happen. It is like magic. But as we start to use this way of making things more we have to think about something important: is it safe to do it this way?
        </p>
        <p className="text-white/80 leading-relaxed mb-6">
          Some studies have found out something that's not so good: almost half of the code that computers make on their own has problems that can let bad people in. This is because computers are trained on lots of code that people have written before so they are good, at making things that look right. They do not really understand what they are doing. They do not know how to keep things safe unless someone tells them what to do.
        </p>
        <blockquote className="border-l-2 border-white/20 pl-6 py-2 my-8 italic text-white/90">
          "Vibe Coding changes the way people make software. Now the people who make software do not have to write all the code. They have to make sure it is safe. They have to look closely at what the computer made and try to find any problems. It is like they are trying to outsmart the people who might try to get in."
        </blockquote>
        
        <h3 className="text-xl md:text-2xl font-semibold text-white mt-10 mb-4 font-heading">The Illusion of Correctness</h3>
        <p className="text-white/80 leading-relaxed mb-6">
          The problem, with code made by intelligence is that it looks right on the surface. An interface made by a computer program might open fast work with normal situations and feel very high quality.. Under the nice looking outside the parts that deal with data might not be checked to make sure they are allowed or the system that handles different states might waste memory.
        </p>
        <p className="text-white/80 leading-relaxed mb-6">
          As designers and developers working together on systems we need to make sure we have strong checks in place. We should never just trust code made by a computer without looking at it. Every line of code made by a computer needs to be looked at by people checked with special tools and tested automatically. The powerful thing is not being fast but being able to carefully think about what we are doing.
        </p>
        
        <h3 className="text-xl md:text-2xl font-semibold text-white mt-10 mb-4 font-heading">A Balanced Approach</h3>
        <p className="text-white/80 leading-relaxed mb-6">
          When I am working on something I think of using computer made code as a way to quickly try out ideas. It lets me build test versions try out ways of moving things on the screen and test my ideas about how things should look directly in the web browser.. When it comes to making software that big companies will use I still think it is very important to have people check everything make a plan and check for security problems. The artificial intelligence code is still a tool like the computer made code and we need to use it in a smart way.
        </p>
      </>
    )
  },
  "shadow-ai-healthcare-risk": {
    title: "Shadow AI Is a Hospital's Biggest Hidden Risk",
    category: "Healthcare × AI",
    readTime: "6 min read",
    date: "April 2026",
    summary: "Staff are using unauthorized AI tools at work — and health systems scrambling to respond.",
    content: (
      <>
        <p className="text-white/80 leading-relaxed mb-6">
          Healthcare is an industry where accuracy's everything and design decisions can directly affect patient outcomes.. Behind the clean hospitals and strict electronic health record systems a quiet change is happening. One that poses a big risk to the whole system. Doctors, administrators and support staff are increasingly using unofficial AI tools like ChatGPT or Claude to summarize patient records write discharge papers and understand clinical notes. This is called Shadow AI.
        </p>
        <p className="text-white/80 leading-relaxed mb-6">
          I've worked on healthcare analytics platforms. I've seen that medical professionals don't use unofficial AI because they want to do anything wrong. They use it because hospital software is often messy, hard to use and exhausting. With administrative tasks clinicians naturally look for tools that save them time and let them spend more time caring for patients directly. They want to use tools that help them do their job better and now unauthorized AI engines are filling that gap. Healthcare professionals are turning to these tools because they make their work easier.
        </p>
        <p className="text-white/80 leading-relaxed mb-6">
          Clinicians and hospital staff are using Shadow AI because it helps them with their workload. Hospital software can be really tough to navigate. Thats why they're seeking help, from public AI tools. These tools help them summarize patient records and draft discharge papers quickly.
        </p>
        <p className="text-white/80 leading-relaxed mb-6">
          Doctors and nurses are not trying to cause any harm; they're just trying to find ways to do their job efficiently. They use ChatGPT and other AI tools to speed up their work so they can spend more time helping patients.
        </p>
        <blockquote className="border-l-2 border-white/20 pl-6 py-2 my-8 italic text-white/90">
          "Shadow AI is a sign of design in clinical software. If our interfaces were really made for how clinicians work every day they wouldn't have to use fixes."
        </blockquote>
        
        <h3 className="text-xl md:text-2xl font-semibold text-white mt-10 mb-4 font-heading">The Problem with AI in Clinics</h3>
        <p className="text-white/80 leading-relaxed mb-6">
          The risk is double. First putting health information into public AI systems that aren't allowed to have it is a huge HIPAA violation. Second AI models can make up information or miss important details. If a doctor uses AI to summarize a patients record and misses something like a bad drug interaction it can be deadly.
        </p>
        
        <h3 className="text-xl md:text-2xl font-semibold text-white mt-10 mb-4 font-heading">Fixing Shadow AI</h3>
        <p className="text-white/80 leading-relaxed mb-6">
          Health systems can't just tell doctors not to use AI. They need to give them secure, HIPAA- well-designed AI tools. We need to build workspaces that help doctors by gathering and summarizing complex data *inside* the hospital keeping patient data safe while helping doctors feel less overwhelmed.
        </p>
        
        <h3 className="text-xl md:text-2xl font-semibold text-white mt-10 mb-4 font-heading">Designing with Empathy</h3>
        <p className="text-white/80 leading-relaxed mb-6">
          Good healthcare design is about understanding and caring for clinicians. By adding AI tools directly into hospital dashboards we keep patient data safe and help doctors with their time and stress. We need to make platforms that doctors *want* to use. So they don't look for solutions, in secret.
        </p>
      </>
    )
  },
  "agentic-ai-development": {
    title: "The Rise of Agentic AI in Development",
    category: "AI Agents",
    readTime: "5 min read",
    date: "April 2026",
    summary: "AI no longer waits for prompts — it plans, codes, tests, and deploys on its own.",
    content: (
      <>
        <p className="text-white/80 leading-relaxed mb-6">
          We are moving on to a time for artificial intelligence that can create things. The old way of typing something into a box getting an answer and changing it by hand is being replaced by something stronger: artificial intelligence that can act on its own. Of just waiting for orders these agents can now plan complicated tasks make their own decisions fix mistakes right away and use software all by themselves.
        </p>
        <p className="text-white/80 leading-relaxed mb-6">
          This change in how thingsre built is completely changing how designers and computer code work together. In the past designers would make plans in Figma put together instructions and engineers would turn those plans into code. With intelligence that can act on its own this line between designers and code is disappearing. An agent can look at a library of symbols understand how the user will interact with it write the code for the website put it together and test it to make sure it works for everyone in real time.
        </p>
        <blockquote className="border-l-2 border-white/20 pl-6 py-2 my-8 italic text-white/90">
          "Artificial intelligence that can act on its own is changing the way we make things. We are not just making pages anymore we are making the rules, for how the user interface will change and adapt to what the user wants to do right now."
        </blockquote>
        
        <h3 className="text-xl md:text-2xl font-semibold text-white mt-10 mb-4 font-heading">Designing the Agentic Canvas</h3>
        <p className="text-white/80 leading-relaxed mb-6">
          As product designers we have to think about the user interface in a dynamic way. The Agentic Canvas is something that we need to consider when we are designing the user interface. How do we create an interface that does not have a fixed design. Instead changes on its own based on what the agent thinks the user needs? We need to design the boundaries and the rules of the interface than the actual layout of the Agentic Canvas.
        </p>
        <p className="text-white/80 leading-relaxed mb-6">
          We also need to change the way we think about designing interactions. The Agentic Canvas requires us to think. How do we make it clear what the agent is doing when it is working in the background? How do we show the user what the agent is thinking when it is making decisions? These are challenges for us as designers and we need to work closely with engineers to understand the technical limits and how the data is moving through the Agentic Canvas.
        </p>
        
        <h3 className="text-xl md:text-2xl font-semibold text-white mt-10 mb-4 font-heading">Unlocking New Creative Limits</h3>
        <p className="text-white/80 leading-relaxed mb-6">
          We should not be scared of the Agentic Canvas and what it can do on its own. Instead we should be really excited. By letting the agent handle the parts we can create digital products that are really immersive and personalized and that change based on what the user needs. The Agentic Canvas allows us to design products that we could not have built before and that is a liberating thing for us, as designers.
        </p>
      </>
    )
  },
  "token-economy-ux": {
    title: "Designing for the Token Economy",
    category: "AI UX & SYSTEM DESIGN",
    readTime: "6 min read",
    date: "May 2026",
    summary: "How top tech companies handle the cognitive load and token budgets of real-time AI generation.",
    content: (
      <>
        <p className="text-white/80 leading-relaxed mb-6">
          As Artificial Intelligence moves from an idea for a conversation to a hidden part of the software we use every day a new problem has come up: the token budget. In language models a token is the basic unit of processing text. Every time you click a button search for something. Get a suggestion to complete what you are typing it costs money and computer power. As the people who design products our challenge is not just about making things look good anymore. It is about helping people focus on the things given the limits and costs of Artificial Intelligence computing.
        </p>
        <p className="text-white/80 leading-relaxed mb-6">
          Big tech companies, like Notion and Figma and Vercel are figuring out this area. They are finding that the best experiences for users are made by designing within the limits of what's possible and turning those limits into good user interface design.
        </p>
        <blockquote className="border-l-2 border-white/20 pl-6 py-2 my-8 italic text-white/90">
          "In the age of Artificial Intelligence good design is directly related to using tokens. The elegant interfaces are the ones that give users the most help while using the least computer power."
        </blockquote>

        <h3 className="text-xl md:text-2xl font-semibold text-white mt-10 mb-4 font-heading">The Good and Bad of Artificial Intelligence Integration</h3>
        <p className="text-white/80 leading-relaxed mb-6">
          Adding Artificial Intelligence that can generate things to applications has big advantages and disadvantages. Understanding these is necessary for designing systems that're helpful to users and good for businesses:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="p-6 border border-white/5 bg-white/[0.01]">
            <h4 className="text-white font-semibold mb-3 font-heading text-sm uppercase tracking-wider text-green-400">// THE GOOD THINGS</h4>
            <ul className="list-disc pl-5 text-sm text-white/70 space-y-2">
              <li>Artificial Intelligence can make interfaces that change to fit what each user needs and how they work, in time.</li>
              <li>It can make it easier for users to interact with the system by turning actions into simple voice commands.</li>
              <li>It can help users start the process by giving them templates and drafts right away.</li>
            </ul>
          </div>
          
          <div className="p-6 border border-white/5 bg-white/[0.01]">
            <h4 className="text-white font-semibold mb-3 font-heading text-sm uppercase tracking-wider text-red-400">// THE BAD THINGS</h4>
            <ul className="list-disc pl-5 text-sm text-white/70 space-y-2">
              <li>It can be overwhelming for users with many options and suggestions which can cause fatigue and visual clutter.</li>
              <li>It can cost a lot of tokens, which can make the cost of using the application high for the business.</li>
              <li>It can make the system slow by making users wait for responses, which can break their concentration and focus.</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-semibold text-white mt-10 mb-4 font-heading">Designing the Interface that's Aware of Tokens</h3>
        <p className="text-white/80 leading-relaxed mb-6">
          To build Artificial Intelligence systems that are responsible designers are using several strategies that take tokens into account. First we design systems that need users to intentionally trigger the Artificial Intelligence. Of running it automatically we require users to do something like press the space bar in an empty block in Notion. This makes sure that tokens are only used when the user really wants to use them.
        </p>
        <p className="text-white/80 leading-relaxed mb-6">
          Second we focus on showing users the Artificial Intelligence capabilities a little at a time. Of showing a big chat box everywhere we put small agents directly into the existing interface elements like a spell check or a smart search bar that knows the context. This prevents overwhelming the user. Also reduces the number of tokens used by narrowing down the context of the prompt.
        </p>

        <h3 className="text-xl md:text-2xl font-semibold text-white mt-10 mb-4 font-heading">The Future of Design that Puts Resources First</h3>
        <p className="text-white/80 leading-relaxed mb-6">
          Designing for Artificial Intelligence requires an understanding of how software is made. By seeing token limits, as a challenge rather than a technical problem we can design products that feel fast, clean and intuitive which shows that good user experiences are always built on smart system engineering.
        </p>
      </>
    )
  }
};

export default function InsightArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articlesData[slug];

  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(Math.round(Math.min(100, Math.max(0, pct))));
    };
    
    const timeoutId = setTimeout(handleScroll, 100);
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if (!article) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold font-heading mb-4">Article Not Found</h1>
        <Link href="/" className="text-xs uppercase tracking-widest text-white/60 hover:text-white border-b border-white/20 pb-1">
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-36 pb-32 relative overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

      {/* Symmetrical Scroll Progress Tracker (Right Side) */}
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden md:flex flex-col items-center gap-5">
        <span className="text-[12px] font-mono tracking-widest text-white/30 uppercase select-none">
          /
        </span>
        <div className="h-56 w-[3px] bg-white/10 rounded-full relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 right-0 bg-white origin-top rounded-full"
            style={{ scaleY, height: "100%" }}
          />
        </div>
        <span className="inline-block w-14 text-center text-[11px] font-mono text-white/40 tracking-wider select-none tabular-nums">
          {scrollPercent}%
        </span>
      </div>

      <div className="max-w-[800px] mx-auto px-6 relative z-10">


        {/* Article Meta Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center px-4 py-1.5 border border-white/10 rounded-full bg-white/5 text-[10px] font-semibold tracking-widest text-white/80 uppercase select-none mb-6">
            {article.category}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 font-heading text-white">
            {article.title}
          </h1>

          <div className="flex items-center gap-6 text-xs text-white/40 font-mono border-b border-white/10 pb-8">
            <span>By Jaydeep Badadare</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span>{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span>{article.readTime}</span>
          </div>
        </motion.div>

        {/* Article Body Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base md:text-lg text-white/70 leading-relaxed font-light mt-10 article-body"
        >
          {article.content}
        </motion.article>

        {/* bottom pagination/nav */}
        <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
          <Link
            href="/insights"
            className="inline-flex items-center justify-center min-w-[140px] h-[50px] border border-white/10 hover:border-white transition-all duration-300 rounded-none bg-transparent text-[10px] font-semibold uppercase tracking-widest text-white"
          >
            All Insights
          </Link>
        </div>

      </div>
    </main>
  );
}
