import { PageTransition } from '../components/PageTransition';
import { resumeData } from '../data/resume';

export const Resume = () => {
  return (
    <PageTransition>
      <div className="max-w-3xl">
        <header className="mb-12">
          <h1 className="text-3xl font-serif mb-2">{resumeData.header.name}</h1>
          <div className="text-stone-500 text-sm flex flex-wrap gap-x-4 gap-y-1">
            <a href={resumeData.header.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 transition-colors underline underline-offset-2">{resumeData.header.website}</a>
            <span>LinkedIn - <a href={resumeData.header.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 transition-colors underline underline-offset-2">{resumeData.header.linkedin}</a></span>
            <span>{resumeData.header.email}</span>
            <span>{resumeData.header.phone}</span>
          </div>
        </header>

        <section className="mb-12">
          <p className="text-lg leading-relaxed text-stone-700">
            {resumeData.summary}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-6 border-b border-stone-200 pb-2">Experience</h2>
          <div className="space-y-10">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="group">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                  <h3 className="text-xl font-medium text-stone-900">{exp.company}</h3>
                  <span className="text-sm text-stone-400 font-mono">{exp.period}</span>
                </div>
                {exp.subtitle && (
                  <p className="text-sm text-stone-500 italic mb-1">{exp.subtitle}</p>
                )}
                <div className="text-stone-600 font-medium mb-3">{exp.role}</div>
                <p className="text-stone-600 leading-relaxed mb-4">{exp.description}</p>
                {exp.highlights && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-stone-600">
                    {exp.highlights.map((highlight, hIndex) => (
                      <li key={hIndex}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-6 border-b border-stone-200 pb-2">Skills</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {resumeData.skills.map((skillGroup, index) => (
              <div key={index}>
                <h3 className="font-medium text-stone-900 mb-3">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, sIndex) => (
                    <span key={sIndex} className="bg-stone-100 px-2 py-1 rounded text-sm text-stone-600">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-6 border-b border-stone-200 pb-2">Work History</h2>
          <div className="space-y-4">
            {resumeData.workHistory.map((job, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <div>
                  <span className="font-medium text-stone-900">{job.company}</span>
                  <span className="text-stone-500 ml-2">— {job.role}</span>
                </div>
                <span className="text-sm text-stone-400 font-mono">{job.period}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-6 border-b border-stone-200 pb-2">Side Projects</h2>
          <div className="space-y-6">
            {resumeData.sideProjects.map((project, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium text-stone-900">{project.name}</h3>
                <p className="text-stone-600 mb-1">{project.description}</p>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm text-stone-500 hover:text-stone-900 transition-colors underline underline-offset-2">
                  {project.url.replace('https://', '')}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-6 border-b border-stone-200 pb-2">Achievements</h2>
          {resumeData.achievements.map((achievement, index) => (
            <div key={index}>
              <h3 className="font-medium text-stone-900">{achievement.title}</h3>
              <p className="text-stone-600">{achievement.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-6 border-b border-stone-200 pb-2">Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-medium text-stone-900">{edu.institution}</h3>
                <span className="text-sm text-stone-400 font-mono">{edu.period}</span>
              </div>
              <p className="text-stone-600">{edu.degree}</p>
            </div>
          ))}
        </section>
      </div>
    </PageTransition>
  );
};
