import './App.css';
import React, {useState, useEffect} from 'react';
import PanelContainer from '../PanelContainer/PanelContainer'
import { NavLink } from 'react-router-dom';
import { submitSentence, submitWords } from '../../utils/apicalls';
import { findIndices, createNewSentence } from '../../utils/utils';

const App = () => {
  const [originalSentence, setOriginalSentence] = useState('')
  const [newSentence, setNewSentence] = useState('')
  const [totalSentiment, setTotalSentiment] = useState('')
  const [newSentenceSentiment, setNewSentenceSentiment] = useState('')
  const [positiveWords, setPositiveWords] = useState([])
  const [negativeWords, setNegativeWords] = useState([])
  const [currentPanel, setCurrentPanel] = useState('1')
  const [savedSentences, setSavedSentences] = useState([])
  const [timer, setTimer] = useState('')

  const handleSubmit = async(sentence) => {
    console.log("original sentence>>>>",sentence)
    try {
      const {sentiment, positiveTerms, negativeTerms} = await submitSentence(sentence)
      setOriginalSentence(sentence)
      setTotalSentiment(sentiment)
      const {updatedPositiveTerms, updatedNegativeTerms} = await findIndices(positiveTerms, negativeTerms, sentence)
      console.log("These should have updated indices in them>>>", updatedPositiveTerms, updatedNegativeTerms)
      setPositiveWords(updatedPositiveTerms)
      setNegativeWords(updatedNegativeTerms)
      setCurrentPanel('2')
    } catch (err) {
      console.log(err)
    }
  }

  const generateNewSentence = async(directionChange) => {
    let newPositiveWords = []
    let newNegativeWords = []
    if (positiveWords.length) newPositiveWords = await submitWords(positiveWords, directionChange, 'positive')
    if (negativeWords.length) newNegativeWords = await submitWords(negativeWords, directionChange, 'negative')
    console.log(newPositiveWords, newNegativeWords)
    const newSentence = await createNewSentence(originalSentence, newPositiveWords, newNegativeWords)
    // setOriginalSentence('')
    setNewSentence(newSentence)
    setNewSentenceSentiment(directionChange)
    console.log(newSentence)
    setCurrentPanel('3')
  }

  const switchPanels = (content, currentPanel) => {
    let newPanel = '4'
    if (currentPanel === '4') {
      newPanel = '1'
      setOriginalSentence('')
      setNewSentence('')
      setPositiveWords([])
      setNegativeWords([])
      setTotalSentiment('')
      setNewSentenceSentiment('')
    }
    setCurrentPanel(newPanel)
  }

  const saveSentence = () => {
    setSavedSentences([...savedSentences, newSentence])
    console.log('sentence saved')
  }

  return (
    <main>
      <header className='header'>
        <NavLink to='/'><h1>A Better Way To Say That</h1></NavLink>
        <NavLink to ='/my-sentences'>My Best Sentences</NavLink>
      </header>
      <PanelContainer 
        handleSubmit={handleSubmit} 
        currentPanel = {currentPanel}
        totalSentiment={totalSentiment} 
        positiveWords={positiveWords} 
        negativeWords={negativeWords}
        generateNewSentence = {generateNewSentence}
        originalSentence = {originalSentence}
        newSentence = {newSentence}
        switchPanels = {switchPanels}
        saveSentence = {saveSentence}
        newSentenceSentiment = {newSentenceSentiment}
      />
    </main>
  );
}

export default App;
