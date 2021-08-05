import '../Panel/Panel.css'
import React from 'react'

const Form = () => {
    return (
        <form className='panel'>
            <label>Enter your sentence here</label>
            <input type='text'></input>
            <button>Submit</button>
        </form>
    )
}

export default Form