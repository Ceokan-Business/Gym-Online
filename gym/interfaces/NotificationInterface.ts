import { UserInterface } from "./UsetInterface"

export interface NotificationInterface { 
    title: string, 
    text: string, 
    seen: boolean, 
    sentDate: Date, 
    creator: string | UserInterface, 
    receiver: string | UserInterface, 
    date: Date | null, 
}

export const initialNotification = { 
    title: "", 
    text: "", 
    seen: false, 
    sentDate: new Date(),
    creator: "", 
    receiver: "", 
    date: null, 
}