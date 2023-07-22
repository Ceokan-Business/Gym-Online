import React from 'react';
import { UserInterface } from '@interfaces/UsetInterface';
import GradesList from './GradesList';
import DeveloperProfile from './DeveloperProfile';
import { GRADES } from '@global/constants';
import { MembershipInterface } from '@interfaces/MembershipInterface';

interface Props { 
    user: UserInterface, 
    setUser: React.Dispatch<React.SetStateAction<UserInterface>> 
    membership?: MembershipInterface | string | null, 
}

const Profile = ({ user, setUser, membership}: Props ) => {
  return (
    <section>
      <pre> { JSON.stringify(user.membership) } </pre>
        <header className = 'mx-4 my-2 bg-light-yellow p-2 shadow-md'>
            <h1 className = 'text-xl'> { user.username } </h1>

            <GradesList grades = { user.grades } /> 
        </header>

        { user.grades.includes(GRADES[1]) && membership != null &&
          <article className = 'bg-light-blue mx-4 my-8 p-2 shadow-md'> {/* detalii abonament */}
            <h2> Detalii abonament: </h2>
            <p> { membership.title } </p>
            <p> { membership.price } </p>
          </article>
        }

        {/* Only for high grades */}
        <DeveloperProfile user = { user } setUser = { setUser } /> 
    </section>
  )
}

export default Profile