import { PageTransition } from '../components/PageTransition';
import { resumeData } from '../data/resume';

export const Resume = () => {
  return (
    <PageTransition>
      <div className="max-w-3xl">
        <header className="mb-12">
          <h1 className="text-3xl font-serif mb-2">{resumeData.header.name}</h1>
          <div className="text-stone-500 text-sm flex flex-wrap gap-4">
            <span>{resumeData.header.location}</span>
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
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <h3 className="text-xl font-medium text-stone-900">{exp.company}</h3>
                  <span className="text-sm text-stone-400 font-mono">{exp.period}</span>
                </div>
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
