import { connectToDB } from "@utils/database"; 
import Review from "@models/review"; 

export const POST = async(req,  { params }) => { 
    try { 
        await connectToDB(); 
        const { text, creatorid } = await req.json(); 

        const review = new Review({ 
            text, 
            creator: creatorid, 
        }); 

        await review.save(); 
        return new Response("Review added", { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}