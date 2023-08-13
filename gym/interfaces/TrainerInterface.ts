import { UserInterface } from "./UsetInterface"

export interface MeetInterface { 
    trainee: string | UserInterface, 
    startDate: Date, 
    description: string, 
}

export interface DayTrainerInterface { 
    date: Date, 
    meetings: MeetInterface [] 
}

export interface ContactInterface { 
    facebook: string, 
    instagram: string, 
    youtube: string, 
    email: string, 
}

export interface TrainerInterface { 
    _id: string, 
   username: string, 
   userId: string, 
   description: string, 
   contact: ContactInterface
   trainees: string [] | UserInterface [], 
   timetable: DayTrainerInterface[], 
}


export const initialTrainer = { 
    _id: "", 
    username: "", 
    userId: "", 
    description: "", 
    trainees: [], 
    timetable: [], 
}; 
