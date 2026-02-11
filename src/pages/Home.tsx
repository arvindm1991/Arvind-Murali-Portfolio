import { PageTransition } from '../components/PageTransition';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <PageTransition>
      <div className="flex flex-col justify-center min-h-[60vh] max-w-2xl">
        <div className="mb-10">
          <img 
            src="/assets/profile/profile.png" 
            alt="Arvind Murali" 
            className="w-48 h-48 md:w-64 md:h-64 object-cover"
            style={{
              borderRadius: "40% 30% 60% 40% / 40% 40% 60% 50%"
            }}
          />
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 mb-8 leading-tight">
          Building <span className="italic text-stone-600">elegant solutions</span> to complex problems.
        </h1>
        
        <div className="text-lg text-stone-600 mb-12 leading-relaxed max-w-2xl">
          Accomplished Product Leader and award-winning EdTech entrepreneur
          <span className="mx-3 text-stone-400">•</span>
          AI native with full stack product building experience
          <span className="mx-3 text-stone-400">•</span>
          Thrive 0 &rarr; 1
          <span className="mx-3 text-stone-400">•</span>
          Strong passion for education & building pedagogically sound solutions
          
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
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
