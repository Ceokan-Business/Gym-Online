import { connectToDB } from "@utils/database"; 
import Membership from "@models/membership"; 
import User from "@models/user"; 

export const GET = async(req, { params }) => { 
    try { 
        await connectToDB(); 
        const membership = await Membership.findOne({ _id: params.membershipid }); 

        return new Response(JSON.stringify(membership), { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}

export const DELETE = async(req, { params }) => { 
    try { 
        await connectToDB(); 
        const membershipid = params.membershipid; 

        await User.updateMany({ 'membership.details': membershipid}, { $set: { grades: ['User'], membership: { isFrozen: false, details: null, startDate: null, finishDate: null }}})

        await Membership.findOneAndDelete({ _id: membershipid }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 });
    }
}

export const PATCH = async(req, { params }) => { 
    try { 
        await connectToDB(); 
        const { title, price } = await req.json(); 
        const membershipid = params.membershipid; 

        let membership = await Membership.findOne({ _id: membershipid }) // find the membership

        // udpate the membership
        membership.title = title; 
        membership.price = price;
        await membership.save(); 

        return new Response("Membership updated", { status: 200 });         
    } catch(err) { 
        console.log(err); 
        return new Response(err, { stauts: 500 }); 
    }
}