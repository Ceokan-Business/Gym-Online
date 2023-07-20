import { MembershipInterface } from "./MembershipInterface";
import { TrainerInterface } from "./TrainerInterface";
import { NotificationInterface } from "./NotificationInterface";
import { PostInterface } from "./PostInterface";

export interface DayInterface { 
    date: Date, 
    kg: number, 
    height: number, 
}; 

export interface MembershipUserInterface { 
    details: string | MembershipInterface, 
    startDate: Date, 
    finishDate: Date, 
}

export interface TrainerOptionsInterface { 
    trainer: string | TrainerInterface, 
    isTrainer: boolean, 
    trainerProfile: string | TrainerInterface, 
}

export interface UserInterface { 
    username: string, 
    password?: string, 
    trainerOptions: TrainerOptionsInterface, 
    grades: string [], 
    membership: MembershipUserInterface, 
    notifications: string[] | NotificationInterface[], 
    posts: string[] | PostInterface[], 
    calendar: DayInterface [], 
    likedPosts: string | PostInterface[]; 
}

export const initialDay = { 
    date: new Date(), 
    kg: 0, 
    height: 0, 
}

export const initialUser  = { 
    username: "", 
    trainerOptions: { 
        trainer: "", 
        isTrainer: false, 
        trainerProfile: ""
    }, 
    membership: { 
        details: "", 
        startDate: new Date(), 
        finishDate: new Date (), 
    }, 
    notifications: [],
    posts: [], 
    calendar: [], 
    likedPosts: [], 
}