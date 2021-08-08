import React from 'react';
import Sentence from '../Sentence/Sentence'
import './SavedSentences.css';

const SavedSentences = ({savedSentences}) => {
    const sentences = savedSentences.map(item => 
        <Sentence sentence={item.sentence} sentenceSentiment={item.sentenceSentiment}/>
    )
    return (
        <>
            <h2>Your Saved Sentences</h2>
            <section className='saved-sentences'>
                {sentences}
            </section>
        </>
    )
}

export default SavedSentences