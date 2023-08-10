import { GRADES } from '@global/constants'; 
import { connectToDB } from '@utils/database'; 
import User from '@models/user'; 

export const PATCH = async(req, { params }) => { 
    try { 
        await connectToDB(); 

        let user = await User.findOne({ _id: params.userid }); 

        if(!user.grades.includes(GRADES[2])) { 
            user.grades.push(GRADES[2]);

            await user.save (); 
            return new Response("Owner grade added", { status: 200 })
        }; 

        return new Response("Already done", { status: 200 }); 
    } catch(err) {      
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}