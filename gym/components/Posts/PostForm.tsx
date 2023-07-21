import React from 'react'; 
import { PostInterface } from '@interfaces/PostInterface';

interface Props { 
    submitting: Boolean, 
    post: PostInterface, 
    setPost: React.Dispatch<React.SetStateAction<PostInterface>>, 
    handleSubmit: (e: React.FormEvent) => void, 
}
const PostForm = ({ submitting, post, setPost, handleSubmit }: Props) => {
  return (
    <div>PostForm</div>
  )
}

export default PostForm