'use client'; 
import { useState } from 'react'; 
import { TextAreaElement } from '@components/Useful/Inputs'

interface Props { 
    userid: string, 
}

const StopMembershipForm = ({ userid }: Props ) => {
    const [ whyText, setWhyText ] = useState <string> (""); 
    const cancelMembership = async (e: React.FormEvent) => { 
        try {

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
            <button className = 'submit_button'> Submit </button>
        </div>
    </form>
  )
}

export default StopMembershipForm; 