import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PERSON } from '../../data/content.js';
import './Nav.css';

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [active, setActive] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState(null);
  const listRef = useRef(null);

  // Scroll spy: the last section whose top has passed the nav is the active one.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      let current = null;
      for (const { id } of LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Slide the highlight behind the active link, like a segmented control.
  useLayoutEffect(() => {
    const measure = () => {
      const el = active && listRef.current?.querySelector(`[data-id="${active}"]`);
      setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner page">
        <a href="#top" className="nav-mark">
          <span className="nav-mark-badge" aria-hidden="true">JR</span>
          <span className="nav-mark-name">Jugal Rajput</span>
        </a>

        <nav aria-label="Sections" className="nav-segment">
          <ul ref={listRef}>
            {pill && (
              <span
                className="nav-pill"
                aria-hidden="true"
                style={{ transform: `translateX(${pill.left}px)`, width: pill.width }}
              />
            )}
            {LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  data-id={id}
                  className={active === id ? 'is-active' : ''}
                  aria-current={active === id ? 'true' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="nav-resume" href={PERSON.resume} target="_blank" rel="noopener noreferrer">
          Résumé
        </a>
      </div>
    </header>
  );
}
