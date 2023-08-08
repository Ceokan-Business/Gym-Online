import { Schema, model, models } from 'mongoose'; 

const GlobalMessageSchema = new Schema({ 
    text: { 
        type: String, 
        required: [ true, 'text is required!']
    }
}); 

const GlobalMessage = models.GlobalMessage || model("GlobalMessage", GlobalMessageSchema); 
export default GlobalMessage; 