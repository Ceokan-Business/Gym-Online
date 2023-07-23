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

export const DELETE = async(req, { params }) => { 
    try  {
        await connectToDB(); 

        let user = await User.findOne( { _id: params.userid }); 
        
        for(let i = 0; i < user.notifications.length; i++) { 
            await Notification.deleteOne({ _id: user.notifications[i]});
        }

        user.notifications = []; 

        console.log({ user }); 
        return new Response("All notifications deleted", { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err,  { status: 500 }); 
    }
}

export const PATCH = async (req, { params }) => { //mark all notifications as read
    try {   
        await connectToDB(); 

        const user = await User.findOne( { _id: params.userid }); 

        for(let i = 0; i < user.notifications.length; i++) { 
            await Notification.updateOne({ _id: user.notifications[i]}, { $set: { seen: true }}); 
        }

        return new Response("All notifications marked as read", { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}