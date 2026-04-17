import React, { useState, useEffect } from 'react';
import { RadialScrollGallery } from './ui/portfolio-and-image-gallery';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from './ui/badge';
import Web3Model from './ui/web3-model';

const projects = [
  { 
    id: 1, 
    title: "Adhyayan", 
    cat: "Learning", 
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    desc: "A platform for interactive learning and competitive quizzes."
  },
  { 
    id: 2, 
    title: "Meghdoot", 
    cat: "Weather", 
    img: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=600&q=80",
    desc: "Real-time forecasting with a hyper-minimal visual language."
  },
  { 
    id: 3, 
    title: "Textora", 
    cat: "AI/ML", 
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
    desc: "Leveraging Gemini API for context-aware content generation."
  },
  { 
    id: 4, 
    title: "P2P Ticket", 
    cat: "Web3", 
    img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=600&q=80",
    desc: "A decentralized fraud-proof ticket resale platform."
  },
  { 
    id: 5, 
    title: "Digital Clock", 
    cat: "Creative", 
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80",
    desc: "A 3D-interactive clock featuring kinetic geometry."
  },
];

const BentoGrid: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    handleResize(); // initial check
    setMounted(true); // wait for mount to render JS layouts to avoid hydration clash
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) {
    return <section id="works" className="w-full py-32 bg-black/0 min-h-screen"></section>;
  }

  return (
    <section id="works" className="relative text-white overflow-hidden w-full py-32">
      <div className="h-[300px] flex flex-col items-center justify-center space-y-4 pt-8 mb-16 px-4">
        <div className="space-y-1 text-center">
          <span className="text-[12px] font-bold tracking-widest text-[#a1a1aa] uppercase">
            Portfolio
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
            Featured Works
          </h2>
        </div>
        <div className="animate-bounce text-[#a1a1aa] text-sm mt-8">
          {isDesktop ? '↓ Scroll to rotate' : '↓ Scroll to view'}
        </div>
      </div>

      {isDesktop ? (
        <RadialScrollGallery
          className="!min-h-[700px]"
          baseRadius={450}
          mobileRadius={200}
          visiblePercentage={50}
          scrollDuration={2500}
        >
          {(hoveredIndex) =>
            projects.map((project, index) => {
              const isActive = hoveredIndex === index;
              return (
                <div 
                  key={project.id} 
                  className="group relative w-[240px] h-[340px] xl:w-[280px] xl:h-[400px] overflow-hidden rounded-2xl bg-[#0a0a0c] border border-white/10 shadow-2xl"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    {project.cat === "Web3" ? (
                      <div className="w-full h-full relative z-0">
                        <Web3Model />
                      </div>
                    ) : (
                      <>
                        <img
                          src={project.img}
                          alt={project.title}
                          className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
                            isActive ? 'scale-110 blur-0' : 'scale-100 blur-[2px] grayscale-[50%]'
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                      </>
                    )}
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none">
                    <div className="flex justify-between items-start">
                      <Badge variant="secondary" className="text-[10px] px-3 py-1 bg-white/10 text-white backdrop-blur border border-white/20 uppercase tracking-widest">
                        {project.cat}
                      </Badge>
                      <div className={`w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-all duration-500 shadow-lg ${isActive ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-45 scale-50'}`}>
                        <ArrowUpRight size={16} />
                      </div>
                    </div>

                    <div className={`transition-transform duration-500 ease-out ${isActive ? 'translate-y-0' : 'translate-y-4'}`}>
                      <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight text-white mb-2">{project.title}</h3>
                      <p className={`text-xs text-[#a1a1aa] transition-all duration-500 leading-relaxed ${isActive ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
                        {project.desc}
                      </p>
                      <div className={`h-[2px] bg-white mt-4 transition-all duration-500 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                    </div>
                  </div>
                </div>
              );
            })
          }
        </RadialScrollGallery>
      ) : (
        <div className="flex flex-col items-center justify-center gap-12 px-6 pb-24 relative z-10 w-full max-w-lg mx-auto">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group relative w-full aspect-[3/4] max-h-[450px] overflow-hidden rounded-2xl bg-[#0a0a0c] border border-white/10 shadow-2xl"
            >
              <div className="absolute inset-0 overflow-hidden">
                {project.cat === "Web3" ? (
                  <div className="w-full h-full relative z-0">
                    <Web3Model />
                  </div>
                ) : (
                  <>
                    <img
                      src={project.img}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                  </>
                )}
              </div>

              <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="text-xs md:text-sm px-3 md:px-4 py-1 bg-white/10 text-white backdrop-blur border border-white/20 uppercase tracking-widest">
                    {project.cat}
                  </Badge>
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform transition-transform group-hover:rotate-12 group-hover:scale-110">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                <div className="transform transition-transform duration-500 ease-out group-hover:translate-y-[-8px]">
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-tight text-white mb-3 drop-shadow-md">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#d4d4d8] leading-relaxed drop-shadow-sm">
                    {project.desc}
                  </p>
                  <div className="h-[2px] bg-white mt-5 w-12 transition-all duration-500 group-hover:w-full opacity-50 group-hover:opacity-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BentoGrid;
