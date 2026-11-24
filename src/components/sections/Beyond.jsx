import React from 'react';
import { BEYOND } from '../../data/content.js';
import './Beyond.css';

export default function Beyond() {
  return (
    <section id="beyond" className="section page" aria-labelledby="beyond-title">
      <header className="section-head">
        <h2 id="beyond-title" className="section-title">Beyond the frontend</h2>
        <p className="section-lead">
          When a feature needs a backend, I build that too. Here is what has shipped, and what I’m
          learning now.
        </p>
      </header>

      <div className="beyond">
        <div className="beyond-shipped">
          <h3 className="beyond-subhead">Used in real projects</h3>
          <ul>
            {BEYOND.shipped.map((s) => {
              const external = s.href.startsWith('http');
              return (
                <li key={s.title} className="beyond-card">
                  <p className="beyond-title">{s.title}</p>
                  <a
                    className="beyond-project"
                    href={s.href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {s.project}
                  </a>
                  <p className="beyond-desc">{s.desc}</p>
                  <p className="beyond-tools">{s.tools}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="beyond-learning">
          <h3 className="beyond-subhead">Learning path</h3>
          <ol>
            {BEYOND.learning.map((l) => (
              <li key={l.name}>
                <span className="learning-dot" aria-hidden="true" />
                <div>
                  <p className="learning-name">{l.name}</p>
                  <p className="learning-note">{l.note}</p>
                  {l.tags && (
                    <ul className="learning-tags">
                      {l.tags.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
