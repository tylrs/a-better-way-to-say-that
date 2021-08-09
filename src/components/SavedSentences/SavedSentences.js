import React from 'react';
import Sentence from '../Sentence/Sentence';
import './SavedSentences.css';
import PropTypes from 'prop-types';

const SavedSentences = ({savedSentences}) => {
    const sentences = savedSentences.map(item => 
        <Sentence sentence={item.sentence} sentenceSentiment={item.sentenceSentiment}/>
    )
    return (
        <>
            {sentences.length 
            ? <>
                <h2 className='saved-sentences-title'>Your Saved Sentences</h2>
                <section className='saved-sentences'>
                    {sentences}
                </section>
              </>
            : <p className='error'>No saved sentences yet. Go back and add some!</p>
            }   
        </>
    )
}

export default SavedSentences

SavedSentences.propTypes = {
    savedSentences: PropTypes.array
}