'use client'; 

import { useState, useEffect } from 'react'; 
import TrainerProfile from '@components/Trainer/TrainerProfile';
import { usePathname } from 'next/navigation';
import { TrainerInterface, initialTrainer } from '@interfaces/TrainerInterface';

const TrainerPage = () => {
    const pathName = usePathname(); 
    const [ trainer, setTrainer ] = useState <TrainerInterface> (initialTrainer); 

    useEffect( () => { 
        const getTrainerData = async () => { 
            try { 
                const response = await fetch(`/api${pathName}`); 

                const trainerResponse = await response.json(); 
                console.log({ trainerResponse }); 
                setTrainer(trainerResponse); 
            } catch(err) { 
                console.log(err); 
            }
        }

        getTrainerData(); 
    }, []);

  return (
     <TrainerProfile 
        trainer = { trainer }
        setTrainer = { setTrainer }
     /> 
  )
}

export default TrainerPage