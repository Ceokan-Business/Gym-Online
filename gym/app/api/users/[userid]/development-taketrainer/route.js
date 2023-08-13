import { GRADES } from '@global/constants'; 
import { connectToDB } from '@utils/database'; 
import User from '@models/user'; 
import Trainer from '@models/trainer'; 

export const PATCH = async(req, { params }) => { 
    try { 
        await connectToDB(); 

        let user = await User.findOne({ _id: params.userid }); 

        if(!user.grades.includes(GRADES[2])) { 
            user.grades.push(GRADES[2]);

            await user.save (); // push  the trainer grade to the user profile

            //create the trainer in the database 
            const trainer = new Trainer({ 
                username: user.username, 
                userId: params.userid, 
                description: "", 
                contact: { 
                    facebook: "", 
                    instagram: "", 
                    youtube: "", 
                    email: "", 
                }, 
                trainees: [],
                timetable: [],
            }); 

            console.log({ trainer }); 
            await trainer.save(); 
            return new Response("Owner grade added", { status: 200 })
        }; 

        return new Response("Already done", { status: 200 }); 
    } catch(err) {      
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}