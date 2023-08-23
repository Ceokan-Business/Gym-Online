import { connectToDB } from '@utils/database'; 
import User from '@models/user'; 

export const GET = async (req, { params }) => {  
    try { 
        await connectToDB(); 
        const user = await User.findOne({  _id: params.userid }, { username: 1, image: 1, messages: 1 });  
        console.log(user);

        if(!user) { 
            return new Response("Cannot find the user", { status: 404 }); 
        }

        return new Response(JSON.stringify({ messages: user.messages, image: user.image, username: user.username }), { status: 200 }); 
    } catch (err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}