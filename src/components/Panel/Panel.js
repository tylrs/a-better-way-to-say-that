import './Panel.css'
import React from 'react'
import PropTypes from 'prop-types'

const Panel = ({info, panel, currentPanel}) => {
    const generateWords = (content) => {
        return content.map((word, index) => {
            return (
                <p key={index} className={panel === currentPanel ? `result ${word.wordSentiment}` : `${word.wordSentiment}`}>{word.text}</p>
            )   
        })
    }

    const panelContent = info.map(({type, content, styling, func}, index) => {
        let element;
        switch(type) {
            case 'text':
                element = <h2 key={index}>{content}</h2>
                break;
            case 'result': 
                element = <h3 key={index} className={panel === currentPanel ? `result ${styling}` : undefined}>{content}</h3>
                break;
            case 'button':
                element = <button key={index} onClick={() => func(content, currentPanel)} className={panel === currentPanel ? `current-panel ${styling}` : undefined}>{content}</button>
                break;
            case 'words':
                element = generateWords(content)
                break;   
            case 'message':
                element = <p key={index} className={styling}>{content}</p>
                break;   
            default:
                element = <hr />    
        }
        return element;
    })

    return (
        <article className={panel === currentPanel ? 'panel current-panel' : 'panel'}>
            {panelContent}
        </article>
    )
}

export default Panel

Panel.propTypes = {
    currentPanel: PropTypes.string,
    panel: PropTypes.string,
    info: PropTypes.array
}