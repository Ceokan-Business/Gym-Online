import { UserInterface } from "./UsetInterface";

export interface ReviewInterface { 
    _id: string, 
    text: string, 
    creator: UserInterface | string, 
}

export const initialReview = { 
    _id: "", 
    text: "", 
    creator: "", 
}