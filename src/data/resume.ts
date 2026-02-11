export interface ResumeData {
  header: {
    name: string;
    location: string;
    linkedin: string;
    email: string;
    phone: string;
  };
  summary: string;
  experience: ExperienceItem[];
  skills: {
    category: string;
    items: string[];
  }[];
  education: EducationItem[];
  achievements: string[];
}

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights?: string[];
}

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
}

export const resumeData: ResumeData = {
  header: {
    name: "Arvind Murali",
    location: "Livermore, CA",
    linkedin: "arvindm1991",
    email: "arvindm1991@gmail.com",
    phone: "+1 (404) 916-3487"
  },
  summary: "Accomplished Product Leader and award-winning EdTech entrepreneur with 7+ years in software and technology. Specialized in building AI-powered learning platforms with a unique 0-1 experience. Strong passion for education & building pedagogically sound solutions.",
  experience: [
    {
      company: "Readable English",
      role: "Director of Product & Engineering",
      period: "AUG 2024 - PRESENT",
      description: "Lead Product and Engineering for the product suite. Over the past 1.5 years, we have completely revamped our web offering and introduced a variety of AI-powered experiences into our web extension. I also lead conception and building of our B2C App with powerful agentic AI interventions."
    },
    {
      company: "Litmus Learn",
      role: "Founder & CEO",
      period: "FEB 2020 - AUG 2024",
      description: "Generative AI-powered learning platform.",
      highlights: [
        "Founded and led Litmus Learn, an AI-powered learning platform with ERP-like complexity, achieving $150K+ in ARR.",
        "Directed all aspects of product development, from initial design through commercialization, emphasizing user-centric features.",
        "Orchestrated product lifecycle management, pricing strategies, and business development, resulting in strong customer satisfaction and retention.",
        "Conducted comprehensive market analysis and VOC research, translating insights into actionable product features and roadmaps."
      ]
    },
    {
      company: "Peloton Technology, Inc.",
      role: "Product Manager - Fuel Economy",
      period: "SEP 2018 - FEB 2020",
      description: "Spearheaded the core value proposition of fuel savings in the autonomous vehicle sector, driving product strategy and customer engagement. Led customer education initiatives using data analytics."
    },
    {
      company: "Misc Engineering Jobs (Roush and Cummins)",
      role: "Senior Development Engineer",
      period: "OCT 2014 - AUG 2018",
      description: "Worked in development teams at engineering companies where I architected automated testing platforms that achieved >$1M in cost savings. Developed advanced data analysis tools, reducing analysis time from weeks to hours, and facilitating agile iterations."
    }
  ],
  skills: [
    {
      category: "Product Management",
      items: ["Strategic planning", "Execution", "Product lifecycle management"]
    },
    {
      category: "User Experience Design",
      items: ["Ideation", "UI/UX principles", "User-centric design"]
    },
    {
      category: "Strategy",
      items: ["Visionary leadership", "Market analysis", "Competitive positioning"]
    }
  ],
  education: [
    {
      institution: "Georgia Tech",
      degree: "MS (Aerospace Engineering)",
      period: "AUG 2012 - AUG 2014"
    }
  ],
  achievements: [
    "ASU-GSV Cup 50 Winner - Top 50 Edtechs in the World"
  ]
};
