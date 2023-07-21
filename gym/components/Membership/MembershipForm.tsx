import React from 'react'; 
import { MembershipInterface } from '@interfaces/MembershipInterface';

import { InputElement, NumberInputElement } from '@components/Useful/Inputs';

interface Props { 
    type: string, 
    membership: MembershipInterface, 
    setMembership: React.Dispatch<React.SetStateAction<MembershipInterface>>, 
    submitting: boolean, 
    handleSubmit: (e: React.FormEvent) => void,
}

const MembershipForm = ({ membership, setMembership, submitting, type, handleSubmit }: Props) => {
  return (
    <section>
        <header>
            { type === 'Creeaza' && 
                <h1> { type } inca un abonament pentru cei ce lucreaza la sala ta de fitness. </h1>
            }
        </header>

        <form className = 'form' onSubmit = { handleSubmit }>
            <InputElement
                labelTitle='Titlu: '
                placeholder='...ex: 16 sedinte / luna'
                required = { true }
                value =  { membership.title }
                executeChange = { (e) => { setMembership({ ...membership, title: e.target.value })}}
            /> 

            <NumberInputElement 
                labelTitle = "Pret: "
                required = { true }
                value = { Number(membership.price) }
                executeChange = { (e) => { setMembership({ ...membership, price: Number(e.target.value) }); console.log(typeof Number(e.target.value)) } }
            /> 

            <div className = 'flex justify-center my-2'>
                <button type = 'submit' className='submit_button'> 
                    { submitting ? `${type}...`: `${type}`}
                </button>
            </div>
        </form>
    </section>
  )
}

export default MembershipForm