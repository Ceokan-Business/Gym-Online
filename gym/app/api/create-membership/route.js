import { connectToDB } from "@utils/database"; 
import Membership from "@models/membership"; 

export const POST = async(req, res) => { 
    try { 
        await connectToDB();   
        const { title, price } = await req.json(); 

        const membership = new Membership({ 
            title, 
            price, 
        }); 

        await membership.save(); 
        return new Response("New membership added", { status: 200 });
    } catch(err) {  
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}