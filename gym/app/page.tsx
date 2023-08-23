'use client'
import { useState, useEffect } from 'react'; 
import { useSession } from 'next-auth/react';

import { UserInterface, initialUser } from '@interfaces/UsetInterface';

import Feed from "@components/Feed"; 
import Message from "@components/Global_Message/Message";

const Home = () => {
  const { data: session } = useSession(); 
  const [ user, setUser ] = useState <UserInterface> (initialUser); 

  useEffect(() => { 
    const getUserData = async () => { 
      const response = await fetch(`/api/users/${session?.user.id}`);

      const userResponse = await response.json(); 
      console.log({ userResponse }); 
      setUser(userResponse); 
    }

    getUserData(); 
  }, []); 
  return (
    <>
      <Message /> 
      <div>Home</div>
      <Feed /> 
    </>
  )
}

export default Home