import './PanelContainer.css'
import React from 'react'
import Panel from '../Panel/Panel'
import Form from '../Form/Form'


const PanelContainer = () => {
 
    return (
        <section className='panel-container'>
            <Form />
            <Panel />
            <Panel />
            <Panel />
        </section>
    )
}

export default PanelContainer