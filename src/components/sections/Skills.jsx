import React from 'react';
import { TOOLKIT } from '../../data/content.js';
import './Skills.css';

export default function Skills() {
  return (
    <section id="toolkit" className="section page" aria-labelledby="toolkit-title">
      <header className="section-head">
        <h2 id="toolkit-title" className="section-title">Toolkit</h2>
        <p className="section-lead">What I reach for, grouped by the job it does.</p>
      </header>
      <div className="toolkit">
        {TOOLKIT.map((g) => (
          <div key={g.group} className="tool-group">
            <h3>{g.group}</h3>
            <ul>
              {g.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
