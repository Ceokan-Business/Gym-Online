'use client'; 

import { useState } from 'react'; 
import { FaFacebook } from 'react-icons/fa'; 
import { BsInstagram } from 'react-icons/bs'; 
import { AiOutlineYoutube, AiOutlineMail } from 'react-icons/ai'; 
import ContactMenu from './ContactMenu';
import { useRouter } from 'next/navigation';

import  { CONTACT_WAYS } from '@global/constants'; // fb, insta, yt, email 
import { ContactInterface } from '@interfaces/TrainerInterface';

import { useSession } from 'next-auth/react';

interface Props { 
  profileId: string // id pentru a verifica cui apartine contul accesat
  trainersContact: ContactInterface // variabila pentru a afisa userului doar modurile de contact pe care le-a selectat antrenorul 
}

// Contact Ways: Facebook, Instagram, Youtube, Email 

const ContactSection = ({ profileId, trainersContact }: Props ) => {
  const { data: session } = useSession(); 
  const router = useRouter(); 
  const [ showContactForm, setShowContactForm ] = useState <string> (''); 

  const handleButtonForTheUser = (social: string) => { 
    if(session?.user.id === profileId) { 
      setShowContactForm(social); 
      return; 
    }

    router.push(social); 
  }

  return (
    <>
      <p> Contact: </p>

      { session != undefined && session?.user.id === profileId && 
        <ul className = 'm-4 px-8 py-4 bg-light-yellow flex gap-x-16 justify-center items-center'>
          <li onClick = { () =>  { handleButtonForTheUser(CONTACT_WAYS[0]) }} className = 'text-2xl hover:text-3xl transition-all duration-300 cursor-pointer '>
              <FaFacebook/> 
          </li>
          <li onClick = { () =>  { handleButtonForTheUser(CONTACT_WAYS[1]) }} className = 'text-2xl hover:text-3xl transition-all duration-300 cursor-pointer'>
            <BsInstagram /> 
          </li>
          <li onClick = { () =>  { handleButtonForTheUser(CONTACT_WAYS[2]) }} className = 'text-2xl hover:text-3xl transition-all duration-300 cursor-pointer'>
            <AiOutlineYoutube />
          </li>
          <li onClick = { () =>  { handleButtonForTheUser(CONTACT_WAYS[3]) }} className = 'text-2xl hover:text-3xl transition-all duration-300 cursor-pointer'>
            <AiOutlineMail /> 
          </li>
        </ul>
      }

      { session != undefined && session?.user.id != profileId && 
        <ul className = 'm-4 px-8 py-4 bg-light-yellow flex gap-x-16 justify-center items-center' >
          { Object.keys(trainersContact).includes(CONTACT_WAYS[0]) && 
            <li onClick = { () =>  { handleButtonForTheUser(CONTACT_WAYS[0]) }} className = 'text-2xl hover:text-3xl transition-all duration-300 cursor-pointer '>
              <FaFacebook/> 
            </li>
          }

          { Object.keys(trainersContact).includes(CONTACT_WAYS[1]) && 
            <li onClick = { () =>  { handleButtonForTheUser(CONTACT_WAYS[1]) }} className = 'text-2xl hover:text-3xl transition-all duration-300 cursor-pointer'>
              <BsInstagram /> 
            </li>
          }

          { Object.keys(trainersContact).includes(CONTACT_WAYS[2]) && 
            <li onClick = { () =>  { handleButtonForTheUser(CONTACT_WAYS[2]) }} className = 'text-2xl hover:text-3xl transition-all duration-300 cursor-pointer'>
              <AiOutlineYoutube />
            </li>
          }

          { Object.keys(trainersContact).includes(CONTACT_WAYS[3]) && 
            <li onClick = { () =>  { handleButtonForTheUser(CONTACT_WAYS[3]) }} className = 'text-2xl hover:text-3xl transition-all duration-300 cursor-pointer'>
              <AiOutlineMail /> 
            </li>
          }
        </ul>
      }


      { session!= undefined && session?.user.id === profileId && showContactForm != "" && 
        <>
          { CONTACT_WAYS.map(social => { 
            if(showContactForm === social) { 
              return <ContactMenu social = { social } 
                socialValue = { Object.values(trainersContact)[CONTACT_WAYS.indexOf(social)]}
                profileId = { profileId } 
                setShowContactForm =  { setShowContactForm } /> 
            }
          })  

      }
        </>
      }
    </>
  )
}

export default ContactSection