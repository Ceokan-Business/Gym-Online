export interface NotificationInterface { 
    title: string, 
    text: string, 
    seen: boolean, 
    sentDate: Date, 
}

export const initialNotification = { 
    title: "", 
    text: "", 
    seen: false, 
    sentDate: new Date(),
}