import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Macbook } from './ui/animated-3d-mac-book-air';
import { FlipLinks } from './ui/flip-links';
import aboutMeImg from '../assets/about_me.jpg';
import { cn } from '@/lib/utils';

const Contact: React.FC = () => {
  const [result, setResult] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");
    
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "3c8ade40-7a34-41d9-9342-2ae14fdb6d28");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully!");
        (event.target as HTMLFormElement).reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      setResult("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="container section-padding px-4 md:px-8 mb-40 overflow-hidden w-full max-w-full">
      <div className="text-center w-full max-w-3xl mx-auto">
        <h2 className="text-[clamp(3rem,8vw,6rem)] font-black leading-tight mb-8">Let's Build Something Great.</h2>
        <p className="text-lg md:text-xl text-[#a1a1aa] mb-12 px-4">
          Have a project in mind or just want to say hi? Feel free to reach out.
        </p>
        
        <form onSubmit={onSubmit} className="flex flex-col gap-6 mb-16 w-full text-left">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 w-full">
            <input 
              type="text" 
              name="name" 
              required 
              placeholder="Name" 
              className="bg-[#18181b] border border-white/10 p-6 rounded-2xl text-white outline-none w-full focus:border-white/30 transition-colors" 
            />
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="Email" 
              className="bg-[#18181b] border border-white/10 p-6 rounded-2xl text-white outline-none w-full focus:border-white/30 transition-colors" 
            />
          </div>
          <textarea 
            name="message" 
            required 
            placeholder="Message" 
            rows={5} 
            className="bg-[#18181b] border border-white/10 p-6 rounded-2xl text-white outline-none w-full resize-none focus:border-white/30 transition-colors"
          ></textarea>
          
          <div className="flex flex-col items-center gap-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-white text-black p-6 rounded-2xl border-none font-bold cursor-pointer flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors w-full md:w-auto md:self-center px-12 disabled:opacity-50 disabled:cursor-wait"
            >
              {isSubmitting ? "SENDING..." : "SEND MESSAGE"} <ArrowUpRight size={20} />
            </button>
            {result && (
              <p className={cn("text-sm font-bold tracking-widest uppercase mt-2", {
                "text-green-500": result.includes("success"),
                "text-red-500": !result.includes("success") && !result.includes("Sending")
              })}>
                {result}
              </p>
            )}
          </div>
        </form>

        <div className="flex justify-center mb-16 max-w-lg mx-auto pointer-events-none scale-125">
          <Macbook />
        </div>

        <div className="flex flex-col items-center gap-12 mt-20">
          {/* Portrait Section */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
              <img 
                src={aboutMeImg} 
                alt="Sujoy Moulick" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Flip Links Social Section */}
          <div className="w-full py-10">
            <FlipLinks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
