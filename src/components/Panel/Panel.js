import './Panel.css'
import React from 'react'

const Panel = ({info, panel, currentPanel}) => {
    const generateWords = (content) => {
        return content.map(word => {
            return (
                <p className={word.wordSentiment}>{word.text}</p>
            )   
        })
    }

    const panelContent = info.map(({type, content, func}) => {
        let element;
        switch(type) {
            case 'text':
                element = <h2>{content}</h2>
                break;
            case 'result': 
                element = <h3>{content}</h3>
                break;
            case 'button':
                element = <button onClick={() => func(content, currentPanel)}>{content}</button>
                break;
            case 'words':
                element = generateWords(content)
                break;   
            default:
                element = <hr />    
        }
        return element;
    })

    console.log(panel, currentPanel)
    return (
        <article className={panel === currentPanel ? 'panel current-panel' : 'panel'}>
            {panelContent}
        </article>
    )
}

export default Panel