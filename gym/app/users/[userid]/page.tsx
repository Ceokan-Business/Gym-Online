'use client'; 

import { useState, useEffect } from 'react'; 
import { PopulatedUserInterface, populatedInitialUser } from '@interfaces/UsetInterface';
import { usePathname } from 'next/navigation'; 
import Profile from '@components/Profile/Profile';


const ProfilePage = () => {
    const pathName = usePathname(); 

    const [ loaded, setLoaded ] = useState <boolean> (false); 

    function extractUserId () { 
        console.log(pathName.split("/")[2])
        return pathName.split("/")[2]; 
    }

    const ID = extractUserId(); 
    const [ user, setUser ] = useState <PopulatedUserInterface>(populatedInitialUser); 

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
                membership = { user.membership.details || null }
            /> 
        }
    </>
  )
}

export default ProfilePage