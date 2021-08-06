import './App.css';
import React, {useState, useEffect} from 'react';
import PanelContainer from '../PanelContainer/PanelContainer'
import { NavLink } from 'react-router-dom';
import { submitSentence, submitWords } from '../../utils/apicalls';
import { findIndices } from '../../utils/utils';

const App = () => {
  const [originalSentence, setOriginalSentence] = useState('')
  const [newSentence, setNewSentence] = useState('')
  const [totalSentiment, setTotalSentiment] = useState('')
  const [positiveWords, setPositiveWords] = useState([])
  const [negativeWords, setNegativeWords] = useState([])

  const handleSubmit = async(sentence) => {
    console.log("original sentence>>>>",sentence)
    setOriginalSentence(sentence)
    try {
      const {sentiment, positiveTerms, negativeTerms} = await submitSentence(sentence)
      setTotalSentiment(sentiment)
      const {updatedPositiveTerms, updatedNegativeTerms} = findIndices(positiveTerms, negativeTerms, originalSentence)
      setPositiveWords(updatedPositiveTerms)
      setNegativeWords(updatedNegativeTerms)
    } catch (err) {
      console.log(err)
    }
  }

  const generateNewSentence = async(directionChange) => {
    let newPositiveWords, newNegativeWords;
    if (positiveWords.length) newPositiveWords = submitWords(positiveWords, directionChange, 'positive')
    if (negativeWords.length) newNegativeWords = submitWords(negativeWords, directionChange, 'negative')
  }

  return (
    <main>
      <header className='header'>
        <NavLink to='/'><h1>A Better Way To Say That</h1></NavLink>
        <NavLink to ='/my-sentences'>My Best Sentences</NavLink>
      </header>
      <PanelContainer 
        handleSubmit={handleSubmit} 
        totalSentiment={totalSentiment} 
        positiveWords={positiveWords} 
        negativeWords={negativeWords}
        generateNewSentence = {generateNewSentence}
      />
    </main>
  );
}

export default App;
