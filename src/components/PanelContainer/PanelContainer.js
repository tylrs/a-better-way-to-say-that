import './PanelContainer.css'
import React from 'react'
import Panel from '../Panel/Panel'
import Form from '../Form/Form'


const PanelContainer = ({totalSentiment, positiveWords, negativeWords, handleSubmit, generateNewSentence}) => {
    let panel2 = [
        {type: 'text', content: 'Wow your sentence was:'},
        {type: 'result', content: totalSentiment},
        {type: 'text', content: 'Would you like your sentence to be more....'},
        {type: 'button', content: 'positive', func: generateNewSentence},
        {type: 'button', content: 'negative', func: generateNewSentence},
        {type: 'button', content: 'neutral', func: generateNewSentence}
    ]

    let positiveSection = [
        {type: 'text', content: `Here are the positive words in your sentence:`},
        {type: 'words', content: positiveWords}
    ]

    let negativeSection = [
        {type: 'text', content: `Here are the negative words in your sentence:`},
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
        let neutralMessage = {
            type: 'text',
            content: 'You did not have any positive or negative words'
        }
        panel2.splice(2, 0, neutralMessage)
    }

    let panel3 = [
        {type: 'text', content: 'Here is your new sentence:'},
        {type: 'result', content: 'Banana'},
        {type: 'button', content: 'Save this sentence'}
    ]
    let panel4 = [
        {type: 'text', content: 'You can now:'},
        {type: 'button', content: 'Change a new sentence'},
        {type: 'button', content: 'Try again with same sentence'}
    ]

    return (
        <section className='panel-container'>
            <Form handleSubmit={handleSubmit}/>
            <Panel info={panel2}/>
            <Panel info={panel3}/>
            <Panel info={panel4}/>
        </section>
    )
}

export default PanelContainer