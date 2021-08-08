import React from 'react';
import Sentence from '../Sentence/Sentence'

const SavedSentences = (props) => {
    const sentences = props.map(sentence => {
        return (
            <Sentence />
        )
    })
    return (
        <section>
            {sentences}
        </section>
    )
}

export default SavedSentences