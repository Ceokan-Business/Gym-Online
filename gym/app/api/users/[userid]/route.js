import { connectToDB } from "@utils/database"; 
import User from "@models/user"; 
import Membership from "@models/membership"; 
import Notification from "@models/notification";
import { GYM_SESSION_NOTIFICATIONS, GRADES } from "@global/constants";

export const GET = async(req, { params }) => { 
    try { 
        await connectToDB(); 

        const user = await User.findOne({ _id: params.userid}, { calendar: 0 }).populate('membership.details').populate("posts");  // populate mebership and trainerOptions
        
        if(!user) { 
            return new Response("Cannot find the user", { status: 404 }); 
        }

        return new Response(JSON.stringify(user), { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}

export const PATCH = async (req, { params }) => {
    try {
        await connectToDB();
        const { action, creatorid, details } = await req.json (); 

        if(action == "ADD_SESSION") { 
            let user = await User.findOne({ _id: params.userid }); 
            user.membership.doneSessions++; 

            const notification = new Notification({ 
                title: GYM_SESSION_NOTIFICATIONS.NEW_SESSION_TITLE,
                text: GYM_SESSION_NOTIFICATIONS.NEW_SESSION_DESCRIPTION, 
                seen: false, 
                creator: creatorid, 
                receiver: params.userid, 
                sentDate: new Date()
            }); 

            let leftSessions = details.availableSessions - user.membership.doneSessions; 

            if(leftSessions === details.availableSessions / 2) { 
                const halfNotification = new Notification({ 
                    title: GYM_SESSION_NOTIFICATIONS.HALF_MEMEBERSHIP_TITLE, 
                    text: GYM_SESSION_NOTIFICATIONS.HALF_MEMBERSHIP_DESCRIPTION, 
                    seen: false, 
                    creator: creatorid, 
                    receiver: params.userid, 
                    sentDate: new Date()
                }); 

                await halfNotification.save (); 

                let notifications = user.notifications; 
                notifications.push(halfNotification._id); 
    
                user.notifications = notifications;          
            }

            if(leftSessions === 1) { 
                const endNotification = new Notification({ 
                    title: GYM_SESSION_NOTIFICATIONS.END_MEMBERSHIP_TITLE, 
                    text: GYM_SESSION_NOTIFICATIONS.END_MEMBERSSHIP_DESCRIPTION, 
                    seen: false, 
                    creator: creatorid, 
                    receiver: params.userid, 
                    sentDate: new Date()
                }); 

                await endNotification.save(); 

                let notifications = user.notifications; 
                notifications.push(endNotification._id); 
    
                user.notifications = notifications; 
            }

            await notification.save(); 

            let notifications = user.notifications; 
            notifications.push(notification._id); 

            user.notifications = notifications; 

            if(leftSessions === 0) { 
                user.grades = [GRADES[0]]; 

                let finishNotification = new Notification({ 
                    title: GYM_SESSION_NOTIFICATIONS.FINISHED_MEMBERSHIP_TITLE, 
                    text: GYM_SESSION_NOTIFICATIONS.FINISHED_MEMBERSHIP_DESCRIPTION, 
                    seen: false, 
                    creator: creatorid, 
                    receiver: params.userid, 
                    sentDate: new Date()
                }); 

                await finishNotification.save(); 

                let notifications = user.notifications; 
                notifications.push(finishNotification._id); 
    
                user.notifications = notifications; 
            }

            await user.save (); 

            return new Response("Session added", { status: 200 }); 
        }; 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}