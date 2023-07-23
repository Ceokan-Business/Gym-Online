export interface MembershipInterface { 
    _id: string, 
    title: string, 
    price: number, 
    availableSessions: number
}; 

export const initialMembership = { 
    _id: "", 
    title: "", 
    price: 0, 
    availableSessions: 0, 
}; 