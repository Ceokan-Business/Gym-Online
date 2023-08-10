import React from 'react'; 
import { TrainerInterface } from '@interfaces/TrainerInterface';

interface Props { 
  trainer: TrainerInterface, 
  setTrainer: React.Dispatch<React.SetStateAction<TrainerInterface>> 
}

const TrainerProfile = ({ trainer, setTrainer }: Props ) => {
  return (
    <div>{ JSON.stringify(trainer) } </div>
  )
}

export default TrainerProfile