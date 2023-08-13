import { connectToDB } from '@utils/database'; 
import User from '@models/user'; 

export const GET = async(req, { params }) => { 
    try { 
        await connectToDB(); 

        let usernames = await User.find({}, { username: 1 }); 
        return new Response(JSON.stringify(usernames), { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}