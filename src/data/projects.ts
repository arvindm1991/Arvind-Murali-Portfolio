export interface Project {
  id: string;
  title: string;
  role?: string;
  description: string;
  url: string;
  tech?: string[];
  featured: boolean;
  longDescription?: string;
  features?: string[];
  problem?: string;
  solution?: string;
  logoUrl?: string;
  coverUrl?: string;
}

export const projectsData: Project[] = [
  {
    id: "readable-english",
    title: "Readable English",
    role: "Director of Product & Engineering",
    description: "Revamped web offering and introduced AI-powered experiences including a B2C App with agentic AI interventions.",
    url: "https://readablenglish.com/",
    featured: true,
    tech: ["AI", "EdTech", "Web Extension", "Mobile App"],
    logoUrl: "/assets/logos/readable-english.png",
    coverUrl: "/assets/covers/readable-english.gif",
    longDescription: "Readable English is an evidence-based reading intervention designed to unlock reading fluency for striving adolescents and adults. The platform simplifies English pronunciation and boosts confidence through a unique markup system.",
    problem: "Many students (and adults) struggle with English reading fluency due to the language's complex orthography, leading to confidence issues and learning gaps.",
    solution: "We completely revamped the web offering and introduced 'glyph' conversion tools that overlay pronunciation guides on digital and print content. Additionally, we built a B2C app with powerful agentic AI interventions to provide personalized coaching.",
    features: [
      "AI-powered reading assistance",
      "Chrome Extension for reading any web content",
      "Progress monitoring and benchmarking",
      "Cross-platform support (Web & Mobile)"
    ]
  },
  {
    id: "litmus-learn",
    title: "Litmus Learn",
    role: "Founder & CEO",
    description: "Generative AI-powered learning platform with ERP-like complexity. Achieved $150K+ ARR.",
    url: "https://litmuslearn.com/",
    featured: true,
    tech: ["GenAI", "SaaS", "EdTech", "Analytics"],
    logoUrl: "/assets/logos/litmus-learn.svg",
    coverUrl: "/assets/covers/litmus-learn.mp4",
    longDescription: "Litmus Learn is a blended learning platform that helps educators create cohesive and engaging learning experiences. It leverages GenAI to provide nuanced insights and interactive assessments.",
    problem: "Traditional learning management systems (LMS) are often passive and administrative, lacking the intelligence to guide actual pedagogical outcomes.",
    solution: "Built a platform that acts as an intelligent layer on top of learning, using AI to generate assessments, track engagement across social activities, and provide actionable insights to educators.",
    features: [
      "Generative AI content creation",
      "Socially engaging activities",
      "Nuanced student insights",
      "ERP-grade complexity simplified for users"
    ]
  },
  {
    id: "queso",
    title: "Queso",
    role: "Solo Founder",
    description: "Interactive Learning on the web.",
    url: "https://usequeso.com",
    featured: false,
    tech: ["Interactive Learning", "Chrome Extension", "AI Co-Pilot"],
    logoUrl: "/assets/logos/queso.svg",
    coverUrl: "/assets/covers/queso.mp4",
    longDescription: "Queso transforms passive internet scrolling into active learning. It's an 'all-in-one' platform that accompanies learners everywhere on the web, turning YouTube videos and articles into interactive lessons.",
    problem: "Online learning is often passive—watching videos or reading articles without active engagement or retention checks.",
    solution: "An intelligent overlay that follows the user, offering inline checking, timed modes, note-taking, and an AI co-pilot to ensure understanding in real-time.",
    features: [
      "Inline Mode & Timed Mode",
      "Multimodal Note Taking",
      "AI Co-Pilot",
      "YouTube Learning elevation"
    ]
  },
  {
    id: "nudl",
    title: "Nudl",
    role: "Solo Founder",
    description: "Agentic Product Prototyping.",
    url: "https://trynudl.com/",
    featured: false,
    tech: ["Agentic AI", "Prototyping", "Chrome Extension", "GenAI"],
    logoUrl: "/assets/logos/nudl.svg",
    coverUrl: "/assets/covers/nudl.png",
    longDescription: "Nudl allows product teams to build prototypes by extending their existing, live products rather than starting from scratch in Figma. It's 'Show—don't tell' for scaled product teams.",
    problem: "Recreating existing products in design tools just to prototype a new feature is time-consuming and often inaccurate.",
    solution: "Nudl lets you import your live site or app instantly and use AI to generate new screens, modals, and flows that perfectly match your design system.",
    features: [
      "Import live sites/apps instantly",
      "Generate new screens with AI",
      "Realistic content generation",
      "One-click A/B testing variants"
    ]
  }
];
