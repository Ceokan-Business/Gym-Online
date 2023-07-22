import { connectToDB } from "@utils/database"; 
import User from "@models/user"; 

export const GET = async(req, { params }) => { 
    try { 
        await connectToDB(); 

        const user = await User.findOne({ _id: params.userid}, { calendar: 0 }).populate('membership.details') // populate mebership and trainerOptions
        
        if(!user) { 
            return new Response("Cannot find the user", { status: 404 }); 
        }

        return new Response(JSON.stringify(user), { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}