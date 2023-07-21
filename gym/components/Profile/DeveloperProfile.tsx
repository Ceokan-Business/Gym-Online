'use client'; 
import { useSession } from 'next-auth/react';
import { UserInterface } from '@interfaces/UsetInterface';
import { GRADES } from '@global/constants';

import Link from 'next/link';

interface Props { 
    user: UserInterface, 
    setUser: React.Dispatch<React.SetStateAction<UserInterface>> 
}

const DeveloperProfile = ({ user, setUser }: Props) => {
    const { data: session } = useSession(); 

  return (
    <>
        {/* Daca se afla pe profilul lor si sunt responsabili sau patroni pot creea postari */}
        { session?.user?.id === user._id  && (user.grades.includes(GRADES[4]) || user.grades.includes(GRADES[4])) &&
            <Link href = '/create-post' className = 'default_button'> Create Post </Link>
        }
    </>
  )
}

export default DeveloperProfile