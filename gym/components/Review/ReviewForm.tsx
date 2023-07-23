import { ReviewInterface } from "@interfaces/ReviewInterface"; 

import { TextAreaElement } from "@components/Useful/Inputs";

interface Props { 
    type: string,
    review: ReviewInterface, 
    setReview: React.Dispatch<React.SetStateAction<ReviewInterface>>, 
    submitting: boolean, 
    handleSubmit: (e: React.FormEvent) => void
}

const ReviewForm = ({ type, review, setReview, submitting, handleSubmit}: Props) => {
  return (
    <section>
        { type === 'Creeaza' &&
            <h1> { type } o recenzie publica. Parerea ta conteaza! </h1>
        }   

        <form className = 'form' onSubmit= { handleSubmit }>
            <TextAreaElement 
                labelTitle="Recenzie"
                placeholder = "Aa"
                value = { review.text }
                required = { true }
                executeChange = { (e) => setReview({ ...review, text: e.target.value })}
            />

            <div className = 'flex justify-center'>
                <button className = 'submit_button' type = 'submit'>
                    { submitting ? `${type}...` : type }
                </button>
            </div>
        </form>
    </section>
  )
}

export default ReviewForm