'use client'; 
import { useState, useEffect } from 'react'; 
import { PostInterface, initialPost } from '@interfaces/PostInterface';

import { usePathname } from 'next/navigation';
import PostForm from '@components/Posts/PostForm';
import { useRouter } from 'next/navigation';

const EditPost = () => {
    const pathName = usePathname(); 
    const router = useRouter (); 

    const [ submitting, setSubmitting ] = useState <boolean> (false); 
    const [ post, setPost ] = useState <PostInterface> (initialPost); 
    const [ loaded, setLoaded ] = useState <boolean> (false); 

    function extractID () { 
      return pathName.split("/")[2]; 
    }

    const ID = extractID();

    useEffect( () => { 
        const getPostData = async () => { 
          const response = await fetch(`/api/posts/${ID}`); 

          const postResponse = await response.json(); 
          setPost(postResponse); 
          setLoaded(true); 
        }

        getPostData(); 
    }, []); 

    const editPost = async (e: React.FormEvent) => { 
      e.preventDefault(); 
      setSubmitting(true); 

      try { 
        const response = await fetch(`/api/posts/${ID}`, { 
          method: "PATCH", 
          mode: "cors", 
          body: JSON.stringify({ 
            title: post.title, 
            description: post.description
          }), 
          headers: { 
            "Content-Type": "application/json", 
          }
        }); 

        if(response.ok) { 
          router.push("/"); 
          return; 
        }
      } catch(err) { 
        console.log(err); 
      } finally { 
        setSubmitting(false); 
      }
    }
  return (
    <>
      { !loaded &&
        <p> Loading...</p>
      }

      { loaded &&
        <PostForm 
          type = "Editeaza"
          submitting = { submitting }
          post = { post }
          setPost = { setPost }
          handleSubmit = { editPost }
        /> 
      }
    </>
  )
}

export default EditPost