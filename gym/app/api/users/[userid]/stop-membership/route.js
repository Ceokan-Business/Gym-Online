import { connectToDB } from "@utils/database"; 
import User from "@models/user"; 
import Notification from "@models/notification"; 

import { TITLE_CANCEL_MEMBERSHIP, GRADES } from '@global/constants'; 

export const PATCH = async (req, { params }) => { 
    try { 
        await connectToDB(); 

        const { whyText, creatorId  } = await req.json(); 

        // Creeate the notification 

        const note = new Notification({ 
            title: TITLE_CANCEL_MEMBERSHIP, 
            text: whyText, 
            creator: creatorId, 
            sentDate: new Date(), 
            seen: false, 
            receiver: params.userid, 
            date: null, 
        }); 

        await note.save(); 

        // Cancel the membership

        let user = await User.findOne({ _id: params.userid }); 

        let grades = []; 

        //get rid of member grade
        for(let i = 0; i < user.grades.length; i++) { 
            if(user.grades[i] != GRADES[1]) { //grad de membru
                grades.push(user.grades[i])
        }

        user.grades = grades; 

        user.membership = { details: null, startDate: null, finishDate: null, isFrozen: false }; // elimina abonamentul 

        //adauga notificare in profil 
        let notes = user.notifications; 
        notes.push(note._id); 
        user.notifications = notes; 
        
        await user.save (); // salveaza userul in baza de date; 

        return new Response("Succesfully canceled", { status: 200 }); 
    }
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}