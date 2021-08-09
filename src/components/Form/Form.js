import '../Panel/Panel.css'
import {cleanSentence} from '../../utils/utils'
import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Form = ({handleSubmit, panel, currentPanel}) => {
    const [sentence, setSentence] = useState('')

    const handleClick = (e) => {
        e.preventDefault()
        let cleanedSentence = cleanSentence(sentence)
        handleSubmit(cleanedSentence)
        setSentence('')
    }

    return (
        <form className={panel === currentPanel ? 'panel current-panel' : 'panel'}>
            <textarea 
                type='text' 
                placeholder='Enter Sentence Here'
                value={sentence} 
                onChange={(e) => setSentence(e.target.value)}
                maxLength='50'
            />
            <button onClick={(e) => handleClick(e)}>Submit</button>
        </form>
    )
}

export default Form

Form.propTypes = {
    handleSubmit: PropTypes.func,
    panel: PropTypes.string,
    currentPanel: PropTypes.string
}