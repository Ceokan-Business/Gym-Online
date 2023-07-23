import { connectToDB } from "@utils/database"; 
import User from "@models/user"; 
import Notification from "@models/notification";

export const GET = async (req,  { params }) => { 
    try { 
        await connectToDB(); 

        const userNotifications = await User.findOne({ _id: params.userid }, { notifications: 1}).populate("notifications");    
        
        console.log( { userNotifications }); 

        let counter = 0; 
        for(let i = 0; i < userNotifications.notifications.length; i++) { 
            if(userNotifications.notifications[i].seen == false) { 
                counter++; 
            }
        }; 

        console.log(counter); 
        return new Response(JSON.stringify({ notifications: userNotifications.notifications, counter }), { status: 200 })
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}