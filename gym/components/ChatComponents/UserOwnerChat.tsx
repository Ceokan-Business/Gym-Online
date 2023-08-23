'use client'; 
import { useState, useEffect } from 'react'; 
import { initialMessage, MessageInterface } from '@interfaces/MessageInterface';
import Message from './Message';

import { RiSendPlaneFill } from 'react-icons/ri'; 

interface Props { 
  userId: string 
}

const UserOwnerChat = ({ userId }: Props) => {
  const [ userMessages, setUserMessages ] = useState <MessageInterface []> ([]); 
  const [ newText, setNewText ] = useState<string> (""); 

  // state pentru mesaje fara refresh 
  const [ stateUsername, setStateUsername ] = useState <string> (""); 
  const [ stateImage, setStateImage ] = useState <string> ("");  
  const [ stateMessages, setStateMessages] = useState <Object []> ([])
  
  useEffect( () => { 
    const getMessageData = async () => { 
      const response = await fetch(`/api/users/${userId}/messages`); 
      console.log(response)
      const messageResponse = await response.json(); 

      console.log({ messageResponse });  
      setStateImage(messageResponse.image); 
      setStateUsername(messageResponse.username); 
      setUserMessages(messageResponse.messages)
    }

    getMessageData(); 
  }, []); 

  const sendNewMessage = async () => { 
    try { 
      const response = await fetch(`/api/users/${userId}/messages`, { 
        method: "POST", 
        mode: 'cors', 
        body: JSON.stringify({ text: newText, userId }), 
        headers: { 
          'Content-Type': "application/json"
        }
      }); 

      if(response.ok) { 
        setNewText(""); 
        let stateMessagesUpdate = stateMessages; 

        let frontEndMessage =  { 
          text: newText, 
          username: stateUsername, 
          image: stateImage, 
          sentDate: new Date (), 
        }
        stateMessagesUpdate.push(frontEndMessage); 
      }
    } catch(err) { 
      console.log(err); 
    }
   }
  return (
      <div className="fixed bottom-6 right-0 h-1/2 w-1/4 bg-light-yellow">
        { userMessages.length > 0 && 
          userMessages.map(message => { 
            return ( 
              <Message message = { message } type = { "BACK" } /> 
            )
          })
        }

        { stateMessages.length > 0 && 
          stateMessages.map(message => { 
            return ( 
              <Message message = { message } type = { "FRONT" } /> 
            )
          })
        }
        <form className = 'absolute inset-x-0 bottom-3 h-8 flex justify-center' onSubmit = { sendNewMessage }>
          <input type="text" value = { newText } onChange = { (e) => { setNewText(e.target.value)}} />
          <button type = 'submit'>
            { newText === '' ? 
              <RiSendPlaneFill className = 'text-gray-500 text-3xl'/> : 
              <RiSendPlaneFill className = 'text-black text-3xl'/> 
            }
          </button>
        </form>
      </div>
  );
};

export default UserOwnerChat