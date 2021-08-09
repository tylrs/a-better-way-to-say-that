import './PanelContainer.css'
import React from 'react'
import Panel from '../Panel/Panel'
import Form from '../Form/Form'
import PropTypes from 'prop-types'


const PanelContainer = (props) => {
    const {
        totalSentiment, 
        currentPanel, 
        positiveWords, 
        negativeWords, 
        handleSubmit, 
        generateNewSentence, 
        originalSentence, 
        newSentence, 
        switchPanels, 
        saveSentence, 
        newSentenceSentiment, 
        savedMessage, 
        error
        } = props

    let panel2 = [
        {type: 'text', content: 'Sentence Analysis:'},
        {type: 'result', content: totalSentiment, styling: totalSentiment},
        {type: 'text', content: 'Change sentence to be more:'},
        {type: 'button', content: 'positive', func: generateNewSentence, styling: 'positive'},
        {type: 'button', content: 'negative', func: generateNewSentence, styling: 'negative'}
    ]

    let positiveSection = [
        {type: 'text', content: `Positive words:`},
        {type: 'words', content: positiveWords}
    ]

    let negativeSection = [
        {type: 'text', content: `Negative words:`},
        {type: 'words', content: negativeWords}
    ]

    if (positiveWords.length && negativeWords.length) {
        negativeSection.forEach((item, index) => {
            panel2.splice(index + 2, 0, item)
        })
        positiveSection.forEach((item, index) => {
            panel2.splice(index + 2, 0, item)
        })
    } else if (positiveWords.length) {
        positiveSection.forEach((item, index) => {
            panel2.splice(index + 2, 0, item)
        })
    } else if (negativeWords.length) {
        negativeSection.forEach((item, index) => {
            panel2.splice(index + 2, 0, item)
        })
    } else {
        panel2 = [
            {type: 'text', content: 'Sentence Analysis:'},
            {type: 'result', content: totalSentiment, styling: totalSentiment},
            {type: 'text', content: 'You did not have any positive or negative words'},
            {type: 'button', content: 'Start over', func: switchPanels}
        ]
    }

    let panel3 = [
        {type: 'text', content: 'Here is your original sentence:'},
        {type: 'result', content: originalSentence, styling: totalSentiment},
        {type: 'text', content: 'Here is your new sentence:'},
        {type: 'result', content: newSentence, styling: newSentenceSentiment},
        {type: 'button', content: 'continue', func: switchPanels},
    ]

    let panel4 = [
        {type: 'text', content: 'Your new sentence:'},
        {type: 'result', content: newSentence, styling: newSentenceSentiment},
        {type: 'text', content: 'You can now:'},
        {type: 'button', content: 'Save this', func: saveSentence},
        {type: 'message', content: 'Sentence Saved!', styling: savedMessage},
        {type: 'button', content: 'Start over', func: switchPanels}
    ]

    return (
        <>
            {error 
            ? <p className='error'>{error}</p>
            : <section className='panel-container'>
                <Form handleSubmit={handleSubmit} panel='1' currentPanel={currentPanel}/>
                <Panel info={panel2} panel='2' currentPanel={currentPanel}/>
                <Panel info={panel3} panel='3' currentPanel={currentPanel}/>
                <Panel info={panel4} panel='4' currentPanel={currentPanel}/>
              </section>
            }
        </>
    )
}

export default PanelContainer

PanelContainer.propTypes = {
    totalSentiment: PropTypes.string,
    currentPanel: PropTypes.string,
    positiveWords: PropTypes.array,
    negativeWords: PropTypes.array,
    handleSubmit: PropTypes.func,
    generateNewSentence: PropTypes.func,
    originalSentence: PropTypes.string,
    newSentence: PropTypes.string,
    switchPanels: PropTypes.func,
    saveSentence: PropTypes.func,
    newSentenceSentiment: PropTypes.string,
    savedMessage: PropTypes.string,
    error: PropTypes.string
}