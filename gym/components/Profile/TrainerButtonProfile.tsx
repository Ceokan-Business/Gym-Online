'use client'; 

import { useSession } from 'next-auth/react';
import Link from 'next/link';

const TrainerButtonProfile = () => {
    const { data: session } = useSession(); 

  return (
    <>
        { session != null && 
            <Link className = 'default_button' href = { `/trainers/${session.user.id}`}> Profil Antrenor </Link>
        }
    </>
  )
}

export default TrainerButtonProfile