'use client';

import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react'
import { DefaultSession } from 'next-auth'; 
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MdOutlineNotificationsNone } from 'react-icons/md'; 

import { NotificationInterface } from '@interfaces/NotificationInterface';

import AuthButton from './AuthButton';

const UserCard = ({ user }: { user: DefaultSession["user"] | any }) => {
  const router = useRouter(); 
  const { data: session } = useSession(); 

  const [ notifications, setNotifications ] = useState <NotificationInterface []> ([]); 
  const [ showNotifications, setShowNotifications ] = useState <boolean> (false); 
  const [ unreadNotificationsCount, setUnreadNotificationsCount ] = useState<number> (0); 

  useEffect( () => { 
    const getNotificationsData = async () => { 
      const response = await fetch(`/api/users/${session?.user?.id}/notifications`); 
      const noteResponse = await response.json(); 

      console.log({ noteResponse }); 

      setNotifications(noteResponse.notifications); 
      setUnreadNotificationsCount(noteResponse.counter); 
    }

    getNotificationsData(); 
  }, [session]); 

  return (
    <div className = 'flex py-1 gap-x-8'>
      <div className = 'flex items-center justify-center'>
        <MdOutlineNotificationsNone width = { 25 } height = { 25 } /> 
      </div>

      <div className = 'flex'>
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
  </div>
  )
}

export default UserCard