import React from 'react'

const Sentence = ({sentence, sentenceSentiment}) => {
    return (
        <article>
            <h3>{sentence}</h3>
            <h3>{sentenceSentiment}</h3>
        </article>
    )
}

export default Sentence