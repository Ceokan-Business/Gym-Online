import { connectToDB } from "@utils/database"; 
import Membership from "@models/membership"; 

export const GET = async (request) => { 
    try  { 
        await connectToDB(); 

        const memberships = await Membership.find( { }); 
        return new Response(JSON.stringify(memberships), { status: 200 }); 
    } catch(err) {  
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}