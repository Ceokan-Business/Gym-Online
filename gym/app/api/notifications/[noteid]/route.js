import { connectToDB } from '@utils/database'; 
import Notification from '@models/notification'; 

export const PATCH = async (req, { params }) => { 
    try { 
        await connectToDB(); 

        await Notification.updateOne( { _id: params.noteid }, { $set: { seen: true }}); 

        return new Response("Updated", { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}