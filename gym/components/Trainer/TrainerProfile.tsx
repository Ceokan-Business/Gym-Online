'use client'

import { useState } from 'react'; 
import { TrainerInterface } from '@interfaces/TrainerInterface';
import { useSession } from 'next-auth/react';

import Alert from '@components/Useful/Alert';

interface Props { 
  trainer: TrainerInterface, 
  setTrainer: React.Dispatch<React.SetStateAction<TrainerInterface>>, 
}

const TrainerProfile = ({ trainer, setTrainer }: Props ) => {
  const { data: session } = useSession(); 
  const [ showDescriptionForm, setShowDescriptionForm ] = useState <boolean> (false); 
  const [ deleteAlert, setDeleteAlert ] = useState <boolean> (false); 

  const test = () => { 
    console.log("RE")
  }

  return (
    <section className = 'h-screen'>
      <div>{ JSON.stringify(trainer) } </div>
      <header className = 'mx-4 my-2 bg-light-yellow p-2 shadow-md'>
          <h1 className = 'text-xl'> { trainer.username } </h1>
          <div>
            {  trainer.description === "" && 
                <button className = 'default_button' onClick = { () => setShowDescriptionForm(true) }> Seteaza o descriere </button> 
            }

            { trainer.description != "" && 
              <p> { trainer.description } </p>
            }

            { session != undefined && session.user.id === trainer.userId && 
              <div className = 'flex flex-col w-fit'>
                <button className = 'default_button' onClick = { () => { setShowDescriptionForm (true) }}> Actualizeaza descrierea </button>
                <button className = 'default_button' onClick = { () => { setDeleteAlert(true) }}> Sterge descrierea </button>
              </div>
            }
          </div>
      </header>

      
      <Alert
            description = 'Re'
            executeFunction = { test }
            cancelFunction = { test }
          /> 
    </section>
  )
}

export default TrainerProfile