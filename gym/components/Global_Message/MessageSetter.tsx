'use client'

import { useState, useEffect } from 'react' 
import { InputElement } from '@components/Useful/Inputs';

interface Props { 
  closeMessageSetter: () => void 
}
const MessageSetter = ({ closeMessageSetter } : Props) => {
  const [ textMessage, setTextMessage ] = useState<string> (""); 
  const [ submitting, setSubmitting ] = useState<boolean> (false); 
  const [ messageNull, setMessageNull ] = useState<boolean> (false); 

  useEffect( () => { 
    const getMessageData = async () => { 
      try  {
        const response = await fetch('/api/developer-panel'); 
        const messageResponse = await response.json(); 

        if(messageResponse === null) { 
          setMessageNull(true); 
          return; 
        }

        setTextMessage(messageResponse); 
        return; 
      } catch (err) { 
        console.log(err); 
      }
    }

    getMessageData(); 
  }, [])

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    setSubmitting(true); 

    const makeRequest = async (action: string) => { 
      try {  
        const response = await fetch("/api/developer-panel", { 
          method: action, 
          mode: 'cors', 
          body: JSON.stringify({ text: textMessage }), 
          headers: { 
            'Content-Type': "application/json"
          }
        }); 

        if(response.ok) { 
          closeMessageSetter(); 
          return; 
        }
      } catch (err) { 
        console.log(err); 
      }
    }

    try { 
      if(messageNull) { 
        makeRequest("POST")
      } else { 
        makeRequest("PATCH")
      }; 
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