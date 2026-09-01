import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import HomePage from './pages/homepage';
import Skills from './components/skill';
import Publications from './pages/publications';
import Projects from './pages/projects';
import Achievements from './pages/achievements';
import CV from './pages/cv';
import Dock from './components/Dock';
import './App.css';

function App() {
  smoothscroll.polyfill();

  return (
    <>
      <section id="home">
        <HomePage />
      </section>
      <Skills />
      <section id="publications">
        <Publications />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="achievements">
        <Achievements />
      </section>
      <section id="cv">
        <CV />
      </section>
      <Dock />
    </>
  );
}

export default App;
