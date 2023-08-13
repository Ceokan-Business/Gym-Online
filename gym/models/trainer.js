import { Schema, models, model } from 'mongoose'; 

const MeetSchema = new Schema({ // a meet in a day in the life of a trainer 
    trainee: { 
        type: Schema.Types.ObjectId, 
        ref: "User"
    }, 
    startDate: { 
        type: Date, 
        required: [ true, "Start Date is required"]
    }, 
    description: { 
        type: String
    }
})

const DayTrainerSchema = new Schema({ // day schmea with how many meetings he wants to have
    date: Date, 
    meetings: { 
        type: [MeetSchema]
    }
})

const ContactSchema = new Schema({ 
    facebook: { 
        type: String, 
        default: "" 
    }, 
    instagram: { 
        type: String, 
        default: ""
    }, 
    youtube: { 
        type: String, 
        default: ''
    }, 
    email: { 
        type: String, 
        default: ""
    }
})

const TrainerSchema = new Schema({ 
    username: { 
        type: String, 
        required: [ true, "Username is required"] 
    }, 
    userId: { 
        type: Schema.Types.ObjectId, 
    }, 
    description: { 
        type: String, 
    }, 
    contact: ContactSchema, 
    trainees: { 
        type: [Schema.Types.ObjectId], 
        ref: "User"
    }, 
    timetable: { 
        type: [DayTrainerSchema]
    }
}); 

const Trainer = models.Trainer || model("Trainer", TrainerSchema); 
export default Trainer; 
