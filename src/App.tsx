import React, { useEffect } from 'react';
import Lenis from 'lenis';
import BottomNavBar from './components/ui/bottom-nav-bar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import About from './components/About';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import FeaturedShowcase from './components/FeaturedShowcase';
import ASMRStaticBackground from '@/components/ui/asmr-static-background';
import { useLoading } from './context/LoadingProvider';
import { setProgress } from './components/Loading';

const App: React.FC = () => {
  const { setLoading } = useLoading();

  useEffect(() => {
    let progress = setProgress((value) => setLoading(value));
    
    // Simulate loading data/assets
    setTimeout(() => {
      progress.loaded();
    }, 1500); // Trigger completing the intro after 1.5s
  }, [setLoading]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app">
      <ASMRStaticBackground />
      <BottomNavBar stickyBottom />
      <main>
        <Hero />
        <About />
        <FeaturedShowcase />
        <Timeline />
        <BentoGrid />
        <Contact />
      </main>
      
      <footer style={{ padding: '4rem', textAlign: 'center', opacity: 0.3, fontSize: '0.75rem' }}>
        © 2026 SUJOY MOULICK. BUILT WITH PRECISION & PASSION.
      </footer>
    </div>
  );
};

export default App;
