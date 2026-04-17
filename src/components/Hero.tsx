import React from 'react';
import { motion } from 'framer-motion';
import { SplineScene } from './ui/splite';
import { Spotlight } from './ui/spotlight';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      <div className="container relative z-10 flex flex-col items-center justify-center h-full pt-16 md:pt-0">
        
        {/* Main Hero Container */}
        <motion.div
           className="flex-1 flex flex-col md:flex-row-reverse items-center justify-center md:justify-between px-4 w-full max-w-7xl mx-auto mt-10 md:mt-0 z-20 text-center md:text-left gap-2 md:gap-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* RIGHT SIDE (Mobile Top): Spline Robot */}
          <div className="mb-2 md:mb-0 h-[280px] md:h-[600px] w-full md:w-1/2 relative pointer-events-auto flex items-center justify-center z-10">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
          
          {/* LEFT SIDE (Mobile Bottom): Text Content */}
          <div className="flex flex-col items-center md:items-start justify-center w-full md:w-1/2 md:pl-10">
            <h1 className="text-[clamp(3.5rem,15vw,10rem)] md:text-[clamp(5rem,8vw,10rem)] leading-[0.85] font-black uppercase tracking-tighter mb-6 md:mb-8 break-words sm:break-normal hyphens-auto text-center md:text-left w-full">
              Sujoy<br />Moulick
            </h1>
            
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-start justify-center md:justify-start w-full">
              <div className="hidden md:block w-12 h-[2px] bg-white opacity-50 mt-3 md:mt-4 flex-shrink-0" />
              <motion.p 
                className="text-sm md:text-lg text-neutral-400 max-w-sm text-center md:text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                2nd Year CSE (AI/ML) Student at UEM Jaipur. <br/>
                Building the future of AI & Web3.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <p className="opacity-50 text-[10px] md:text-xs tracking-widest uppercase text-white font-medium">SCROLL TO EXPLORE ↓</p>
      </motion.div>
    </section>
  );
};

export default Hero;
