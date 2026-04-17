import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const CareerItem = ({ role, location, period, description, index }: { 
  role: string; 
  location: string; 
  period: string; 
  description: string;
  index: number;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-12 pb-16 last:pb-0 group"
    >
      {/* Timeline Dot */}
      <div className="absolute left-[-5px] top-[10px] w-3 h-3 rounded-full bg-white border-4 border-black group-hover:scale-150 transition-transform duration-300 z-10" />
      
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-col">
            <h4 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-white">
              {role}
            </h4>
            <h5 className="text-sm md:text-lg font-bold text-[#a1a1aa] uppercase tracking-widest mt-1">
              {location}
            </h5>
          </div>
          <p className="max-w-xl text-[#d4d4d8] text-sm md:text-base leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            {description}
          </p>
        </div>
        
        <div className="flex-shrink-0">
          <span className="text-4xl md:text-6xl font-black tracking-tighter text-[#27272a] group-hover:text-white transition-colors duration-500">
            {period}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Career: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  const careerData = [
    {
      role: "B.Tech CSE (AI & ML)",
      location: "UEM, Jaipur",
      period: "2023 - 2027",
      description: "Currently in my 2nd Year of Computer Science engineering, focusing on Artificial Intelligence and Machine Learning applications."
    },
    {
      role: "Student Chapter Member",
      location: "ACM Student Chapter",
      period: "2024",
      description: "Active member of the ACM Student Chapter, participating in technical workshops and research-based initiatives."
    },
    {
      role: "Full-Stack Developer",
      location: "Freelance / Personal Projects",
      period: "NOW",
      description: "Building comprehensive web platforms using React, Node.js, and Supabase, with a strong emphasis on AI integration."
    }
  ];

  return (
    <section id="journey" ref={containerRef} className="relative w-full py-24 md:py-40 bg-black overflow-hidden px-6 md:px-12">
      <div className="container max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-[1fr,2fr] gap-16 md:gap-24">
        
        {/* Left: Sticky Title */}
        <div className="lg:sticky lg:top-40 h-fit">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white">
              MY CAREER <br /> 
              <span className="text-white/20">&</span> <br />
              EXPERIENCE
            </h2>
          </motion.div>
        </div>

        {/* Right: Animated Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-white/10 overflow-hidden">
            <motion.div 
              style={{ scaleY: pathLength, originY: 0 }}
              className="w-full h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            />
          </div>

          <div className="space-y-4">
            {careerData.map((item, index) => (
              <CareerItem key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
