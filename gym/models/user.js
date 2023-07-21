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

const MembershipUserSchema = new Schema({ 
    details: { 
        type: Schema.Types.ObjectId, 
        ref: "Membership"
    }, 
    isFrozen: { 
        type: Boolean, 
        default: false, 
    }, 
    startDate: { 
        type: Date, 
        required: [ true, 'Start Date is required']
    }, 
    finishDate: { 
        type: Date, 
        required: [ true, 'Finish Date is required']
    }, 
})

const TrainerOptionsSchema = new Schema({ 
    trainer: { 
        type: Schema.Types.ObjectId, 
        ref: "Trainer"
    }, 
    isTrainer: { 
        type: Boolean, 
        default: false, 
    }, 
    trainerProfile: { 
        type: Schema.Types.ObjectId, 
        ref: "Trainer"
    }
})

const UserSchema = new Schema({ 
    username: { 
        type: String, 
        required: [ true, "Username is required"], 
    }, 
    password:  {
        type: String, 
    }, 
    image: { 
        type: String, 
    }, 
    trainerOptions: { 
        type: TrainerOptionsSchema,
    }, 
    grades: { 
        type: [String], 
        required: [ true, 'Grades are required']
    }, 
    membership: { 
        type: MembershipUserSchema, 
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
