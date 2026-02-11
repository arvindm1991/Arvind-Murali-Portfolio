import { PageTransition } from '../components/PageTransition';

export const Misc = () => {
  return (
    <PageTransition>
      <div className="max-w-3xl">
        <header className="mb-12">
          <h1 className="text-3xl font-serif mb-4">Automotive & Engineering</h1>
          <p className="text-stone-600 text-lg">
            Before my journey in EdTech, I spent several years in the automotive sector, focusing on data analytics and automated testing.
          </p>
        </header>

        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-serif text-stone-900 mb-4">Peloton Technology (2018 - 2020)</h2>
            <div className="prose prose-stone text-stone-600">
              <p>
                At Peloton, I spearheaded the core value proposition of fuel savings in the autonomous vehicle sector. My work involved:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                 <li>Driving product strategy and customer engagement for fuel economy features.</li>
                 <li>Leading customer education initiatives using advanced data analytics to demonstrate value.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-serif text-stone-900 mb-4">Roush & Cummins (2014 - 2018)</h2>
            <div className="prose prose-stone text-stone-600">
              <p>
                As a Senior Development Engineer, I focused on efficiency and automation:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                 <li>Architected automated testing platforms that achieved &gt;$1M in cost savings.</li>
                 <li>Developed advanced data analysis tools that reduced analysis time from weeks to hours, significantly accelerating agile iterations in hardware/software development loops.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};
