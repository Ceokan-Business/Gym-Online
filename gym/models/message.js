import { Schema, models, model } from 'mongoose'; 

const MessageSchema = new Schema({ 
    text: { 
        type: String, 
        required: [ true, 'Text is required!']
    },
    seen: { 
        type: Boolean, 
        default: false,
    }, 
    sentDate: { 
        type: Date, 
        default: new Date(), 
    }, 
    creator: { 
        type: Schema.Types.ObjectId, 
        ref: "User"
    }, 
    receiver: { 
        type: Schema.Types.ObjectId, 
        ref: "User"
    }, 
}); 

const Message = models.Message || model("Message", MessageSchema); 
export default Message; 