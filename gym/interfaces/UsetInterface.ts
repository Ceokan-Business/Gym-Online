import { MembershipInterface } from "./MembershipInterface";
import { TrainerInterface } from "./TrainerInterface";
import { NotificationInterface } from "./NotificationInterface";
import { PostInterface } from "./PostInterface";
import { MessageInterface } from "./MessageInterface";
import dayjs from 'dayjs';

export interface DayInterface { 
    date: dayjs.Dayjs | Date | null, 
    kg: number, 
    height: number, 
}; 

export interface MembershipUserInterface { 
    details:  MembershipInterface | null | string,
    isFrozen: Boolean, 
    startDate: Date | null, 
    finishDate: Date | null, 
    doneSessions: number, 
    sessionDates: Date []
}

export interface TrainerOptionsInterface { 
    trainer: string | TrainerInterface | null, 
    isTrainer: boolean, 
    trainerProfile: string | TrainerInterface | null,
}

export interface UserInterface { 
    _id: string, 
    username: string, 
    email: string, 
    image: string, 
    password?: string, 
    trainerOptions: TrainerOptionsInterface, 
    grades: string [], 
    membership: MembershipUserInterface, 
    notifications: string[] | NotificationInterface[], 
    posts: PostInterface[] | string[], 
    calendar: DayInterface [], 
    likedPosts: PostInterface[] | string; 
    messages: MessageInterface[] | string []; 
}

export const initialDay = { 
    date: null, 
    kg: 0, 
    height: 0, 
}

export const initialUser  = { 
    _id: "", 
    username: "", 
    email: "", 
    image: "", 
    grades: [], 
    trainerOptions: { 
        trainer: null, 
        isTrainer: false, 
        trainerProfile: null,
    }, 
    membership: { 
        details: null,  
        isFrozen: false, 
        startDate: null, 
        finishDate: null, 
        doneSessions: 0, 
        sessionDates: [], 
    }, 
    notifications: [],
    posts: [], 
    calendar: [], 
    likedPosts: [], 
    messages: [], 
}

// __________________________________________________________

export interface PopulatedMembershipInterface { 
    details:  MembershipInterface | null,
    isFrozen: Boolean, 
    startDate: Date | null, 
    finishDate: Date | null, 
    doneSessions: number, 
    sessionDates: Date [], 
}

export interface PopulatedOptionsInterface { 
    trainer: string | TrainerInterface | null, 
    isTrainer: boolean, 
    trainerProfile: string | TrainerInterface | null,
}

export interface PopulatedUserInterface { 
    _id: string, 
    username: string, 
    email: string, 
    image: string, 
    password?: string, 
    trainerOptions: PopulatedOptionsInterface, 
    grades: string [], 
    membership: PopulatedMembershipInterface, 
    notifications: string[] | NotificationInterface[], 
    posts: PostInterface[], 
    calendar: DayInterface [], 
    likedPosts: PostInterface[] | string; 
    messages: MessageInterface[] | string []; 
}

export const populatedInitialUser  = { 
    _id: "", 
    username: "", 
    image: "", 
    email: "", 
    grades: [], 
    trainerOptions: { 
        trainer: null, 
        isTrainer: false, 
        trainerProfile: null,
    }, 
    membership: { 
        details: { 
            _id: "", 
            title: "", 
            price: 0, 
            startDate: null, 
            finishDate: null, 
            availableSessions: 0, 
        },  
        isFrozen: false, 
        startDate: null, 
        finishDate: null, 
        doneSessions: 0, 
        sessionDates: [], 
    }, 
    notifications: [],
    posts: [], 
    calendar: [], 
    likedPosts: [], 
    messages: [], 
}
