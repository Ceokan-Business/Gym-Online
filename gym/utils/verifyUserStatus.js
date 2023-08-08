import { GRADES } from '@global/constants'; 

export async function verifyUserStatus(id) { 
    try {
        const response = await fetch(`/api/users/${id}/check`); 
        const userResponse = await response.json(); 

        if(userResponse.grades.includes(GRADES[3]) || userResponse.grades.includes(GRADES[4]))
            return true; 

        return false; 
    } catch(err) { 
        console.log(err);
        return false; 
    }
}; 

export async function verifyOwnerStatus(id) { 
    try {
        const response = await fetch(`/api/users/${id}/check`); 
        const userResponse = await response.json(); 

        console.log(userResponse);

        if(userResponse.grades.includes(GRADES[4]))
            return true; 

        return false; 
    } catch(err) { 
        console.log(err);
        return false; 
    }
}