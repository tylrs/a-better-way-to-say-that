import './Panel.css'
import React from 'react'

const Panel = (props) => {
    let panelContent;
    switch (props.type) {
        case '2':
            panelContent = 
                <>
                    <h2>Wow your sentence was:</h2>
                    <p>Positive</p>
                    <hr />
                    <h3>Here are the positive words in your sentence:</h3>
                    <p>happy, bunnies</p>
                    <hr />
                    <h3>How would you like to change your sentence?</h3>
                    <button>More Positive</button>
                    <button>More Negative</button>
                    <button>Random</button>
                </>
            break;   
        case '3': 
            panelContent = 
                <>  
                    <h2>Here's your new sentence:</h2>
                    <p>Bunnies make me sad and feel scared</p>
                    <button>Save this sentence</button>
                </>
            break;
        case '4':
            panelContent = 
                <>
                    <h2>You can now:</h2>
                    <button>Try Again with Same Sentence</button>
                    <button>Change a new sentence</button>
                </>
            break;  
        default: 
            panelContent = <p>Error</p>
    }



    return (
        <article className='panel'>
            {panelContent}
        </article>
    )
}

export default Panel