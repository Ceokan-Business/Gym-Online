import { UserInterface } from "./UsetInterface";

export interface ReviewInterface { 
    text: string, 
    creator: UserInterface | string, 
}

export const initalReview = { 
    text: "", 
    creator: "", 
}