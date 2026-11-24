import React, { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { PERSON } from '../../data/content.js';
import './Contact.css';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const id = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PERSON.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${PERSON.email}`;
    }
  };

  return (
    <section id="contact" className="section page" aria-labelledby="contact-title">
      <div className="contact">
        <h2 id="contact-title" className="contact-title">
          Hiring for a frontend role, or stuck on a hard UI problem? Write to me.
        </h2>

        <div className="contact-email">
          <a href={`mailto:${PERSON.email}`} className="contact-address">{PERSON.email}</a>
          <button type="button" className="contact-copy" onClick={copy}>
            {copied ? <Check size={16} strokeWidth={2.5} /> : <Copy size={16} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <span className="visually-hidden" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
        </div>

        <ul className="contact-links">
          <li><a href={PERSON.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href={PERSON.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href={PERSON.resume} target="_blank" rel="noopener noreferrer">Résumé (PDF)</a></li>
        </ul>
      </div>

      <footer className="footer">
        <p>Designed and built by Jugal Rajput with React and Vite.</p>
        <a href="https://github.com/itsjxi/portfolio" target="_blank" rel="noopener noreferrer">Source</a>
      </footer>
    </section>
  );
}
