import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { Macbook } from './ui/animated-3d-mac-book-air';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="container section-padding px-4 md:px-8 mb-40 overflow-hidden w-full max-w-full">
      <div className="text-center w-full max-w-3xl mx-auto">
        <h2 className="text-[clamp(3rem,8vw,6rem)] font-black leading-tight mb-8">Let's Build Something Great.</h2>
        <p className="text-lg md:text-xl text-[#a1a1aa] mb-12 px-4">
          Have a project in mind or just want to say hi? Feel free to reach out.
        </p>
        
        <form className="flex flex-col gap-6 mb-16 w-full">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 w-full">
            <input type="text" placeholder="Name" className="bg-[#18181b] border border-white/10 p-6 rounded-2xl text-white outline-none w-full" />
            <input type="email" placeholder="Email" className="bg-[#18181b] border border-white/10 p-6 rounded-2xl text-white outline-none w-full" />
          </div>
          <textarea placeholder="Message" rows={5} className="bg-[#18181b] border border-white/10 p-6 rounded-2xl text-white outline-none w-full resize-none"></textarea>
          <button className="bg-white text-black p-6 rounded-2xl border-none font-bold cursor-pointer flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors w-full md:w-auto md:self-center px-12">
            SEND MESSAGE <ArrowUpRight size={20} />
          </button>
        </form>

        <div className="flex justify-center mb-16 max-w-lg mx-auto pointer-events-none scale-125">
          <Macbook />
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12 relative z-20">
          <a href="https://github.com/sujoymoulick" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             GITHUB
          </a>
          <a href="https://linkedin.com/in/sujoymoulick" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             LINKEDIN
          </a>
          <a href="mailto:sujoy@example.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Mail size={20} /> EMAIL
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
