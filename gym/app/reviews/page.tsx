'use client'; 

import { verifyUserStatus } from '@utils/verifyUserStatus';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react'; 


import Link from 'next/link';
import ReviewCard from '@components/Review/ReviewCard';

import { ReviewInterface } from '@interfaces/ReviewInterface';

const ReviewsPage = () => {
  const { data: session } = useSession(); 

  const [reviews, setReviews ] = useState <ReviewInterface []> ([]); 
  const [ loaded, setLoaded ] = useState<boolean>  (false); 
  const [ isAdmin, setIsAdmin ] = useState <boolean> (false); 

  useEffect( () => { 
    const getRData = async () => { 
      try { 
        const response = await fetch("/api/reviews"); 
        const reviewResponse = await response.json(); 

        setReviews(reviewResponse); 

        let checkAdmin = await verifyUserStatus(session?.user?.id); 
        setIsAdmin(checkAdmin); 
      } catch(err) { 
        console.log(err); 
      } finally { 
        setLoaded(true); 
      }
    }

    getRData(); 
  }, []); 

  const deleteReview = async (reviewid: string, index: number, creatorid: string) => { 
    try { 
      const response = await fetch(`/api/reviews`, { 
        method: "DELETE", 
        mode: 'cors', 
        body: JSON.stringify({ reviewid, creatorid, index }), 
        headers: { 
          'Content-Type': "application/json"
        }
      }); 

      let revUpdate = []; 

      for(let i = 0; i < reviews.length; i++) { 
        if(i != index) { 
          revUpdate.push(reviews[i]); //delete the element from state 
        }
      }; 

      setReviews(revUpdate); 
      
      if(response.ok) { 
        return; 
      }
    } catch(err) { 
      console.log(err); 
    }
  }

  return (
    <section>
      { loaded ? 
        ( 
          <>
            { reviews.length == 0 ? 
              ( 
                <>
                  <p> Nu exista recenzii scrise. </p>
                  <Link className = 'default_button' href = '/create-review'> Creeaza recenzie </Link>
                </> 
              ) : 
              ( 
                <>
                  { reviews.map((review, index) => { 
                    return (
                      <ReviewCard review = { review } index = { index } deleteReview = { deleteReview } isAdmin = { isAdmin } /> 
                    )
                  })}
                </>
              ) 
            }
          </>
        ) : (
          <p> Loading... </p>
        )
      }

    </section>
  )
}

export default ReviewsPage