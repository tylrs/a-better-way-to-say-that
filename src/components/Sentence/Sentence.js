import React from 'react';
import './Sentence.css';
import PropTypes from 'prop-types';

const Sentence = ({sentence, sentenceSentiment}) => {
    return (
        <article className='sentence'>
            <h3>Your Sentence</h3>
            <p className={sentenceSentiment}>{sentence}</p>
            <h4>Your Sentence Sentiment</h4>
            <p className={sentenceSentiment}>{sentenceSentiment}</p>
        </article>
    )
}

export default Sentence

Sentence.propTypes = {
    sentence: PropTypes.string,
    sentenceSentiment: PropTypes.string
}