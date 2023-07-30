import { connectToDB } from '@utils/database'; 
import User from '@models/user';
import dayjs from 'dayjs';
import Post from '@models/post'; 

export const GET = async (req, { params }) => { 
    try { 
        await connectToDB(); 

        const user = await User.findOne({ _id: params.userid }, { calendar: 1 });
    
        let data = {}; 
        for(let i = 0; i < user.calendar.length; i++) { 
            if(JSON.stringify(user.calendar[i].date) === JSON.stringify(new Date(params.dayid))) {  // find in JSON
                data = user.calendar[i]; 
                i = user.calendar.length; 
            }
        }; 

        console.log({ data }); 

        return new Response(JSON.stringify(data), { status: 200 }); // object with statistics and date in JSON
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
        const { kg, height } = await req.json(); 
        console.log( { kg, height } ); 

        let user = await User.findOne({ _id: params.userid }, { calendar: 1 }); 
        for(let i = 0; i < user.calendar.length; i++) { 
            if(JSON.stringify(user.calendar[i].date) === JSON.stringify(new Date(params.dayid))) { 
                user.calendar[i].kg = kg; 
                user.calendar[i].height = height; 
            }
        }; 
        console.log(user); 

        await user.save (); 
        return new Response("Calendar updated", { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 });
    }
}

export const DELETE = async(req, { params }) => { 
    try { 
        await connectToDB(); 

        let user = await User.findOne({ _id: params.userid }, { calendar: 1 }); 
        let userData = []; 

        console.log(user.calendar.length); 

        for(let i = 0; i < user.calendar.length; i++) { 
            console.log({ i }); 
            if(dayjs(user.calendar[i].date).toDate() != params.dayid) { 
                userData.push(user.calendar[i].date); 
            }
        }; 

        console.log({ userData }); 
        user.calendar = userData; 
        await user.save (); 

        return new Response('Statistics deleted', { status: 200 }); 
    } catch (err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}