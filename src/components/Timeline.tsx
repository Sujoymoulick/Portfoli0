import React from 'react';

const TimelineItem = ({ year, title, description }: { year: string; title: string; description: string }) => (
  <div className="flex flex-col md:grid md:grid-cols-[150px_1fr] gap-2 md:gap-8 py-8 border-b border-white/10 w-full">
    <span className="text-lg font-bold opacity-50">{year}</span>
    <div>
      <h4 className="text-2xl mb-2 font-semibold">{title}</h4>
      <p className="text-[#a1a1aa] leading-relaxed">{description}</p>
    </div>
  </div>
);

const Timeline: React.FC = () => {
  return (
    <section className="container section-padding px-4 md:px-8 overflow-hidden w-full max-w-full">
      <h2 className="text-4xl md:text-5xl font-bold mb-10 md:mb-16">My Journey</h2>
      <div className="py-8 w-full">
        <TimelineItem 
          year="2024–Present" 
          title="UEM Jaipur" 
          description="B.Tech in Computer Science and Engineering (AI/ML). Focus on Web Development, DSA, and Blockchain frameworks." 
        />
        <TimelineItem 
          year="Prior" 
          title="PC High School" 
          description="Foundational studies in computer science and mathematics." 
        />
      </div>
    </section>
  );
};

export default Timeline;
