import { Schema, models, model } from 'mongoose'; 

const PostSchema = new Schema({ 
    title: { 
        type: String, 
        required:  [true, 'Title is required'],
    }, 
    description: { 
        type: String, 
        required: [true, 'Description is required']
    }, 
    creator: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: [ true, 'Creator is required']
    }, 
    likes: { 
        type: [Schema.Types.ObjectId], 
        ref: 'User'
    }
}); 

const Post = models.Post || model("Post", PostSchema); 
export default Post; 
