import { connectToDB } from '@utils/database'; 
import User from '@models/user';

export const GET = async (req, { params }) => { 
    try { 
        await connectToDB(); 
        const dateToSearch = params.dayid; 

        console.log({ dateToSearch }); 

        const user = await User.findOne({ _id: params.userid }, { calendar: 1 });
    
        let data = {}; 
        for(let i = 0; i < user.calendar.length; i++) { 
            if(user.calendar[i].date == dateToSearch) { 
                data = user.calendar[i]; 
                console.log(user.calendar[i].date); 
                i = user.calendar.length; 
            }
        }; 

        console.log({ data }); 

        return new Response(JSON.stringify(data), { status: 200 }); 
    } catch (err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}