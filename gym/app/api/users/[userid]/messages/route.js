import { connectToDB } from '@utils/database'; 
import User from '@models/user'; 

export const GET = async (req, { params }) => {  
    try { 
        await connectToDB(); 
    } catch (err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}