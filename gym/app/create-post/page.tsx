'use client'; 
import { useState } from 'react'; 
import { PostInterface, initialPost } from '@interfaces/PostInterface';
import PostForm from '@components/Posts/PostForm';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const CreatePost = () => {
    const router = useRouter(); 
    const { data: session } = useSession(); 

    const [ submitting, setSubmitting ] = useState <boolean> (false); 
    const [ post, setPost ] = useState <PostInterface> (initialPost); 

    const createPost = async (e: React.FormEvent) => { 
        e.preventDefault(); 
        setSubmitting(true); 

        let userid = session?.user?.id === undefined ? "" : session?.user?.id
        console.log({ userid });

        try { 
            const response = await fetch('/api/create-post', { 
                method: "POST", 
                mode: "cors", 
                body: JSON.stringify({ 
                    title: post.title, 
                    description: post.description, 
                    userid,
                })
            }); 

            if(response.ok) { 
                router.push("/"); 
            }
        } catch(err) { 
            console.log(err); 
        }
    }; 


  return (
    <PostForm 
        type = "Creeaza"
        submitting = { submitting } 
        post = { post }
        setPost = { setPost }
        handleSubmit = { createPost }
    /> 
  )
}

export default CreatePost