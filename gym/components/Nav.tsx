'use client'; 

import Link from "next/link"; 
import { signIn, useSession } from 'next-auth/react'; 
import { useState } from 'react'; 

import ReviewDropDown from "./Review/ReviewDropDown";
import Login from './Auth/Login';
import AuthButton from './Auth/AuthButton';
import { CgGym } from 'react-icons/cg'; 

const NavBar = () => {
    const { data: session } = useSession(); 
    const [ showReviewDrop, setShowReviewDrop ] = useState <boolean> (false); 

    const takeOwnerGrade = async () => { 
        try {   
            const response = await fetch(`/api/users/${session?.user?.id}/development-takeowner`, { 
                method: "PATCH", 
                mode: "cors", 
                headers: { 
                    'Content-Type': "application/json", 
                }
            }); 

            if(response.ok)  { 
                return; 
            }
        } catch (err) { 
            console.log(err); 
        }
    } 
  return  (
    <nav className = 'bg-light-blue py-2 px-2 flex flex-row justify-between w-screen'>
        <Link className = 'flex items-center' href = "/">
            <div className = 'flex flex-gap-4'>
                <div className = 'flex items-center justify-center'> <CgGym/> </div>
                Gym Online
            </div>
        </Link>

        <div className = 'flex gap-x-16'>
            <Link className= "default_button h-full" href = '/memberships'>Abonamente</Link>

            <div className = 'flex flex-col'>
                <button className = 'default_button relative h-full' onClick = { () => setShowReviewDrop(x => !x)}> Recenzii </button>

                { showReviewDrop && 
                    <ReviewDropDown /> 
                }
            </div>
            <button className = 'special_button' onClick = { takeOwnerGrade }> Grad Patron </button>
            { session?.user ? 
                (
                    <Login /> 
                ) 
                : 
                ( 
                    <div className = 'ml-auto flex items-center content-center'>
                        <AuthButton 
                            name = "Sign In"
                            executeFunction = { () => { signIn() }}
                            classes = 'default_button'
                        /> 
                    </div>
                )
            }
        </div>
    </nav>
)
}

export default NavBar; 