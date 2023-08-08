'use client'; 

import { useState , useEffect} from 'react'; 
import { useSession } from 'next-auth/react';
import MessageSetter from './MessageSetter';

import { verifyOwnerStatus } from '@utils/verifyUserStatus';

import { GlobalMessageInterface, initialGlobalMessage } from '@interfaces/GlobalMessageInterface';

const Message = () => {
    const { data: session } = useSession(); 
    const [ globalMessage, setGlobalMessage ] = useState <GlobalMessageInterface> (initialGlobalMessage); 
    const [ isAdmin, setIsAdmin ] = useState <boolean> (false); 

    useEffect( () => { 
        const getMessageData = async () => { 
            try { 
                const response = await fetch('/api/global_message'); 
                const messResponse = await response.json(); 

                setGlobalMessage(messResponse); 

                const checkAdmin = await verifyOwnerStatus(session?.user?.id)
                setIsAdmin(checkAdmin); 
            } catch(err) { 
                console.log(err); 
            }
        }; 

        getMessageData(); 
    }, [])

  return (
    <section>
        { globalMessage.text != "" && 
            <p className = 'py-4 bg-light-yellow'> { globalMessage.text } </p>
        }
    </section>
  )
}

export default Message; 