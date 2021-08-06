import './App.css';
import React, {useState, useEffect} from 'react';
import PanelContainer from '../PanelContainer/PanelContainer'
import { NavLink } from 'react-router-dom';
import { submitSentence } from '../../utils/apicalls';

const App = () => {
  const [originalSentence, setOriginalSentence] = useState('')
  const [totalSentiment, setTotalSentiment] = useState('')
  const [positiveWords, setPositiveWords] = useState([])
  const [negativeWords, setNegativeWords] = useState([])

  const handleSubmit = async(sentence) => {
    setOriginalSentence(sentence)
    try {
      const {sentiment, positiveTerms, negativeTerms} = await submitSentence(sentence)
      setTotalSentiment(sentiment)
      setPositiveWords(positiveTerms)
      setNegativeWords(negativeTerms)
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
      <PanelContainer handleSubmit={handleSubmit} totalSentiment={totalSentiment} positiveWords={positiveWords} negativeWords={negativeWords}/>
    </main>
  );
}

export default App;
