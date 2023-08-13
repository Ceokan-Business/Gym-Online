import { connectToDB } from '@utils/database'; 
import Trainer from '@models/trainer'; 

export const PATCH = async(req, { params }) => { 
    try { 
        await connectToDB(); 
        const { action, text, social, link } = await req.json(); 
        let response = '';

        let trainer = await Trainer.findOne({ userId: params.trainerid }); 

        if(action == "DESCRIPTION") { 
            trainer.description = text; 
            response = 'Description changed.'; 
        }

        if(action == "CONTACT") { 
            trainer.contact[`${social}`] = link; 

            console.log(trainer.contact); 
            response = `${social} changed`; 
        }

        await trainer.save(); 
        return new Response(response, { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}; 

export const DELETE = async(req, { params }) => { 
    try { 
        await connectToDB(); 
        const { action, social } = await req.json(); 
        let response = ''; 

        console.log({ action }); 

        let trainer = await Trainer.findOne({ userId: params.trainerid }); 

        if(action === 'DESCRIPTION') { 
            trainer.description = ''; 
            response = 'Description removed'; 
        }

        if(action === 'CONTACT') { 
            trainer.contact[`${social}`] = ''; 
            response = `${social} deleted`; 
        }

        await trainer.save(); 
        return new Response(response, { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 });
    }
}