import React from 'react';
import { UserInterface } from '@interfaces/UsetInterface';
import GradesList from './GradesList';
import DeveloperProfile from './DeveloperProfile';

interface Props { 
    user: UserInterface, 
    setUser: React.Dispatch<React.SetStateAction<UserInterface>> 
}

const Profile = ({ user, setUser }: Props ) => {
  return (
    <section>
        <header className = 'mx-4 my-2 bg-light-yellow p-2 shadow-md'>
            <h1 className = 'text-xl'> { user.username } </h1>

            <GradesList grades = { user.grades } /> 
        </header>

        {/* Only for high grades */}
        <DeveloperProfile user = { user } setUser = { setUser } /> 
    </section>
  )
}

export default Profile