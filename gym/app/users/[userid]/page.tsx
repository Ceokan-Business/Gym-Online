'use client'; 

import { useState, useEffect } from 'react'; 
import { PopulatedUserInterface, initialUser } from '@interfaces/UsetInterface';
import { usePathname, useRouter } from 'next/navigation'; 
import Profile from '@components/Profile/Profile';


const ProfilePage = () => {
    const router = useRouter(); 
    const pathName = usePathname(); 

    const [ loaded, setLoaded ] = useState <boolean> (false); 

    function extractUserId () { 
        console.log(pathName.split("/")[2])
        return pathName.split("/")[2]; 
    }

    const ID = extractUserId(); 
    const [ user, setUser ] = useState <PopulatedUserInterface>(initialUser); 

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