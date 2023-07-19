export interface PostInterface {
    _id: string
    title: string, 
    description: string, 
    creator: string, 
    likes: string[]
}; 

export const initialPost = { 
    _id: "", 
    title: "", 
    creator: "",
    likes: [], 
}