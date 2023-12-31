// route to check the grades of an user

import { connectToDB } from "@utils/database"; 
import { ObjectId } from "mongodb";
import User from "@models/user"; 

export const GET = async(req, { params }) => { 
    try { 
        await connectToDB(); 
        const user = await User.findOne({ _id: new ObjectId(params.userid) }, { grades: 1 }); // populate mebership and trainerOptions
        
        if(!user) { 
            return new Response("Cannot find the user", { status: 404 }); 
        }

        return new Response(JSON.stringify(user), { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}