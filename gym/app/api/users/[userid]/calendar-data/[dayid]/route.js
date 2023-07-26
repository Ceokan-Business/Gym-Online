import { connectToDB } from '@utils/database'; 
import User from '@models/user';
import dayjs from 'dayjs';

export const GET = async (req, { params }) => { 
    try { 
        await connectToDB(); 
        const dateToSearch = params.dayid; 

        console.log({ dateToSearch }); 

        const user = await User.findOne({ _id: params.userid }, { calendar: 1 });
    
        let data = {}; 
        for(let i = 0; i < user.calendar.length; i++) { 
            if(dayjs(user.calendar[i].date).toDate().toDateString() == dateToSearch) { 
                data = user.calendar[i]; 
                console.log(dayjs(user.calendar[i].date).toDate().toDateString()); 
                i = user.calendar.length; 
            }
        }; 

        console.log({ data }); 

        return new Response(JSON.stringify(data), { status: 200 }); 
    } catch (err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}; 

export const POST = async(req, { params }) => { 
    try { 
        await connectToDB(); 
        const dateToUpdate = params.dayid;  
        const { kg, height } = await req.json(); 

        console.log({ dateToUpdate }); 

        let user = await User.findOne({ _id: params.userid }, { calendar: 1 }); 
        user.calendar.push({ 
            date: dateToUpdate, 
            kg, 
            height, 
        }); 

        await user.save(); 
        return new Response("Calendar updated", { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}; 

export const PATCH = async(req, { params }) => { 
    try { 
        await connectToDB(); 
        const dateToUpdate = params.dayid;  
        const { kg, height } = await req.json(); 

        let user = await User.findOne({ _id: params.userid }, { calendar: 1 }); 
        for(let i = 0; i < user.calendar.length; i++) { 
            if(dayjs(user.calendar[i].date).toDate().toDateString() === dateToUpdate) { 
                user.calendar[i].kg = kg; 
                user.calendar[i].height = height; 
            }
        }; 

        await user.save (); 
        return new Response("Calendar updated", { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 });
    }
}