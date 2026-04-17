import React, { useState } from 'react';
import { MoreVertical, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex justify-between items-center backdrop-blur-md bg-black/50">
        <div className="font-black text-2xl tracking-tighter relative z-[110]">SM.</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 relative z-[110]">
          <a href="#" className="text-white no-underline text-xs font-bold tracking-widest hover:text-white/70 transition-colors uppercase">Home</a>
          <a href="#about" className="text-[#a1a1aa] no-underline text-xs font-bold tracking-widest hover:text-white transition-colors uppercase">About</a>
          <a href="#works" className="text-[#a1a1aa] no-underline text-xs font-bold tracking-widest hover:text-white transition-colors uppercase">Works</a>
          <a href="#contact" className="text-[#a1a1aa] no-underline text-xs font-bold tracking-widest hover:text-white transition-colors uppercase">Contact</a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white fixed top-6 right-6 z-[200] p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center transition-transform active:scale-95" 
          onClick={toggleMenu} 
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} color="white" /> : <MoreVertical size={24} color="white" />}
        </button>
      </nav>

      {/* Mobile Overlay - Kept outside nav to prevent backdrop-filter containing block issues */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center gap-10 z-[150] md:hidden overflow-hidden">
          <a href="#" onClick={toggleMenu} className="text-4xl font-black tracking-tighter text-white uppercase tracking-widest">Home</a>
          <a href="#about" onClick={toggleMenu} className="text-4xl font-black tracking-tighter text-[#a1a1aa] hover:text-white transition-colors uppercase tracking-widest">About</a>
          <a href="#works" onClick={toggleMenu} className="text-4xl font-black tracking-tighter text-[#a1a1aa] hover:text-white transition-colors uppercase tracking-widest">Works</a>
          <a href="#contact" onClick={toggleMenu} className="text-4xl font-black tracking-tighter text-[#a1a1aa] hover:text-white transition-colors uppercase tracking-widest">Contact</a>
        </div>
      )}
    </>
  );
};

export default Navbar;
