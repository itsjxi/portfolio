import React from 'react';
import { Lock } from 'lucide-react';
import { PROJECTS, MORE_PROJECTS } from '../../data/content.js';
import './Projects.css';

export default function Projects() {
  return (
    <section id="work" className="section page" aria-labelledby="work-title">
      <header className="section-head">
        <h2 id="work-title" className="section-title">Selected work</h2>
        <p className="section-lead">
          Four projects I rebuilt from scratch to production quality, each with tests, accessibility
          checks and a live demo you can open.
        </p>
      </header>

      <div className="cases">
        {PROJECTS.map((p, i) => (
          <Case key={p.id} project={p} flip={i % 2 === 1} />
        ))}
      </div>

      <div className="more">
        <h3 className="more-title">Also on GitHub</h3>
        <ul className="more-list">
          {MORE_PROJECTS.map((p) => (
            <li key={p.title}>
              <a href={p.github} target="_blank" rel="noopener noreferrer">
                <span className="more-name">{p.title}</span>
                <span className="more-desc">{p.desc}</span>
                <span className="more-cta">View code</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Case({ project: p, flip }) {
  return (
    <article
      id={p.id}
      className={`case ${flip ? 'is-flipped' : ''}`}
      style={{ '--tint': p.tint, '--ink-accent': p.ink }}
      aria-labelledby={`${p.id}-title`}
    >
      <a
        className="case-visual"
        href={p.demo}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="browser">
          <div className="browser-bar">
            <span className="browser-dots"><i /><i /><i /></span>
            <span className="browser-url">
              <Lock size={11} strokeWidth={2.5} />
              {p.url}
            </span>
          </div>
          <img src={p.image} alt="" width="1200" height="750" loading="lazy" decoding="async" />
        </div>
      </a>

      <div className="case-copy">
        <p className="case-kind">{p.kind}</p>
        <h3 id={`${p.id}-title`} className="case-title">{p.title}</h3>
        <p className="case-summary">{p.summary}</p>

        <dl className="case-stats">
          {p.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="case-points">
          {p.points.map((pt) => <li key={pt}>{pt}</li>)}
        </ul>

        <p className="case-stack">{p.stack}</p>

        <div className="case-actions">
          <a className="btn btn-primary btn-sm" href={p.demo} target="_blank" rel="noopener noreferrer">
            Open live demo<span className="visually-hidden"> of {p.title}</span>
          </a>
          <a className="btn btn-quiet btn-sm" href={p.github} target="_blank" rel="noopener noreferrer">
            View code<span className="visually-hidden"> for {p.title}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
