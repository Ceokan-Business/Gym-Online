import { ReviewInterface } from "@interfaces/ReviewInterface";

interface Props { 
    review: ReviewInterface, 
    index: number, 
    deleteReview: (reviewid: string, index: number, creatorid: string) => void,
    isAdmin: boolean, 
}

const ReviewCard = ({ review, index, deleteReview, isAdmin }: Props ) => {
  return (
    <article className = 'bg-light-yellow my-8 mx-4 p-2 shadow-md'>
        <p> { review.text } </p>
        <p> Written by: { review.creator.username } </p>

        { isAdmin && 
            <div>
                <button onClick = { () => { deleteReview(review._id, index, review.creator?._id)}} className = 'default_button'> Sterge Recenzie </button>
            </div>
        }
    </article>
  )
}

export default ReviewCard; 

