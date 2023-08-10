import { connectToDB } from '@utils/database'; 
import Trainer from '@models/trainer'; 

export const GET = async (req, { params }) => { 
    try { 
        await connectToDB(); 
        const trainer = await Trainer.findOne({ _id: params.trainerid }); 

        console.log(  trainer); 

        return new Response(JSON.stringify(trainer), { status: 200 });
    } catch(err) { 
        console.log(err, { status: 500 }); 
    }
}