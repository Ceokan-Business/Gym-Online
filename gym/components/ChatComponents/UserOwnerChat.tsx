'use client'; 
import { useState, useEffect } from 'react'; 
import { MessageInterface } from '@interfaces/MessageInterface';

import { RiSendPlaneFill } from 'react-icons/ri'; 

interface Props { 
  userId: string 
}

const UserOwnerChat = ({ userId }: Props) => {
  const [ userMessages, setUserMessages ] = useState <MessageInterface []> ([]); 
  const [ newText, setNewText ] = useState<string> (""); 
  
  useEffect( () => { 
    const getMessageData = async () => { 
      const response = await fetch(`/api/users/${userId}/messages`); 
      const messageResponse = await response.json(); 

      setUserMessages(messageResponse); 
    }
  }); 

  const sendNewMessage = async () => { 
    try { 

    } catch(err) { 
      console.log(err); 
    }
   }
  return (
      <div className="fixed bottom-6 right-0 h-1/2 w-1/4 bg-light-yellow">
        <p> { userId } </p>
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