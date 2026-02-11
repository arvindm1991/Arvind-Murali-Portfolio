import { PageTransition } from '../components/PageTransition';
import { projectsData } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';

export const Projects = () => {
  return (
    <PageTransition>
      <div className="max-w-4xl">
        <header className="mb-12">
          <h1 className="text-3xl font-serif mb-4">Featured Work</h1>
          <p className="text-stone-600 text-lg max-w-2xl">
             A collection of products and platforms I've built, focusing on education, AI, and user experience.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
