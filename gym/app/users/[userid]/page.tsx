'use client'; 

import { useState, useEffect } from 'react'; 
import { UserInterface, initialUser } from '@interfaces/UsetInterface';
import { usePathname } from 'next/navigation'; 
import Profile from '@components/Profile/Profile';

const ProfilePage = () => {
    const pathName = usePathname(); 

    function extractUserId () { 
        console.log(pathName.split("/")[2])
        return pathName.split("/")[2]; 
    }

    const ID = extractUserId(); 
    const [ user, setUser ] = useState <UserInterface>(initialUser); 

    useEffect( () => { 
        const getUserData = async () => { 
            const response = await fetch(`/api/users/${ID}`); 
            const userResponse = await response.json(); 

            console.log({ userResponse }); 
            setUser(userResponse); 
        }; 

        getUserData(); 
    }, [])

  return (
    <Profile
        user = { user }
        setUser = { setUser }
    /> 
  )
}

export default ProfilePage