import './App.css';
import React, {useState, useEffect} from 'react';
import PanelContainer from '../PanelContainer/PanelContainer'
import { NavLink, Link, Route, Switch } from 'react-router-dom';
import { submitSentence, submitWords } from '../../utils/apicalls';
import { findIndices, createNewSentence } from '../../utils/utils';
import SavedSentences from '../SavedSentences/SavedSentences';

const App = () => {
  const [originalSentence, setOriginalSentence] = useState('')
  const [newSentence, setNewSentence] = useState('')
  const [totalSentiment, setTotalSentiment] = useState('')
  const [newSentenceSentiment, setNewSentenceSentiment] = useState('')
  const [positiveWords, setPositiveWords] = useState([])
  const [negativeWords, setNegativeWords] = useState([])
  const [currentPanel, setCurrentPanel] = useState('1')
  const [savedSentences, setSavedSentences] = useState([])
  const [savedMessage, setSavedMessage] = useState('hidden')
  const [error, setError] = useState('')
  const [timer, setTimer] = useState('')

  const handleSubmit = async(sentence) => {
    console.log("original sentence>>>>",sentence)
    setError('')
    try {
      const {sentiment, positiveTerms, negativeTerms} = await submitSentence(sentence)
      setOriginalSentence(sentence)
      setTotalSentiment(sentiment)
      const {updatedPositiveTerms, updatedNegativeTerms} = await findIndices(positiveTerms, negativeTerms, sentence)
      console.log("These should have updated indices in them>>>", updatedPositiveTerms, updatedNegativeTerms)
      setPositiveWords(updatedPositiveTerms)
      setNegativeWords(updatedNegativeTerms)
      setCurrentPanel('2')
    } catch(err) {
      setError('We\'re sorry, we had trouble submitting your sentence. Please Refresh')
    }
  }

  const generateNewSentence = async(directionChange) => {
    setError('')
    try {
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
    } catch(err) {
      setError('We\'re sorry, we had trouble replacing words in your sentence, please refresh.') 
    }
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
    const newSavedSentence = {
      sentence: newSentence,
      sentenceSentiment: newSentenceSentiment
    }
    setSavedSentences([...savedSentences, newSavedSentence])
    setSavedMessage('displayed')
    setTimer(setTimeout(() => setSavedMessage('hidden'), 3000))
    console.log('sentence saved')
  }

  return (
    <main>
      <header className='header'>
        <Link to='/' className='title'><h1>A Better Way To Say That</h1></Link>
        <NavLink to ='/saved-sentences' className='saved-button'>My Saved Sentences</NavLink>
      </header>
      <Switch>
        <Route exact from='/' render={() => 
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
            savedMessage = {savedMessage}
          />
        }/>
        <Route from='/saved-sentences' render={() => 
          <SavedSentences savedSentences={savedSentences}/>
        }/>
        <Route render={() => 
          <p className='error'>404 Not Found</p>
        }/>
      </Switch>
    </main>
  );
}

export default App;
