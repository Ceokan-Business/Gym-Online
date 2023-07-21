
'use client'; 

import { PostInterface } from '@interfaces/PostInterface';
import { useState, useEffect } from 'react'; 
import { useSession } from 'next-auth/react';
import PostCard from './Posts/PostCard';

import { verifyUserStatus } from "@utils/verifyUserStatus"; 

const Feed = () => {
    const { data: session } = useSession(); 

    const [ posts, setPosts ] = useState <PostInterface []> (); 
    const [ loaded, setLoaded ] = useState <boolean> (false); 
    const [ adminGrade, setAdminGrade ] = useState<boolean> (false); // true => userul va putea sterge si edita orice postare

    const deletePost = async(postid: string, index: number) => { 
        const response = await fetch(`/api/posts/${postid}`, { 
            method: "DELETE", 
            mode: "cors", 
            body: JSON.stringify({ userid: session?.user?.id, index}), 
            headers: { 
                "Content-Type": "application/json"
            }
        }); 

        let postsUpdate = []; 
        const POSTS = posts === undefined ? [] : posts; //typescript check 

        for(let i = 0; i < POSTS.length; i++) { 
            if(i != index) { 
                postsUpdate.push(POSTS[i]); //remove the post from frontend
            }
        }

        setPosts(postsUpdate); 

        if (response.ok) { 
            return;
        }
    }

    useEffect( () => { 
        const getPostsData = async () => { 
            const response = await fetch('/api/posts'); 
            const postsResponse = await response.json(); 

            const isAdmin = await verifyUserStatus (session?.user?.id); 
            setAdminGrade(isAdmin); 

            setPosts(postsResponse); 
            setLoaded(true); 
            console.log({ session });
        }; 

        getPostsData(); 
    }, []); 
  return (
    <section>
        { posts === undefined && loaded && 
            <p> No posts yet </p>
        }
        { !loaded && 
            <p> Loading... </p>
        }
        { loaded && posts != undefined && posts.length > 0 && posts.map((post, index) => { 
            return <PostCard key = { post._id.toString() } deletePost = { deletePost } index = { index } post = { post } adminGrade = { adminGrade } /> 
        })}
    </section>
  )
}

export default Feed