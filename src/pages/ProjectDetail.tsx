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
          <div className="flex items-center gap-4 mb-6">
            {project.logoUrl && (
              <img src={project.logoUrl} alt={`${project.title} logo`} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
            )}
            <h1 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
              {project.title}
            </h1>
          </div>

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
          
          <div className="flex gap-4 mb-12">
            <a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-lg hover:bg-stone-800 transition-colors"
            >
              Visit Website <ArrowUpRight size={18} />
            </a>
            <Link 
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors"
            >
              Back to Projects
            </Link>
          </div>
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

          {project.coverUrl && (
             <div className="w-full aspect-video rounded-xl overflow-hidden mt-16 border border-stone-200 bg-stone-50 shadow-sm">
               {project.coverUrl.endsWith('.mp4') ? (
                 <video 
                   src={project.coverUrl} 
                   className="w-full h-full object-cover" 
                   autoPlay 
                   muted 
                   loop 
                   playsInline 
                 />
               ) : (
                 <img src={project.coverUrl} alt={`${project.title} cover`} className="w-full h-full object-cover" />
               )}
             </div>
          )}
        </section>
      </div>
    </PageTransition>
  );
};
