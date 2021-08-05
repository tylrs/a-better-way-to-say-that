import './PanelContainer.css'
import React from 'react'
import Panel from '../Panel/Panel'
import Form from '../Form/Form'


const PanelContainer = () => {
 
    return (
        <section className='panel-container'>
            <Form />
            <Panel type='2'/>
            <Panel type='3'/>
            <Panel type='4'/>
        </section>
    )
}

export default PanelContainer