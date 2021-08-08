import React from 'react';

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