export interface MessageInterface { 
    _id: string
    text: string, 
    seen: boolean, 
    sentDate: Date, 
    creator: string, 
    receiver: string, 
}

export const initialMessage = { 
    _id: "", 
    text: "", 
    seen: "", 
    creator: "", 
    receiver: "", 
}