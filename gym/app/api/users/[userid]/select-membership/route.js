import { connectToDB } from '@utils/database'; 
import User from "@models/user"; 
import { GRADES, EMAIL_PLACEHOLDER } from '@global/constants'; 

export const PATCH = async (req, { params }) => { 
    try { 
        await connectToDB (); 
        const { userid, membershipid, frozen } = await req.json(); 

        console.log({ membershipid, userid }); 
        let user = await User.findOne({ _id: userid }); 

        if(!frozen) { 
            if(user.grades.includes(GRADES[1])) { 
                const currentDate = new Date (); 

                let futureDate = new Date(currentDate); 
                futureDate.setDate(currentDate.getDate() + 30); 
        
                // Find the user for the membership
                user.membership.details = membershipid; 
        
                // Member grade
                if(!user.grades.includes(GRADES[1])) { 
                    user.grades.push(GRADES[1]); 
                }
        
                // Getting the dates
                // Dates of the membership - 30 days 
                user.membership.startDate = currentDate; 
                user.membership.finishDate = futureDate; 
            } else { 
                console.log("The user alredy has a membership."); 
            }
        } else { 
            console.log("error from here"); 
            user.membership.isFrozen = true; 
        }

        user.email = EMAIL_PLACEHOLDER; 

        await user.save(); 

        return new Response("Membership added", { status: 200 }); 
    } catch(err) { 
        return new Response(err, { status: 500 }); 
    }

}