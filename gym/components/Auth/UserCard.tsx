'use client';

import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react'
import { DefaultSession } from 'next-auth'; 
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import NotificationDropDown from '@components/Notification/NotificationDropDown';
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

  const markAsRead = (index: number) => { 
    let notificationsUpdate = notifications; 

    for(let i = 0; i < notificationsUpdate.length; i++) { 
      if(i === index) { 
        notificationsUpdate[i].seen = true; 
      }
    }

    setUnreadNotificationsCount(x => x == 0 ? 0 : x - 1); 

    setNotifications(notificationsUpdate); 
  }

  return (
    <div className = 'flex py-1 gap-x-8'>
      <div className = 'flex flex-col items-center justify-center'>
        { unreadNotificationsCount == 0 ? 
          ( 
            <MdOutlineNotificationsNone className = 'relative' onClick = { () => { setShowNotifications( (x) => !x ) }  } width = { 25 } height = { 25 } /> 
          ): 
          ( 
            <div onClick = { () => { setShowNotifications( (x) => !x ) }  } className = 'default_button cursor-pointer px-4'>
              <MdOutlineNotificationsNone className = 'relative' width = { 25 } height = { 25 } /> 
              <p className='text-center'> { unreadNotificationsCount } </p>
            </div>
          )
        }
        { showNotifications && 
              <NotificationDropDown notifications = { notifications } markAsRead = { markAsRead } /> 
        }
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