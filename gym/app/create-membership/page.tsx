'use client'; 

import { useState } from 'react'; 
import { useRouter } from 'next/navigation';
import { MembershipInterface, initialMembership } from '@interfaces/MembershipInterface';
import MembershipForm from '@components/Membership/MembershipForm';

const CreateMembership = () => {
    const router = useRouter(); 

    const [ submitting, setSubmitting ] = useState <boolean> (false); 
    const [ membership, setMembership ] = useState <MembershipInterface> (initialMembership); 

    const createMembership = async (e: React.FormEvent) => { 
        e.preventDefault(); 
        setSubmitting(true); 
        console.log({ membership }); 

        try { 
            const response = await fetch("/api/create-membership", { 
                method: "POST", 
                mode: "cors", 
                body: JSON.stringify({ title: membership.title, price: membership.price, availableSessions: membership.availableSessions}), 
                headers: { 
                    "Content-Type": "application-json"
                }
            }); 

            if(response.ok) { 
                router.push("/memberships"); 
                return; 
            }
        } catch(err) { 
            console.log(err); 
        } finally { 
            setSubmitting(false); 
        }
    }

  return (
    <MembershipForm 
        type = "Creeaza" 
        submitting = { submitting }
        membership =  { membership }
        setMembership = { setMembership }
        handleSubmit = { createMembership }
    /> 
  )
}

export default CreateMembership