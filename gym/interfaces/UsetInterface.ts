export interface DayInterface { 
    date: Date, 
    kg: number, 
    height: number, 
}; 

export interface UserInterface { 
    username: string, 
    trainer: string, 
    grades: string [], 
    membership: string, 
    startDate: Date, 
    finishDate: Date, 
    notifications: string[], 
    posts: string[], 
    calendar: DayInterface [], 
    likedPosts: string; 
}

export const initialDay = { 
    date: new Date(), 
    kg: 0, 
    height: 0, 
}

export const initialUser  = { 
    username: "", 
    trainer: "", 
    grades: [], 
    membership: "", 
    startDate: new Date(), 
    finishDate: new Date(), 
    notifications: [],
    posts: [], 
    calendar: [], 
    likedPosts: [], 
}