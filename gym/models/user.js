import { Schema, models, model } from 'mongoose'; 

const DaySchema = new Schema( { 
    date: { 
        type: Date, 
    }, 
    kg: { 
        type: Schema.Types.Number, 
    }, 
    height: { 
        type: Schema.Types.Number
    }
})

const UserSchema = new Schema({ 
    username: { 
        type: String, 
        required: [ true, "Username is required"], 
    }, 
    trainer: { 
        type: [Schema.Types.ObjectId], 
        ref: "Trainer"
    }, 
    grades: { 
        type: [string], 
    }, 
    membership: { 
        type: Schema.Types.ObjectId, 
        ref: "Membership"
    }, 
    startDate: { 
        type: Date, 
        required: [ true, 'Start Date is required']
    }, 
    finishDate: { 
        type: Date, 
        required: [ true, 'Finish Date is required']
    }, 
    notifications: { 
        type: [Schema.Types.ObjectId], 
        ref: "Notification"
    }, 
    posts: { 
        type: [Schema.Types.ObjectId], 
        ref: "Post"
    }, 
    calendar: { 
        type: [ DaySchema ]
    }, 
    likedPosts: { 
        type: [Schema.Types.ObjectId], 
        ref: "Post"
    }
}); 

const User = models.User || model("User", UserSchema); 
export default User; 
