'use client'; 

import { useState } from 'react'; 
import { useRouter } from 'next/navigation';

const SearchBar = () => {
    const router = useRouter(); 

    const [ searchTerm, setSearchTerm ] = useState <string> (""); 

    const handleSubmit = async (e: React.FormEvent) => { 
        e.preventDefault(); 

        try { 
            const response = await fetch(`/api/search-user/${searchTerm}`); 
            console.log(response); 
            const userResponseId = await response.json(); 

            console.log(userResponseId); 
            router.push(`/users/${userResponseId.userId}`); 
        } catch(err) { 
            console.log(err); 
        } finally { 
            setSearchTerm(""); 
        }
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