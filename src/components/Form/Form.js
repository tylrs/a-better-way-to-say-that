import '../Panel/Panel.css'
import React, {useState} from 'react'

const Form = ({handleSubmit}) => {
    const [sentence, setSentence] = useState('')

    return (
        <form className='panel'>
            <label>Enter your sentence here</label>
            <input 
                type='text' 
                placeholder='Enter Sentence Here'
                value={sentence} 
                onChange={(e) => setSentence(e.target.value)}
            />
            <button onClick={(e) => handleSubmit(e, sentence)}>Submit</button>
        </form>
    )
}

export default Form