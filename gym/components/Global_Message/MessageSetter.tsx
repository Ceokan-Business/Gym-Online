'use client'

import { useState, useEffect } from 'react' 
import { InputElement } from '@components/Useful/Inputs';

interface Props { 
  closeMessageSetter: () => void 
}
const MessageSetter = ({ closeMessageSetter } : Props) => {
  const [ textMessage, setTextMessage ] = useState<string> (""); 
  const [ submitting, setSubmitting ] = useState<boolean> (false); 

  const handleSubmit = (e: React.FormEvent) => { 
    e.preventDefault(); 
    setSubmitting(true); 

    try { 

    } catch (err) { 
      console.log(err)
    } finally { 
      setSubmitting(true); 
    }
  }
  
  return (
    <section>
      <form onSubmit = { handleSubmit }>
        <InputElement 
          labelTitle = 'Mesaj Global'
          placeholder = '...scrie aici mesajul tau'
          required = { true }
          value = { textMessage }
          executeChange = { (e) => { setTextMessage(e.target.value )}}
        /> 

        <button className = 'submit_button' type = 'submit'> 
          { submitting ? 
            'Seteaza Mesaj...' : 'Seteaza Mesaj'
          }
        </button>
      </form>
      <button className = 'default_button' onClick = { closeMessageSetter }> Anuleaza </button>
    </section>
  )
}

export default MessageSetter