'use client'; 

import { useState } from 'react'; 
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { ReviewInterface, initialReview } from '@interfaces/ReviewInterface';

import ReviewForm from '@components/Review/ReviewForm';

const CreateReviewPage = () => {
    const { data: session } = useSession(); 
    const router = useRouter(); 

    const [ submitting, setSubmitting ] = useState <boolean> (false); 
    const [ review, setReview ] = useState <ReviewInterface> (initialReview); 

    const createReview = async (e: React.FormEvent) => { 
        e.preventDefault(); 
        setSubmitting(true); 

        try { 
            const response = await fetch("/api/create-review", { 
                method: "POST", 
                mode: "cors",
                body: JSON.stringify({ text: review.text, creatorid: session?.user?.id }), 
                headers: { 
                    "Content-Type": "application/json", 
                }
            }); 

            if(response.ok) { 
                router.push("/reviews"); 
                return; 
            }
        } catch(err) { 
            console.log(err); 
        } finally { 
            setSubmitting(false); 
        }
    }
  return (
    <ReviewForm 
        type = 'Creeaza'
        review = { review }
        setReview = { setReview }
        submitting = { submitting }
        handleSubmit = { createReview }
    /> 
  )
}

export default CreateReviewPage