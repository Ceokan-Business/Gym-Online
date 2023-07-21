import React from 'react'; 
import { MembershipInterface } from '@interfaces/MembershipInterface';

import Link from 'next/link';

interface Props { 
    memberships: MembershipInterface [], 
    isAdmin: Boolean, 
    deleteMembership: (id: string, index: number) => void
}

interface ItemProps { 
    membership: MembershipInterface
    isAdmin: Boolean, 
    index: number
    deleteMembership: (id: string, index: number) => void
}

const MembershipItem = ( { membership, isAdmin, index, deleteMembership}: ItemProps) => { 
    return ( 
        <div className = 'bg-light-blue w-fit px-4 py-2 shadow-md rounded-xl m-2'>
            <h3>{ membership.title } </h3>
            <p> { `${membership.price} lei ` } </p>
            { isAdmin && 
                <div className = 'flex gap-x-4'>
                    <Link className = 'default_button' href = { `/memberships/${membership._id}/edit-membership`}> Editeaza </Link>
                    <button onClick = { () => { deleteMembership(membership._id, index )}} className = 'default_button'> Sterge </button>
                </div>
            }
        </div>
    )
} 

const MembershipList = ({ deleteMembership, memberships, isAdmin }: Props) => {
  return (
    <section>
        { memberships.map((m, index) => { 
            return ( 
                <MembershipItem index = { index } key = { m._id } deleteMembership = { deleteMembership } isAdmin = { isAdmin } membership = { m } /> 
            )
        })}
    </section>
  )
}

export default MembershipList