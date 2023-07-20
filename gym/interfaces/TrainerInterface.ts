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

export interface TrainerInterface { 
   username: string, 
   description: string, 
   trainees: string [] | UserInterface [], 
   timetable: DayTrainerInterface[], 
}

export const initialTrainer = { 
    username: "", 
    description: "", 
    trainees: [], 
    timetable: [], 
}; 
