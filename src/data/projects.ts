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
  productNuances?: {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
  }[];
}

export const projectsData: Project[] = [
  {
    id: "collabsignal",
    title: "CollabSignal",
    role: "Co-founder & CEO",
    description: "AI oversight interviews that reveal how engineers clarify, steer, verify, and own AI-generated code.",
    url: "https://collabsignal.ai/",
    featured: true,
    tech: ["AI Hiring", "Product Strategy", "Agentic IDE", "Evaluation Design"],
    logoUrl: "/assets/collabsignal/favicon.svg",
    coverUrl: "/assets/collabsignal/bug-injection-setup.png",
    longDescription: "CollabSignal is built around a specific product thesis: in an AI-native interview, the most useful signal is not code output alone. It is whether a candidate asks the right product questions, supervises AI output, catches realistic mistakes, and owns the final implementation.",
    problem: "AI-assisted coding makes final submissions look deceptively similar. Hiring teams need to see judgment, verification discipline, and product sense while candidates work.",
    solution: "We designed interview mechanics that reveal the process: a PM agent with hidden constraints, controlled bug injection, live oversight, and reports that translate behavior into hiring evidence.",
    features: [
      "Bug injection tests review discipline",
      "PM agent reveals clarification habits",
      "Live monitor exposes workflow choices",
      "Reports connect evidence to hiring decisions"
    ],
    productNuances: [
      {
        title: "Bug injection as a judgment test",
        description: "The feature adds realistic AI mistakes with difficulty, category, cutoff, and spacing controls. That lets teams test review discipline without turning the interview into a trick.",
        imageUrl: "/assets/collabsignal/bug-injection-setup.png",
        imageAlt: "CollabSignal bug injection setup with difficulty, cutoff, turn gap, and bug categories"
      },
      {
        title: "PM agent for ambiguity",
        description: "The PM agent answers only when candidates ask. Hidden constraints make product discovery measurable across scope, policy, workflows, edge cases, and launch tradeoffs.",
        imageUrl: "/assets/collabsignal/pm-agent-setup.png",
        imageAlt: "CollabSignal PM agent setup showing hidden constraints that are revealed only when asked"
      },
      {
        title: "Live oversight without interrupting",
        description: "Interviewers can see prompts, edits, tests, and terminal behavior while the work unfolds, separating deliberate supervision from passive delegation.",
        imageUrl: "/assets/collabsignal/live-monitor.png",
        imageAlt: "CollabSignal live monitor showing candidate activity during an AI-assisted coding round"
      },
      {
        title: "Report layer that explains the signal",
        description: "The report shows injected defects, caught and missed bugs, expected fixes, and review analysis so the decision is grounded in process evidence.",
        imageUrl: "/assets/collabsignal/report-full-analysis-live.png",
        imageAlt: "CollabSignal full analysis report showing candidate summary, CSQ score, radar chart, and dimension scores"
      }
    ]
  },
  {
    id: "readable-english",
    title: "Readable English",
    role: "Director of Product & Engineering",
    description: "Revamped web offering and introduced AI-powered experiences including a B2C App with agentic AI interventions.",
    url: "https://readablenglish.com/",
    featured: true,
    tech: ["AI", "Learning Systems", "Web Extension", "Mobile App"],
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
    tech: ["GenAI", "SaaS", "Learning Platform", "Analytics"],
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
    problem: "Online learning is often passive: watching videos or reading articles without active engagement or retention checks.",
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
    longDescription: "Nudl allows product teams to build prototypes by extending their existing, live products rather than starting from scratch in Figma. It's 'Show, don't tell' for scaled product teams.",
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
