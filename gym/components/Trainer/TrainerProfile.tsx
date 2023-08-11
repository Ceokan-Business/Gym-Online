'use client'

import { useState } from 'react'; 
import { TrainerInterface } from '@interfaces/TrainerInterface';
import { useSession } from 'next-auth/react';

import Alert from '@components/Useful/Alert';
import DescriptionForm from './DescriptionForm';

interface Props { 
  trainer: TrainerInterface, 
  setTrainer: React.Dispatch<React.SetStateAction<TrainerInterface>>, 
}

const TrainerProfile = ({ trainer, setTrainer }: Props ) => {
  const { data: session } = useSession(); 
  const [ showDescriptionForm, setShowDescriptionForm ] = useState <boolean> (false); 
  const [ showDeleteAlert, setShowDeleteAlert ] = useState <boolean> (false); 

  const deleteDescription = async () => { 
    try { 
      const response = await fetch(`/api/trainers/${session?.user.id}/social`, { 
        method: "DELETE", 
        mode: "cors", 
        body: JSON.stringify({ action: "DESCRIPTION"}), 
        headers: { 
          'Content-Type': "application/json"
        }
      }); 

      if(response.ok) { 
        setTrainer({ ...trainer, description: ""})
        setShowDeleteAlert(false); 
        return; 
      }
    } catch (err) { 
      console.log(err); 
    }
  }

  const setDescription = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    try { 
      const response = await fetch(`/api/trainers/${session?.user.id}/social`, { 
        method: "PATCH", 
        mode: 'cors', 
        body: JSON.stringify({ action: "DESCRIPTION", text: trainer.description}), 
        headers: { 
          'Content-Type': "application/json"
        }
      }); 

      if(response.ok) { 
        setShowDescriptionForm(false); 
        return; 
      }
    } catch(err) { 
      console.log(err); 
    }
  }

  const cancelSetDescription = () =>{ 
    setTrainer({ ...trainer, description: "" }); 
    setShowDescriptionForm(false); 
  }

  return (
    <section className = 'h-screen'>
      <header className = 'mx-4 my-2 bg-light-yellow p-2 shadow-md'>
          <h1 className = 'text-xl'> { trainer.username } </h1>
          <div>
            {  trainer.description === "" && 
                <button className = 'default_button' onClick = { () => setShowDescriptionForm(true) }> Seteaza o descriere </button> 
            }

            { trainer.description != "" && 
              <p> { trainer.description } </p>
            }

            { trainer.description != '' && session != undefined && session.user.id === trainer.userId && 
              <div className = 'flex flex-col w-fit'>
                <button className = 'default_button' onClick = { () => { setShowDescriptionForm (true) }}> Actualizeaza descrierea </button>
                <button className = 'default_button' onClick = { () => { setShowDeleteAlert(true) }}> Sterge descrierea </button>
              </div>
            }
          </div>
      </header>

      { showDeleteAlert && 
        <Alert
          description = 'Esti sigur ca doresti sa iti stergi descrierea?'
          executeFunction = { deleteDescription }
          cancelFunction = { () => { setShowDeleteAlert(false)} }
        />  
      }

      { showDescriptionForm && 
        <DescriptionForm 
          handleSubmit =  { setDescription }
          text = { trainer.description }
          textChange = { (text: string) => { setTrainer({ ...trainer, description: text})}}
          cancelChange = { cancelSetDescription }
        /> 
      }
    </section>
  )
}

export default TrainerProfile