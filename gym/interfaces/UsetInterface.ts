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
    details: string | MembershipInterface | null,
    isFrozen: Boolean, 
    startDate: Date, 
    finishDate: Date, 
}

export interface TrainerOptionsInterface { 
    trainer: string | TrainerInterface | null, 
    isTrainer: boolean, 
    trainerProfile: string | TrainerInterface | null,
}

export interface UserInterface { 
    username: string, 
    image: string, 
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
    image: "", 
    trainerOptions: { 
        trainer: null, 
        isTrainer: false, 
        trainerProfile: null,
    }, 
    membership: { 
        details: null,  
        isFrozen: false, 
        startDate: new Date(), 
        finishDate: new Date (), 
    }, 
    notifications: [],
    posts: [], 
    calendar: [], 
    likedPosts: [], 
}