import { UserInterface } from "./UsetInterface"

export interface PostInterface {
    _id: string
    title: string, 
    description: string, 
    creator: string | UserInterface, 
    likes: string[] | UserInterface[], 
}; 

export const initialPost = { 
    _id: "", 
    title: "", 
    creator: "",
    likes: [], 
}