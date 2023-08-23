'use client'; 
import { useState, useEffect } from 'react'; 
import { MessageInterface } from '@interfaces/MessageInterface';

interface Props { 
  userId: string 
}

const UserOwnerChat = ({ userId }: Props) => {
  const [ userMessages, setUserMessages ] = useState <MessageInterface []> ([]); 

  useEffect( () => { 
    const getMessageData = async () => { 
      const response = await fetch(`/api/users/${userId}/messages`); 
      const messageResponse = await response.json(); 

      setUserMessages(messageResponse); 
    }
  })
  return (
      <div className="fixed bottom-0 right-0 h-1/2 w-1/4 bg-light-yellow">
        <p> { userId } </p>
      </div>
  );
};

export default UserOwnerChat