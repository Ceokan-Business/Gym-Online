'use client'; 

import { useState, useEffect } from 'react'; 
import TrainerProfile from '@components/Trainer/TrainerProfile';
import { usePathname } from 'next/navigation';
import { TrainerInterface, initialTrainer } from '@interfaces/TrainerInterface';

const TrainerPage = () => {
    const [ trainer, setTrainer ] = useState <TrainerInterface> (initialTrainer)
  return (
    <div>TrainerPage</div>
  )
}

export default TrainerPage