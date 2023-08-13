'use client'; 

import { useState, useEffect } from 'react'; 
import { useRouter } from 'next/navigation';

import { BiSearch } from 'react-icons/bi'; 

interface DropProps { 
    usernames: string [], 
    searchTerm: string, 
    setSearchTerm: React.Dispatch<React.SetStateAction<string>> 
}

const DropDown = ({ usernames, searchTerm, setSearchTerm }: DropProps) => { 
    return ( 
        <article>
            { usernames
                .filter(name => { 
                    const searchValue = searchTerm.toLowerCase(); 
                    const username = name.toLowerCase(); 

                    return searchValue != "" && username.startsWith(searchValue)
                }).slice(0, 10)
                .map(name => { 
                return <p className = 'cursor-pointer' onClick={ () => setSearchTerm(name)}> { name } </p>
            })}
        </article>
    )
}

const SearchBar = () => {
    const router = useRouter(); 
    const [ usernames, setUsernames ] = useState <string []>([]); 
    const [ searchTerm, setSearchTerm ] = useState <string> (""); 

    useEffect( () => { 
        const getUsernamesData = async () => { 
            try { 
                const response = await fetch('/api/search/all-users'); 

                const usernamesResponse = await response.json(); 

                let filterUsernames = []; 
                for(let i = 0; i < usernamesResponse.length; i++) { 
                    filterUsernames.push(usernamesResponse[i].username); 
                }
                console.log(filterUsernames); 
                setUsernames(filterUsernames)
            } catch(err) { 
                console.log(err); 
            }
        }

        getUsernamesData(); 
    }, []); 

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
        <div>
            <input type="text" placeholder = 'Search' className = 'form_input'
                value = { searchTerm }
                onChange = { (e) => { setSearchTerm (e.target.value)} } />
            <DropDown usernames = { usernames } searchTerm = { searchTerm } setSearchTerm = { setSearchTerm } /> 
        </div>
        <button type = 'submit' className = 'hover:scale-x-150 hover:scale-y-150 duration-300 transition-all'>
            <BiSearch />    
        </button>
    </form>
  )
}

export default SearchBar