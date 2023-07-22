import React from 'react'
import { PostInterface } from '@interfaces/PostInterface'; 

import Link from 'next/link';

interface Props { 
    post: PostInterface,  
    adminGrade: boolean,
    deletePost: (id: string, index: number) => void, 
    index: number
}

const PostCard = ({ post, adminGrade, deletePost, index }: Props) => {
  return (
    <article className = 'bg-light-yellow p-2'>
        <h2> { post.title } </h2>
        <p> { post.description } </p>

        { adminGrade && 
            <div className = 'flex gap-x-4'>
                <Link href = { `/posts/${post._id.toString()}/edit-post`} className='default_button'> Editeaza </Link>
                <button
                    onClick = { () => deletePost(post._id.toString(), index)}
                    className = 'default_button'> Sterge </button>
            </div>
        }
    </article>
  )
}

export default PostCard