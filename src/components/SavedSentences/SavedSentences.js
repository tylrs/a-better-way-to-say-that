import React from 'react';
import Sentence from '../Sentence/Sentence'

const SavedSentences = ({savedSentences}) => {
    const sentences = savedSentences.map(item => 
        <Sentence sentence={item.sentence} sentenceSentiment={item.sentenceSentiment}/>
    )
    return (
        <section className='saved-sentences'>
            <h2>Your Saved Sentences</h2>
            {sentences}
        </section>
    )
}

export default SavedSentences