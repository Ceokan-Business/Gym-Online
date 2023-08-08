import { Schema, models, model } from 'mongoose'; 

const GlobalSchema = new Schema({ 
    text: { 
        type: String, 
        required: [ true, 'Text is required!' ]
    }
}); 

const Global = models.Global || model("Global", GlobalSchema); 
export default Global; 