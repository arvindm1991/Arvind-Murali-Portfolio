export interface ResumeData {
  header: {
    name: string;
    website: string;
    websiteUrl: string;
    linkedin: string;
    linkedinUrl: string;
    email: string;
    phone: string;
  };
  summary: string;
  experience: ExperienceItem[];
  skills: {
    category: string;
    items: string[];
  }[];
  workHistory: WorkHistoryItem[];
  sideProjects: SideProjectItem[];
  education: EducationItem[];
  achievements: AchievementItem[];
}

interface ExperienceItem {
  company: string;
  subtitle?: string;
  role: string;
  period: string;
  description: string;
  highlights?: string[];
}

interface WorkHistoryItem {
  company: string;
  role: string;
  period: string;
}

interface SideProjectItem {
  name: string;
  description: string;
  url: string;
}

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
}

interface AchievementItem {
  title: string;
  description: string;
}

export const resumeData: ResumeData = {
  header: {
    name: "Arvind Murali",
    website: "arvindmurali.com",
    websiteUrl: "http://arvindmurali.com",
    linkedin: "arvindm1991",
    linkedinUrl: "https://www.linkedin.com/in/arvindm1991/",
    email: "arvindm1991@gmail.com",
    phone: "+1 (404) 916-3487"
  },
  summary: "Accomplished Product Leader and award-winning EdTech entrepreneur with 7+ years in software and technology. Specialized in building AI-powered learning platforms with a unique 0-1 experience. Strong passion for education & building pedagogically sound solutions.",
  experience: [
    {
      company: "Claypot",
      subtitle: "Ideas first. AI second.",
      role: "Founder",
      period: "PRESENT",
      description: "Building Claypot — a creative coding studio where young creators build their ideas with AI, test its capabilities and limits, and stay in charge. Scratch helped build intuition for deterministic programming. Claypot does the same for non-deterministic AI systems and introduces brand new AI primitives.",
      highlights: [
        "Block-based creative coding environment designed to teach AI concepts to young learners.",
      ]
    },
    {
      company: "Readable English",
      role: "Director of Product & Engineering",
      period: "AUG 2024 - PRESENT",
      description: "Lead Product and Engineering for our diverse product suite - apps, extension and webapps. Over the past 2 years, I led a complete revamp of our web offering and introduced a variety of AI-powered experiences into our core application suite.",
      highlights: [
        "Led 0-1 phase of app offerings with AI native reading experiences."
      ]
    },
    {
      company: "Litmus Learn",
      subtitle: "Generative AI-powered learning platform",
      role: "Founder & CEO",
      period: "FEB 2020 - AUG 2024",
      description: "Founded and led Litmus Learn, an AI-powered LMS platform, achieving $150K+ in ARR. Notably, our first school customer continues to use Litmus for the 5th consecutive year.",
      highlights: [
        "Directed all aspects of product development, from initial design through commercialization, emphasizing user-centric features.",
        "Orchestrated product lifecycle management, pricing strategies, and business development, resulting in strong customer satisfaction and retention."
      ]
    },
    {
      company: "Peloton Technology, Inc.",
      role: "Product Manager - Fuel Economy",
      period: "SEP 2018 - FEB 2020",
      description: "Spearheaded the core value proposition of fuel savings in the autonomous vehicle sector, driving product strategy and customer engagement.",
      highlights: [
        "Led customer education initiatives using data analytics."
      ]
    },
    {
      company: "Misc Engineering Jobs",
      subtitle: "Roush and Cummins",
      role: "Senior Development Engineer",
      period: "OCT 2014 - AUG 2018",
      description: "I worked in development teams at engineering companies where I architected automated testing platforms that achieved >$1M in cost savings.",
      highlights: [
        "Developed advanced data analysis tools, reducing analysis time from weeks to hours, and facilitating agile iterations."
      ]
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
  workHistory: [
    {
      company: "Claypot",
      role: "Founder",
      period: "PRESENT"
    },
    {
      company: "Readable English",
      role: "Director of Product & Engineering",
      period: "AUG 2024 - PRESENT"
    },
    {
      company: "Litmus Learn",
      role: "Founder & CEO",
      period: "FEB 2020 - AUG 2024"
    },
    {
      company: "Peloton Technology",
      role: "Product Manager",
      period: "SEP 2018 - FEB 2020"
    },
    {
      company: "Roush Industries",
      role: "Senior Development Engineer",
      period: "MAR 2016 - AUG 2018"
    },
    {
      company: "Cummins",
      role: "Engineer",
      period: "OCT 2014 - DEC 2016"
    }
  ],
  sideProjects: [
    {
      name: "Claypot",
      description: "Block based creative coding for AI",
      url: "https://claypot.app"
    },
    {
      name: "Queso",
      description: "Interactive Learning on the web.",
      url: "https://usequeso.com"
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
    {
      title: "ASU-GSV Cup 50 Honoree",
      description: "Top 50 Edtechs in the World"
    }
  ]
};
