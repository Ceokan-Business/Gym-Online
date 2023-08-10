import { connectToDB } from '@utils/database'; 
import GlobalMessage from '@models/global_message';

export const GET = async(req, res) => { 
    try { 
        await connectToDB(); 

        const message = await GlobalMessage.findOne({});
        console.log({ message }); 

        if(!message) { 
            return new Response(null, { status: 204 }); 
        }; 

        return new Response(JSON.stringify(message.text), { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 });
    }
}

export const POST = async (req, res) => { 
    try { 
        await connectToDB(); 
        const { text } = await req.json(); 
        
        if(text != "") { 
            const newGlobal = new GlobalMessage({ 
                text
            }); 

            await newGlobal.save(); 
            return new Response(JSON.stringify({ globalMessage: newGlobal }, { status: 200 })); 
        }

        return new Response("Text empty", { status: 204 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
} 

export const PATCH = async (req, res) => { 
    try { 
        await connectToDB(); 
        const { text } = await req.json(); 

        if(text != '') { 
            let globalMessage = await GlobalMessage.findOne( { } ); 
            globalMessage.text = text; 
            await globalMessage.save(); 
            return new Response(JSON.stringify({ globalMessage }, { status: 200 })); 
        }

        return new Response("Text empty", { status: 204 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err,  { status: 500 }); 
    }
}

export const DELETE = async(req, res) => { 
    try { 
        await connectToDB(); 

        await GlobalMessage.findOneAndDelete( { }); 
        return new Response('DELETED', { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err,  { status: 500 }); 
    }
}