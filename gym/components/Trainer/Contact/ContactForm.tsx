import React from 'react'; 

import { InputElement } from '@components/Useful/Inputs';

interface Props { 
  handleSubmit: (e: React.FormEvent) => void, 
  submitting: boolean, 
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>, 
  modifiedLink: string, 
  setModifiedLink: React.Dispatch<React.SetStateAction<string>>, 
}

const ContactForm = ({ handleSubmit, submitting, setShowForm, modifiedLink, setModifiedLink }: Props) => {
  return (
    <section className = 'middle_section_container'>
      <form onSubmit = { handleSubmit } className = 'form middle_section_content'>
         <InputElement 
            labelTitle = { 'Modifica contact '}
            required = { true }
            placeholder = 'http://example.com...'
            value = { modifiedLink }
            executeChange = { (e) => setModifiedLink(e.target.value)}
         /> 

         <div className = 'flex flex-col gap-y-2 justify-center items-center'>
            <button className = 'submit_button' type = 'submit'> 
              { submitting ? 
                "Modifica..." : 
                "Modifica"
              }
             </button>
            <button className = 'default_button' onClick =  { () => setShowForm(false)}> Anuleaza </button>
         </div>
      </form>
    </section>
  )
}

export default ContactForm