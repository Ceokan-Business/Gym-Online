'use client'

import React, { useState } from 'react'; 
import MessageSetter from '@components/Global_Message/MessageSetter';

const DeveloperPanel = () => {
    const [ showMessageSetter, setShowMessageSetter ] = useState <boolean> (false); 

    const closeMessageSetter = () => { 
        setShowMessageSetter(false); 
    }; 

  return (
    <section className = 'h-screen w-screen'>
        <h1> Pagina dedicata administratiei siteului de catre angajatii salii de sport. </h1>
        <div className = 'flex justify-center mt-8'>
            <button 
                type = 'button'
                onClick =  { () => { setShowMessageSetter(true)} }
                className = 'default_button'> Seteaza Mesaj Global </button>
        </div>

        { showMessageSetter && 
            <MessageSetter closeMessageSetter = { closeMessageSetter } /> 
        }
    </section>
  )
}

export default DeveloperPanel; 