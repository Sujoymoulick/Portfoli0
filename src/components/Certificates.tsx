import React from 'react';
import { ShareholderReports } from "@/components/ui/carousel";
import type { Report } from "@/components/ui/carousel";

// Import local certificate images
import generativeAIImg from '../assets/certificate/Generative AI.png';
import llmImg from '../assets/certificate/LLM.png';
import responsibleAIImg from '../assets/certificate/ResponsibleAI.png';
import mongoDBImg from '../assets/certificate/mongodb.png';
import dmImg from '../assets/certificate/DM.png';
import graphicDesignImg from '../assets/certificate/Graphic-design.png';
import htmlCssJsImg from '../assets/certificate/HTML-CSS-JS.png';
import softwareEngImg from '../assets/certificate/Software engineering.png';
import cloudComputingImg from '../assets/certificate/cloud computing.png';
import cyberSecurityImg from '../assets/certificate/cyber-sequrity.png';

const certificatesData: Report[] = [
  {
    id: "CERT-GOOGLE-AI",
    quarter: "Generative AI",
    period: "AUGUST 2025 | GOOGLE CLOUD",
    imageSrc: generativeAIImg,
    isNew: true,
  },
  {
    id: "CERT-LLM-EXPERT",
    quarter: "Large Language Models",
    period: "JULY 2025 | GOOGLE CLOUD",
    imageSrc: llmImg,
    isNew: true,
  },
  {
    id: "CERT-RESP-AI",
    quarter: "Responsible AI",
    period: "JUNE 2025 | GOOGLE CLOUD",
    imageSrc: responsibleAIImg,
  },
  {
    id: "CERT-MONGODB",
    quarter: "MongoDB Certified",
    period: "MAY 2025 | MONGODB UNIVERSITY",
    imageSrc: mongoDBImg,
  },
  {
    id: "CERT-DM-PRO",
    quarter: "Digital Marketing",
    period: "APRIL 2025 | HUBSPOT",
    imageSrc: dmImg,
  },
  {
    id: "CERT-GRAPHIC-DESIGN",
    quarter: "Graphic Design",
    period: "MARCH 2025 | ADOBE",
    imageSrc: graphicDesignImg,
  },
  {
    id: "CERT-WEB-DEV",
    quarter: "HTML, CSS & JavaScript",
    period: "FEBRUARY 2025 | META",
    imageSrc: htmlCssJsImg,
  },
  {
    id: "CERT-SOFTWARE-ENG",
    quarter: "Software Engineering",
    period: "JANUARY 2025 | IBM",
    imageSrc: softwareEngImg,
  },
  {
    id: "CERT-CLOUD-COMP",
    quarter: "Cloud Computing",
    period: "DECEMBER 2024 | AWS",
    imageSrc: cloudComputingImg,
  },
  {
    id: "CERT-CYBER-SEC",
    quarter: "Cyber Security",
    period: "NOVEMBER 2024 | COMPTIA",
    imageSrc: cyberSecurityImg,
  },
];

const Certificates: React.FC = () => {
  return (
    <div className="w-full bg-black">
      <ShareholderReports 
        reports={certificatesData} 
        title="Certificates & Accolades"
        subtitle="Verification of my professional skills and technical expertise"
      />
    </div>
  );
};

export default Certificates;
