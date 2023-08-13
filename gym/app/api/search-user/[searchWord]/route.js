import { connectToDB } from '@utils/database'; 
import User from '@models/user'; 

export const GET = async(req, { params }) => { 
    try { 
        await connectToDB(); 
        let userId = await User.findOne({ username: params.searchWord }, { _id: 1}); 

        console.log({ userId: userId._id.toString() }); 
        return new Response(JSON.stringify({ userId: userId._id.toString()}), { status: 200 }); 
    } catch(err) { 
        console.log(err); 
    }
}