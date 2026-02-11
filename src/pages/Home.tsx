import { PageTransition } from '../components/PageTransition';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <PageTransition>
      <div className="flex flex-col justify-center min-h-[60vh] max-w-2xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 mb-8 leading-tight">
          Building calm, intelligent <span className="italic text-stone-500">software</span> for education & mobility.
        </h1>
        
        <p className="text-lg text-stone-600 mb-12 leading-relaxed max-w-xl">
          I’m Arvind. A Product Leader and Engineer specialized in 0-to-1 experiences.
          I build platforms that feel quiet but do powerful things.
        </p>

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
