import { connectToDB } from '@utils/database'; 
import User from "@models/user"; 
import { GRADES, EMAIL_PLACEHOLDER } from '@global/constants'; 

export const PATCH = async (req, { params }) => { 
    try { 
        await connectToDB (); 
        const { userid, membershipid } = await req.json(); 

        console.log({ membershipid, userid }); 
        // Getting the dates
        const currentDate = new Date (); 

        let futureDate = new Date(currentDate); 
        futureDate.setDate(currentDate.getDate() + 30); 

        // Find the user for the membership
        let user = await User.findOne({ _id: userid }); 

        user.membership.details = membershipid; 

        // Member grade
        if(!user.grades.includes(GRADES[1])) { 
            user.grades.push(GRADES[1]); 
        }

        // Dates of the membership - 30 days 
        user.membership.startDate = currentDate; 
        user.membership.finishDate = futureDate; 

        user.email = EMAIL_PLACEHOLDER; 

        await user.save(); 

        return new Response("Membership added", { status: 200 }); 
    } catch(err) { 
        return new Response(err, { status: 500 }); 
    }

}