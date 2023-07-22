'use client'; 
import { useState } from 'react'; 
import { TextAreaElement } from '@components/Useful/Inputs'; 

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Props { 
    userid: string, 
}

const StopMembershipForm = ({ userid }: Props ) => {
    const { data: session } = useSession(); 
    const router = useRouter(); 

    const [ whyText, setWhyText ] = useState <string> (""); 
    const cancelMembership = async (e: React.FormEvent) => { 
        e.preventDefault(); 

        try {
            const response = await fetch(`/api/users/${userid}/stop-membership`, { 
                method: "PATCH", 
                mode: "cors", 
                body: JSON.stringify({ whyText, creatorId: session?.user?.id }), 
                headers: { 
                    'Content-Type': "application/json", 
                }
            }); 

            if(response.ok) { 
                router.push("/"); 
                return; 
            }
        } catch(err) { 
            console.log(err); 
        }
    }

  return (
    <form className = 'form' onSubmit = { (e) => { cancelMembership(e)} }>
        <TextAreaElement 
            labelTitle = 'Motivul pentru care anulezi acest abonament'
            placeholder = "...aa"
            required = { true }
            value = { whyText }
            executeChange = { (e) => { setWhyText(e.target.value)}}
        />

        <div className = 'flex justify-center'>
            <button type = 'submit' className = 'submit_button'> Submit </button>
        </div>
    </form>
  )
}

export default StopMembershipForm; 