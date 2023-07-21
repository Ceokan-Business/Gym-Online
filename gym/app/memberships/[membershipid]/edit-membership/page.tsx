'use client'; 
import { useState, useEffect } from 'react'; 
import { MembershipInterface, initialMembership } from '@interfaces/MembershipInterface';
import MembershipForm from '@components/Membership/MembershipForm';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const EditMembership = () => {
    const router = useRouter(); 
    const pathName = usePathname(); 

    const [ submitting, setSubmitting ] = useState <boolean> (false); 
    const [ membership, setMembership ] = useState <MembershipInterface> (initialMembership); 

    function getMembershipID () { 
      return pathName.split("/")[2]; 
    }

    const ID = getMembershipID(); 

    useEffect( () => { 
        const getMembershipData = async() => { 
            const response = await fetch(`/api/memberships/${ID}`, { 
              method: "GET"
            }); 

            const membershipData = await response.json(); 
            console.log({ membershipData })
            setMembership(membershipData); 
        }

        getMembershipData(); 
    }, []); 

    const editMembership = async (e: React.FormEvent) => { 
        e.preventDefault(); 
        setSubmitting(true); 

        try { 
          const response = await fetch(`/api/memberships/${ID}`, { 
            method: "PATCH", 
            mode: "cors", 
            body: JSON.stringify({ title: membership.title, price: membership.price }), 
            headers: { 
              "Content-Type": "application/json", 
            }
          }); 

          if(response.ok) { 
            router.push("/memberships"); 
            return; 
          }
          
        } catch(err) { 
          console.log(err)
        } finally { 
          setSubmitting(false); 
        }
    }
  return (
    <MembershipForm 
      type = "Editeaza"
      membership={ membership }
      setMembership = { setMembership }
      submitting = { submitting }
      handleSubmit = { editMembership}
    /> 
  )
}

export default EditMembership