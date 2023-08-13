'use client'; 

import { useState, useEffect } from 'react'; 
import { useRouter } from 'next/navigation';

import { UserInterface, initialUser } from '@interfaces/UsetInterface';

import * as Realm from 'realm-web'; 

const SearchBar = () => {
    const router = useRouter(); 

    const [ searchTerm, setSearchTerm ] = useState <string> (""); 
    const [ searchedUser, setSearchedUser ] = useState <UserInterface> (initialUser); 

    const handleSubmit = async (e: React.FormEvent) => { 
        e.preventDefault(); 

        try { 
            const response = await fetch(`/api/search-user/${searchTerm}`); 

            const userResponse = await response.json(); 

        } catch(err) { 
            console.log(err); 
        }

        router.push(`/search/${searchTerm}`)
    }
  return (
    <form className = 'flex justify-center items-center' onSubmit = { handleSubmit }>
        <input type="text" placeholder = 'Search' className = 'form_input'
            value = { searchTerm }
            onChange = { (e) => { setSearchTerm (e.target.value)} } />
    </form>
  )
}

export default SearchBar