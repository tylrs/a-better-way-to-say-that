import './App.css';
import React, {useState, useEffect} from 'react';
import PanelContainer from '../PanelContainer/PanelContainer'
import { NavLink } from 'react-router-dom';
import { submitSentence } from '../../utils/apicalls';

const App = () => {
  // const []

  const handleSubmit = async(sentence) => {
    try {
      const result = await submitSentence(sentence)
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main>
      <header className='header'>
        <NavLink to='/'><h1>A Better Way To Say That</h1></NavLink>
        <NavLink to ='/my-sentences'>My Best Sentences</NavLink>
      </header>
      <PanelContainer handleSubmit={handleSubmit} result={['happy', 'bunny', 'angry']}/>
    </main>
  );
}

export default App;
