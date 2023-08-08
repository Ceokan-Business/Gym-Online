import { connectToDB } from '@utils/database'; 
import GlobalMessage from '@models/global_message';

export const GET = async(req, res) => { 
    try { 
        await connectToDB(); 

        const message = await GlobalMessage.findOne({});

        if(!message) { 
            return new Response(null, { status: 200 }); 
        }; 

        return new Response(JSON.stringify(message.text), { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 });
    }
}