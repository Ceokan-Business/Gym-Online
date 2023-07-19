import { Schema, models, model } from 'mongoose'; 

const MembershipSchema = new Schema({ 
    title: { 
        type: String, 
        required: [true, 'Title is required!']
    }, 
    price: { 
        type: Schema.Types.Number, 
        required: [true, 'Number is required']
    }
}); 

const Membership = models.Membership || model('Membership', MembershipSchema); 
export default Membership; 