import { useParams, Navigate } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { PageTransition } from '../components/PageTransition';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectMedia = ({ src, title }: { src: string; title: string }) => (
  <figure className="overflow-hidden rounded-xl border border-stone-200 bg-white p-3 shadow-sm">
    <div className="overflow-hidden rounded-lg bg-stone-50">
      {src.endsWith('.mp4') ? (
        <video
          src={src}
          className="aspect-video w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img
          src={src}
          alt={`${title} product preview`}
          className="aspect-video w-full object-contain"
          loading="lazy"
        />
      )}
    </div>
  </figure>
);

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.find((p) => p.id === id);
  const hasProductNuances = Boolean(project?.productNuances?.length);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <PageTransition>
      <div className={`${hasProductNuances ? 'max-w-5xl' : 'max-w-3xl'} pb-20`}>
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
              <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-md text-sm font-medium">
                {project.role}
              </span>
            )}
            {project.tech?.map((t) => (
              <span key={t} className="bg-white border border-stone-200 text-stone-500 px-3 py-1 rounded-md text-sm">
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

          {project.features && !hasProductNuances && (
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

          {project.coverUrl && !hasProductNuances && (
            <ProjectMedia src={project.coverUrl} title={project.title} />
          )}

          {project.productNuances && (
            <div className="space-y-6">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-serif text-stone-900 mb-3">Product nuance</h2>
                <p className="text-stone-600 leading-relaxed">
                  The CollabSignal work I want to showcase is the product design beneath the surface: how each mechanic turns an AI-assisted interview into evidence of judgment.
                </p>
              </div>

              <div className="space-y-6">
                {project.productNuances.map((nuance, index) => (
                  <article
                    key={nuance.title}
                    className="grid gap-6 rounded-xl border border-stone-200 bg-white p-4 shadow-sm lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:p-6"
                  >
                    <div className={`flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <h3 className="text-2xl font-serif text-stone-900 mb-3">{nuance.title}</h3>
                      <p className="text-stone-600 leading-relaxed">{nuance.description}</p>
                    </div>
                    <figure className="flex items-center overflow-hidden rounded-lg border border-stone-200 bg-stone-50">
                      <img
                        src={nuance.imageUrl}
                        alt={nuance.imageAlt}
                        className="max-h-[520px] w-full object-contain"
                        loading="lazy"
                      />
                    </figure>
                  </article>
                ))}
              </div>
            </div>
          )}

        </section>
      </div>
    </PageTransition>
  );
};
