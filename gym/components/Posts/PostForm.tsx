import React from 'react'; 
import { PostInterface } from '@interfaces/PostInterface';

import { InputElement, TextAreaElement } from '@components/Useful/Inputs';

interface Props { 
    type: string,
    submitting: Boolean, 
    post: PostInterface, 
    setPost: React.Dispatch<React.SetStateAction<PostInterface>>, 
    handleSubmit: (e: React.FormEvent) => void, 
}
const PostForm = ({type, submitting, post, setPost, handleSubmit }: Props) => {
  return (
    <section>
        { type === "Creeaza" && 
            <h1> { type } postari pentru oamenii din sala ta. </h1>
        }

        <form className = 'form' onSubmit =  { handleSubmit }>
            <InputElement 
                labelTitle='Titlu: '
                placeholder = "...titlul postarii tale"
                required =  { true }
                value = { post.title }
                executeChange = { (e) => { setPost({ ...post, title: e.target.value })}}
            /> 
            <TextAreaElement 
                labelTitle='Descriere: '
                placeholder = "...postarea ta"
                required = { true }
                value = { post.description }
                executeChange = { (e) => { setPost({ ...post, description: e.target.value })}}
            /> 

            <div className = 'w-100 flex justify-center my-2'>   
            <button className = 'submit_button'> { submitting ? `${type}...` : `${type}`  } </button>
            </div>
        </form>
    </section>
  )
}

export default PostForm