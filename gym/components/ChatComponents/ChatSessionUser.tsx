'use client'; 
import { useSession } from "next-auth/react";
import UserOwnerChat from "./UserOwnerChat";

const ChatSessionUser = () => {
    const { data: session } = useSession(); 

  return (
    <>
        { session?.user && 
            <UserOwnerChat userId = { session?.user?.id } /> 
        }
    </>
  )
}

export default ChatSessionUser