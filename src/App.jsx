import React from 'react';
import Nav from './components/nav/Nav.jsx';
import Hero from './components/sections/Hero.jsx';
import Projects from './components/sections/Projects.jsx';
import Experience from './components/sections/Experience.jsx';
import Skills from './components/sections/Skills.jsx';
import Beyond from './components/sections/Beyond.jsx';
import Contact from './components/sections/Contact.jsx';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#work">Skip to projects</a>
      <Nav />
      <main id="top">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Beyond />
        <Contact />
      </main>
    </>
  );
}
