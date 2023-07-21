import React, { useEffect } from 'react'
import { DefaultSession } from 'next-auth'; 
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

import AuthButton from './AuthButton';

const UserCard = ({ user }: { user: DefaultSession["user"] | any }) => {
  useEffect( () => { console.log(user)}, [])
  return (
    <div className = 'flex py-1'>
    <AuthButton 
        name = 'Sign Out'
        executeFunction={ signOut }
        classes = 'default_button' 
    /> 

    <Link href = { `/users/${user?.id}`}>
        <Image
            src = { user?.image } 
            alt = "profile_image"
            width = { 35 }
            height = { 35 }
            className = 'rounded-3xl ml-3'
        />
    </Link>
  </div>
  )
}

export default UserCard