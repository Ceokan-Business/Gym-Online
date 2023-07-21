'use client'; 
import { useState } from 'react'; 
import { PostInterface, initialPost } from '@interfaces/PostInterface';
import PostForm from '@components/Posts/PostForm';

const CreatePost = () => {
    const [ submitting, setSubmitting ] = useState <boolean> (false); 
    const [ post, setPost ] = useState <PostInterface> (initialPost); 

    const createPost = async (e: React.FormEvent) => { 
        console.log("CREATE POST"); 
    }; 


  return (
    <PostForm 
        submitting = { submitting } 
        post = { post }
        setPost = { setPost }
        handleSubmit = { createPost }
    /> 
  )
}

export default CreatePost