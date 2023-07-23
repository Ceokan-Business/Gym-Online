import { Schema, models, model } from 'mongoose'; 

const ReviewSchema = new Schema({ 
    text: { 
        type: String, 
        requried: [ true, "text is required"], 
    }, 
    cretor: { 
        type: [ Schema.Types.ObjectId], 
        ref: "User"
    }
}); 

const Review = models.Review | model("Review", ReviewSchema); 
export default Review; 
