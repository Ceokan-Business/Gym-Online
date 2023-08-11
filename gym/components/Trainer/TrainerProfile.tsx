'use client'

import { useState } from 'react'; 
import { TrainerInterface } from '@interfaces/TrainerInterface';
import { useSession } from 'next-auth/react';

interface Props { 
  trainer: TrainerInterface, 
  setTrainer: React.Dispatch<React.SetStateAction<TrainerInterface>>, 
}

const TrainerProfile = ({ trainer, setTrainer }: Props ) => {
  const { data: session } = useSession(); 
  const [ showDescriptionForm, setShowDescriptionForm ] = useState <boolean> (false); 
  const [ deleteAlert, setDeleteAlert ] = useState <boolean> (false); 

  return (
    <section>
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
    </section>
  )
}

export default TrainerProfile