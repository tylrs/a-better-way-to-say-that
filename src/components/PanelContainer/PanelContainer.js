import './PanelContainer.css'
import React from 'react'
import Panel from '../Panel/Panel'
import Form from '../Form/Form'


const PanelContainer = ({totalSentiment, polarityWords, handleSubmit}) => {
    let panel2 = [
        {type: 'text', content: 'Wow your sentence was:'},
        {type: 'result', content: totalSentiment},
        {type: 'text', content: `Here are the ${totalSentiment} words in your sentence:`},
        {type: 'words', content: polarityWords},
        {type: 'text', content: 'How would you like to change your sentence?'},
        {type: 'button', content: 'More Positive'},
        {type: 'button', content: 'More Negative'},
        {type: 'button', content: 'Neutral'}
    ]
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