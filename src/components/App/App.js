import './App.css';
import React, {useState} from 'react';
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
  const [savedMessage, setSavedMessage] = useState({isDisplayed: 'hidden', message: ''})
  const [error, setError] = useState('')
  const [timer, setTimer] = useState('')

  const handleSubmit = async(sentence) => {
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
      setError('We\'re sorry, we had trouble submitting your sentence, please refresh.')
    }
  }

  const generateNewSentence = async(directionChange) => {
    setError('')
    try {
      let newPositiveWords = []
      let newNegativeWords = []
      if (positiveWords.length) newPositiveWords = await submitWords(positiveWords, directionChange, 'positive')
      if (negativeWords.length) newNegativeWords = await submitWords(negativeWords, directionChange, 'negative')
      const newSentence = await createNewSentence(originalSentence, newPositiveWords, newNegativeWords)
      setNewSentence(newSentence)
      setNewSentenceSentiment(directionChange)
      setCurrentPanel('3')
    } catch(err) {
      setError('We\'re sorry, we had trouble replacing words in your sentence, please refresh.') 
    }
  }

  const switchPanels = (content, currentPanel) => {
    let newPanel = '4'
    if (currentPanel === '4' || currentPanel === '2') {
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
    let alreadySaved = savedSentences.some(sentence => {
      return sentence.sentence === newSavedSentence.sentence
    })
    if (alreadySaved) {
      setSavedMessage({isDisplayed: 'displayed', message: 'You\'ve already saved this message'})
      setTimer(setTimeout(() => setSavedMessage({isDisplayed: 'hidden', message: ''}), 3000))
    } else {
      setSavedSentences([...savedSentences, newSavedSentence])
      setSavedMessage({isDisplayed: 'displayed', message: 'Successfully Saved'})
      setTimer(setTimeout(() => setSavedMessage({isDisplayed: 'hidden', message: ''}), 3000))
    }
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
            error = {error}
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
