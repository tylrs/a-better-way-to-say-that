import React from 'react'
import './Sentence.css'

const Sentence = ({sentence, sentenceSentiment}) => {
    return (
        <article className='sentence'>
            <h3>Your Sentence</h3>
            <p>{sentence}</p>
            <h4>Your Sentence Sentiment</h4>
            <p>{sentenceSentiment}</p>
        </article>
    )
}

export default Sentence