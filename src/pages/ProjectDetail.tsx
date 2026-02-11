import { useParams, Navigate } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { PageTransition } from '../components/PageTransition';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <PageTransition>
      <div className="max-w-3xl pb-20">
        <Link to="/projects" className="inline-flex items-center text-stone-400 hover:text-stone-800 mb-8 transition-colors text-sm font-medium">
          <ArrowLeft size={16} className="mr-2" />
          Back to Projects
        </Link>
        
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 leading-tight">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-3 mb-8">
            {project.role && (
              <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded text-sm font-medium">
                {project.role}
              </span>
            )}
            {project.tech?.map((t) => (
              <span key={t} className="bg-white border border-stone-200 text-stone-500 px-3 py-1 rounded text-sm">
                {t}
              </span>
            ))}
          </div>
          
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-lg font-medium text-stone-900 border-b border-stone-800 hover:text-stone-600 hover:border-stone-400 transition-all pb-1"
          >
            Visit Live Site <ArrowUpRight size={18} className="ml-2" />
          </a>
        </header>

        <section className="space-y-12">
          {project.longDescription && (
            <div>
              <p className="text-xl leading-relaxed text-stone-700">
                {project.longDescription}
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-10">
            {project.problem && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">The Challenge</h3>
                <p className="text-stone-600 leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}
            
            {project.solution && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">The Solution</h3>
                <p className="text-stone-600 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}
          </div>

          {project.features && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-6">Key Features</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 rounded-full bg-stone-400 flex-shrink-0"></span>
                    <span className="text-stone-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </PageTransition>
  );
};
