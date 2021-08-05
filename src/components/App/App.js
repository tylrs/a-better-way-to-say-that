import './App.css';
import React, {useState, useEffect} from 'react';
import PanelContainer from '../PanelContainer/PanelContainer'
import { NavLink } from 'react-router-dom';

const App = () => {
  return (
    <main>
      <header>
        <NavLink to='/'><h1>A Better Way To Say That</h1></NavLink>
        <NavLink to ='/my-sentences'>My Best Sentences</NavLink>
      </header>
      <h4>1, 2, 3, 4</h4>
      <section>
        <PanelContainer />
      </section>
    </main>
  );
}

export default App;
