import React from 'react'; 
import { InputElement } from '@components/Useful/Inputs';

interface Props { 
    handleSubmit: (e: React.FormEvent) => void, 
    text: string, 
    textChange: (text: string) => void, 
    cancelChange: () => void, 
}

const DescriptionForm = ({ handleSubmit, text, textChange, cancelChange }: Props) => {
  return (
    <section className = 'fixed inset-0 flex items-center justify-center'>
        <form onSubmit= { handleSubmit } className = 'form w-fit h-fit px-16 py-4'>
            <InputElement 
                labelTitle = 'Descrierea ta'
                placeholder = 'Aa..'
                required = { true }
                value = { text }
                executeChange = { (e) => { textChange(e.target.value) }}
            />

            <div className = 'flex flex-col items-center gap-y-2'>
                <button className = 'submit_button' type = 'submit'> Seteaza descrierea </button>
                <button className = 'default_button' onClick =  { cancelChange }> Anuleaza </button>
            </div>
        </form>
    </section>
  )
}

export default DescriptionForm