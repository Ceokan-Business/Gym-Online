'use client'; 

import { useState, useEffect } from 'react'; 
import { useSession } from 'next-auth/react';
import { UserInterface } from '@interfaces/UsetInterface';
import { MembershipInterface } from '@interfaces/MembershipInterface';
import { GRADES } from '@global/constants';
import { verifyUserStatus } from '@utils/verifyUserStatus';
import { useRouter } from 'next/navigation';

import Link from 'next/link';

interface Props { 
    user: UserInterface, 
    setUser: React.Dispatch<React.SetStateAction<UserInterface>> 
}

interface OptionsProps { 
  updateMembership: (userid: string, membershipid: string) => void,
  userid: string, 
  cancelUpdate: () => void
}

interface Item { 
  membership: MembershipInterface,
  updateMembership: (userid: string, membershipid: string) => void,
  userid: string
}

const MembershipItem = ({ membership, updateMembership, userid }: Item) => { 
  return ( 
    <div className = 'flex justify-between bg-light-blue w-fit px-2 py-4 my-2 mx-2'>
      <p> { membership.title } </p>
      <p> { membership.price } lei</p>
      <button 
        onClick = { () => { updateMembership(userid, membership._id.toString())}}
        className = 'default_button ml-4 mr-2'> Selecteaza </button>
    </div>
  )
}

const MembershipOptions = ({ updateMembership, userid, cancelUpdate }: OptionsProps) => {
  const [ memberships, setMemberships ] = useState <MembershipInterface []> ([]); 
  const [ loaded, setLoaded ] = useState <boolean> (false); 

  useEffect( () => { 
    const getMembershipData = async () => { 
      const response = await fetch("/api/memberships"); 
      const mResponse = await response.json(); 

      setMemberships(mResponse);
      setLoaded(true); 
    }; 

    getMembershipData(); 
  }, []); 
  return ( 
    <section>
      { !loaded && 
        <p> Loading...</p>
      }

      { loaded && 
        <>
          { memberships.map((membership) => { 
          return( 
            <MembershipItem 
              key = { membership._id.toString() }  
              membership = { membership } 
              updateMembership = { updateMembership } 
              userid = { userid } /> 
          )
        })}

        <button className = 'default_button' onClick = { cancelUpdate }> Anuleaza </button>
        </>
      }
    </section>
  )
} 

const DeveloperProfile = ({ user, setUser }: Props) => {
    const router = useRouter (); 
    const { data: session } = useSession(); 

    const [ showMembershipOptions, setShowMembershipOptions ] = useState <boolean> (false); 
    const [ isAdmin, setIsAdmin ] = useState <boolean> (false); 

    useEffect( () => { 
      async function check () { 
        const checkAdmin = await verifyUserStatus(session?.user?.id); 
        setIsAdmin(checkAdmin)
      }

      check(); 
    }, []); 

    const updateMembership = async (userid: string, membershipid: string) => {  
      const payload = { userid, membershipid }
      console.log(payload)
      try { 
        const response = await fetch(`/api/users/${userid}/select-membership`, { 
          method: "PATCH", 
          mode: "cors", 
          body: JSON.stringify(payload), 
          headers: { 
            "Content-Type": "application/json"
          }
        }); 

        if(response.ok) { 
          router.push(`/user/${userid}`); 
          return; 
        }
      } catch(err) { 
        console.log(err); 
      }
    }

    const cancelUpdate = () => { 
      setShowMembershipOptions(false); 
    }

  return (
    <>
        {/* Daca se afla pe profilul lor si sunt responsabili sau patroni pot creea postari */}
        { session?.user?.id === user._id  && (user.grades.includes(GRADES[4]) || user.grades.includes(GRADES[4])) &&
            <Link href = '/create-post' className = 'default_button'> Create Post </Link>
        }

        {/* Daca utilizatorul este responsabil sau patron ii poate seta userului gradul de membru*/}
        {isAdmin && 
          <button className = 'default_button' onClick = { () => { setShowMembershipOptions(true) }}> Seteaza Abonament </button>
        }

        { showMembershipOptions && 
          <MembershipOptions 
            userid =  { user._id.toString() } 
            updateMembership = { updateMembership }
            cancelUpdate = { cancelUpdate } /> 
        }
    </>
  )
}

export default DeveloperProfile