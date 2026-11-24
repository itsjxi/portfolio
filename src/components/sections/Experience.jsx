import React, { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { EXPERIENCE } from '../../data/content.js';
import './Experience.css';

function WorkCard({ item }) {
  return (
    <li>
      <p className="work-title">{item.title}</p>
      <p className="work-desc">{item.desc}</p>
      {item.metric && <p className="work-metric">{item.metric}</p>}
    </li>
  );
}

function Job({ job }) {
  const [open, setOpen] = useState(false);
  const moreId = useId();

  return (
    <li className="job">
      <div className="job-side">
        <p className="job-company">{job.company}</p>
        <p className="job-period">{job.period}</p>
      </div>
      <div className="job-main">
        <h3 className="job-role">{job.role}</h3>
        <p className="job-summary">{job.summary}</p>
        <ul className="job-work">
          {job.work.map((w) => <WorkCard key={w.title} item={w} />)}
        </ul>

        {job.more && (
          <>
            <ul id={moreId} className="job-work job-more" hidden={!open}>
              {job.more.map((w) => <WorkCard key={w.title} item={w} />)}
            </ul>
            <button
              type="button"
              className="more-toggle"
              aria-expanded={open}
              aria-controls={moreId}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? 'Show less' : `Also shipped (${job.more.length})`}
              <ChevronDown size={16} strokeWidth={2.25} className="more-toggle-icon" aria-hidden="true" />
            </button>
          </>
        )}

        <p className="job-stack">{job.stack}</p>
      </div>
    </li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section page" aria-labelledby="experience-title">
      <header className="section-head">
        <h2 id="experience-title" className="section-title">Experience</h2>
        <p className="section-lead">
          From internal tools at a manufacturer to the AI features of a marketing platform.
        </p>
      </header>
      <ol className="jobs">
        {EXPERIENCE.map((job) => <Job key={job.company} job={job} />)}
      </ol>
    </section>
  );
}
