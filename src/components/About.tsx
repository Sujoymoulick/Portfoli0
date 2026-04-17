import React from 'react';

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div style={{ padding: '2rem', borderLeft: '1px solid var(--card-border)' }}>
    <h4 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{value}</h4>
    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{label}</p>
  </div>
);

import { Component as ASMRCounter } from './ui/asmr-background';

const About: React.FC = () => {
  return (
    <section id="about" className="container section-padding px-4 md:px-8 overflow-hidden w-full max-w-full">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="w-full">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">About Me</h2>
          <p className="text-lg md:text-xl text-[#a1a1aa] leading-relaxed mb-8">
            I am a 2nd-year B.Tech CSE (AI/ML) student at UEM Jaipur, deeply passionate about merging cutting-edge AI with high-end frontend experiences. 
            My journey is driven by the goal of building decentralized, intelligent, and visually stunning web ecosystems.
          </p>
          <ASMRCounter />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 w-full">
          <StatCard value="2+" label="Years of Coding" />
          <StatCard value="5+" label="Core Projects" />
          <StatCard value="2k+" label="YouTube Subscribers" />
        </div>
      </div>
    </section>
  );
};

export default About;
