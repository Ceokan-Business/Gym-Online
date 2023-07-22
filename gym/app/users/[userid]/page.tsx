'use client'; 

import { useState, useEffect } from 'react'; 
import { UserInterface, initialUser } from '@interfaces/UsetInterface';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation'; 
import Profile from '@components/Profile/Profile';

const ProfilePage = () => {
    const { data: session } = useSession(); 
    const router = useRouter(); 
    const pathName = usePathname(); 

    const [ loaded, setLoaded ] = useState <boolean> (false); 

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
            setLoaded(true); 
        }; 

        getUserData(); 
    }, []); 

  return (
    <>
        { !loaded && 
            <p>Loading...</p>
        }

        { loaded && 
            <Profile
                user = { user }
                setUser = { setUser }
                membership = { user.membership.details }
            /> 
        }
    </>
  )
}

export default ProfilePage