import { UserInterface } from "./UsetInterface"

export interface NotificationInterface { 
    title: string, 
    text: string, 
    seen: boolean, 
    sentDate: Date, 
    creator: string | UserInterface, 
    receiver: string | UserInterface, 
}

export const initialNotification = { 
    title: "", 
    text: "", 
    seen: false, 
    sentDate: new Date(),
    creator: "", 
    receiver: "", 
}