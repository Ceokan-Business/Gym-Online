import { Schema, models, model } from 'mongoose'; 

const MembershipSchema = new Schema({ 
    title: { 
        type: String, 
        required: [true, 'Title is required!']
    }, 
    price: { 
        type: Schema.Types.Number, 
        required: [true, 'Number is required']
    }, 
    availableSessions: { 
        type: Schema.Types.Number, 
        default: 0, 
    }
}); 

const Membership = models.Membership || model('Membership', MembershipSchema); 
export default Membership; 