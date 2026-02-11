import { Project } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link 
        to={`/projects/${project.id}`}
        className="block group h-full"
      >
        <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              {project.logoUrl && (
                <img src={project.logoUrl} alt={`${project.title} logo`} className="w-8 h-8 object-contain rounded-md" />
              )}
              <h3 className="text-xl font-serif text-stone-900 group-hover:text-stone-600 transition-colors">
                {project.title}
              </h3>
            </div>
            <ArrowUpRight size={18} className="text-stone-400 group-hover:text-stone-900 transition-colors" />
          </div>
        
        {project.role && (
          <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
            {project.role}
          </div>
        )}
        
        <p className="text-stone-600 mb-6 flex-1 leading-relaxed">
          {project.description}
        </p>
        
        {project.tech && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((t) => (
              <span key={t} className="text-xs bg-stone-100 text-stone-500 px-2 py-1 rounded">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      </Link>
    </motion.div>
  );
};
