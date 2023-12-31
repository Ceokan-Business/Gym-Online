import { Schema, models, model } from 'mongoose'; 

const NotificationSchema = new Schema({ 
    title: { 
        type: String, 
        required: [ true, "Title is required"]
    }, 
    text: { 
        type: String, 
        required: [ true, 'Text is required']
    }, 
    seen: { 
        type: Boolean, 
        default: false,
    }, 
    sentDate: { 
        type: Date, 
        required: [ true, 'Sent Date is required']
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

const Notification = models.Notification || model('Notification', NotificationSchema); 
export default Notification; 