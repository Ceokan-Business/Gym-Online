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
        const response = await fetch('/api/global-message'); 
        console.log({ response }); 

        if(response.status === 204) { 
          setMessageNull(true); 
          return; 
        }

        const messageResponse = await response.json(); 
        console.log({ messageResponse }); 

        setTextMessage(messageResponse); 
      } catch (err) { 
        console.log("HERE"); 
      }
    }

    getMessageData(); 
  }, [])

  const deleteGlobalMessage = async () => { 
    try { 
      const response = await fetch('/api/global-message', { 
        method: "DELETE", 
        mode: 'cors', 
        headers: { 
          'Content-Type': "application/json"
        }
      }); 

      if(response.ok) { 
        closeMessageSetter(); 
        return; 
      }
    } catch(err) { 
      console.log(err); 
    }
  }

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    setSubmitting(true); 

    const makeRequest = async (action: string) => { 
      try {  
        const response = await fetch("/api/global-message", { 
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

    console.log({ messageNull }); 
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

      <div className = 'flex flex-col w-fit my-4 gap-y-2'>
        <button className = 'submit_button' onClick = { deleteGlobalMessage } > Sterge Mesaj </button>
        <button className = 'default_button' onClick = { closeMessageSetter }> Anuleaza </button>
      </div>
    </section>
  )
}

export default MessageSetter