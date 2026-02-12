import { PageTransition } from '../components/PageTransition';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Background } from '../components/Background';
import { StoneStacker } from '../components/StoneStacker';

export const Home = () => {
  return (
    <PageTransition>
      <Background />
      <div className="hidden md:block">
        <StoneStacker />
      </div>
      <div className="flex flex-col items-center md:items-start justify-center min-h-[40vh] max-w-3xl mx-auto relative z-10 text-center md:text-left">
        <div className="m-5 w-full flex justify-center md:justify-start">
          <img 
            src={`${import.meta.env.BASE_URL}assets/profile/profile.png`}
            alt="Arvind Murali" 
            className="w-36 h-36 md:w-64 md:h-64 object-cover"
            style={{
              borderRadius: "40% 30% 60% 40% / 40% 40% 60% 50%"
            }}
          />
        </div>

        <h1 className="!leading-[1.2] text-4xl  md:text-5xl font-serif text-stone-900 mb-8">
          Building <span className="italic text-stone-600">elegant </span>solutions to <span className="italic text-stone-600">complex </span> problems.
        </h1>
        
        <div className="text-md sm:text-lg  text-stone-600 mb-12 md:leading-loose max-w-3xl mx-auto">
          Accomplished Product Leader and award-winning EdTech entrepreneur
          <div className="flex flex-col md:flex-row md:flex-wrap items-center gap-y-2 md:gap-x-3 mt-4">
            <span>AI native with full stack product building experience</span>
            <span className="hidden md:inline text-stone-400">•</span>
            <span>Thrive 0 &rarr; 1</span>
            <span className="hidden md:inline text-stone-400">•</span>
            <span>Strong passion for education & product excellence</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
          <Link to="/projects" className="group flex items-center gap-2 text-stone-900 font-medium border-b border-stone-300 pb-1 hover:border-stone-900 transition-all w-fit">
            View Projects 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/resume" className="group flex items-center gap-2 text-stone-500 font-medium border-b border-stone-200 pb-1 hover:text-stone-800 hover:border-stone-400 transition-all w-fit">
            Read Resume
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};
