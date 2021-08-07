import '../Panel/Panel.css'

import React, {useState} from 'react'

const Form = ({handleSubmit, panel, currentPanel}) => {
    const [sentence, setSentence] = useState('')

    const handleClick = (e) => {
        e.preventDefault()
        handleSubmit(sentence)
        setSentence('')
    }

    return (
        <form className={panel === currentPanel ? 'panel current-panel' : 'panel'}>
            <label>Enter your sentence here</label>
            <input 
                type='text' 
                placeholder='Enter Sentence Here'
                value={sentence} 
                onChange={(e) => setSentence(e.target.value)}
            />
            <button onClick={(e) => handleClick(e)}>Submit</button>
        </form>
    )
}

export default Form