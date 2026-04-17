import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ZoomParallax } from './ui/zoom-parallax';
import { Component as ASMRCounter } from './ui/asmr-background';

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div style={{ padding: '2rem', borderLeft: '1px solid var(--card-border)' }}>
    <h4 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{value}</h4>
    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{label}</p>
  </div>
);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Calculate opacity for the text overlay so it fades in beautifully
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0.1, 0.4], [0.95, 1]);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1280&q=80",
      alt: "Abstract AI Neural Network",
    },
    {
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&q=80",
      alt: "Architecture",
    },
    {
      src: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1280&q=80",
      alt: "Geometric Design",
    },
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&q=80",
      alt: "Mountain Scenery",
    },
    {
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1280&q=80",
      alt: "Minimalist Art",
    },
    {
      src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&q=80",
      alt: "Ocean Waves",
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&q=80",
      alt: "Sunlit Forest",
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="relative w-full overflow-hidden bg-black">
      <ZoomParallax images={images}>
        {/* Cinematic Backdrop for Text */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        
        {/* Content Overlay */}
        <motion.div 
          style={{ opacity: textOpacity, scale: textScale }}
          className="relative h-screen flex items-center justify-center px-4 md:px-8 pointer-events-auto"
        >
          <div className="container max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-[1.5fr,1fr] gap-12 lg:gap-20 items-center">
            
            {/* Left: Bio Text */}
            <div className="w-full">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter uppercase">About Me</h2>
              <p className="text-xl md:text-2xl text-[#d4d4d8] leading-relaxed max-w-2xl font-medium">
                I'm Sujoy, a <span className="text-white">CSE (AIML) student</span> at UEM Jaipur. 
                I view code as a canvas for interactive art, whether I'm building AI-powered learning tools 
                or pushing the boundaries of Web3 and 3D web experiences.
                <br /><br />
                With a community of <span className="text-white">2k+ subscribers</span>, I share my journey 
                to make complex tech accessible, engaging, and fundamentally fun.
              </p>
              <div className="mt-12">
                <ASMRCounter />
              </div>
            </div>

            {/* Right: Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 w-full">
                <StatCard value="2+" label="Years of Coding" />
                <StatCard value="5+" label="Core Projects" />
                <StatCard value="2k+" label="YouTube Community" />
            </div>
          </div>
        </motion.div>
      </ZoomParallax>
    </section>
  );
};

export default About;
