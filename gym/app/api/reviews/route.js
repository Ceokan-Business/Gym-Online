import { connectToDB } from '@utils/database'; 
import Review from '@models/review'; 
import User from "@models/user"; 

export const GET = async (req, { params }) => { 
    try { 
        await connectToDB(); 

        const reviews = await Review.find( {} ).populate('creator', 'username'); //only populate the username 

        return new Response(JSON.stringify(reviews), { status: 200 })
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}

export const DELETE = async(req, { params }) => { 
    try { 
        await connectToDB(); 
        const { reviewid, index, creatorid } = await req.json(); 

        await Review.deleteOne({ _id: reviewid}); 

        let user = await User.findOne({ _id: creatorid }); 

        let updateRev = []; 
        for(let i = 0; i < user.reviews.length; i++) { 
            if(i != index) { 
                updateRev.push(user.reviews[i]); 
            }
        }; 

        user.reviews = updateRev; 
        await user.save(); //remove the deleted element from the reviews array and save

        return new Response("Review deleted", { status: 200 }); 
    } catch(err) {  
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}