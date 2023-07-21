'use client'; 

import Link from "next/link"; 
import { signIn, useSession } from 'next-auth/react'; 
import Login from './Auth/Login';
import AuthButton from './Auth/AuthButton';
import { CgGym } from 'react-icons/cg'; 

const NavBar = () => {
    const { data: session } = useSession(); 

  return  (
    <nav className = 'bg-light-blue py-2 px-2 flex flex-row w-screen'>
        <Link className = 'flex items-center' href = "/">
            <div className = 'flex flex-gap-4'>
                <div className = 'flex items-center justify-center'> <CgGym/> </div>
                Gym Online
            </div>
        </Link>


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
    </nav>
)
}

export default NavBar; 