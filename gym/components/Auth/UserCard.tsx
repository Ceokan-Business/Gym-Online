'use client';

import React from 'react'
import { DefaultSession } from 'next-auth'; 
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import AuthButton from './AuthButton';

const UserCard = ({ user }: { user: DefaultSession["user"] | any }) => {
  const router = useRouter(); 

  return (
    <div className = 'flex py-1'>
    <AuthButton 
        name = 'Sign Out'
        executeFunction={  () => { router.push("/"); signOut();} }
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