'use client'; 

import { useState, useEffect } from 'react'; 
import { verifyUserStatus } from '@utils/verifyUserStatus';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

// Memberships stuff
import MembershipList from '@components/Membership/MembershipList';
import { MembershipInterface } from '@interfaces/MembershipInterface';

const MemberShipsPage = () => {
    const { data: session } = useSession(); 
    const [ memberships, setMemberships ] = useState <MembershipInterface []>([]); 
    const [ loaded, setLoaded ] = useState <Boolean> (false);
    const [ isAdmin, setIsAdmin ] = useState <Boolean> (false); // for creating memberships

    useEffect( () => { 
        const getMembershipData = async () => { 
            try { 
                const response = await fetch('/api/memberships'); 
                const membershipResponse = await response.json(); 

                const adminCheck: boolean = await verifyUserStatus(session?.user?.id); 
                setIsAdmin(adminCheck);

                setMemberships(membershipResponse); 
                setLoaded(true); 
            } catch(err) { 
                console.log(err); 
            }
        } 

        getMembershipData(); 
    }, []); 

    const deleteMembership = async (membershipid: string, index: number) => { 
        try { 
            const response = await fetch(`/api/memberships/${membershipid}`, { 
                method: "DELETE", 
                mode: "cors", 
                headers: { 
                    "Content-Type": "application/json", 
                }
            }); 

            let membershipsUpdate = []; 
            let MEMBERSHIPS = memberships === undefined ? [] : memberships; 

            for(let i = 0; i < MEMBERSHIPS.length; i++) { 
                if(i != index) { 
                    membershipsUpdate.push(MEMBERSHIPS[i]); 
                }
            }; 

            setMemberships(membershipsUpdate); 

            if(response.ok) {
                return; 
            }
        } catch(err) { 
            console.log(err); 
        }
    }

  return (
    <section>
        { !loaded && 
            <p> Loading... </p>
        }

        { loaded && memberships.length === 0 && 
            <div>
                <p> Momentan nu exita niciun abonament valabil </p>
                { isAdmin && 
                    <Link className = 'default_button' href = 'create-membership'> Creeaza abonament </Link>
                }
            </div>
        }

        { isAdmin && 
                    <Link className = 'default_button' href = 'create-membership'> Creeaza abonament </Link>
        }

        { loaded && memberships.length > 0 && 
            <MembershipList deleteMembership = { deleteMembership } isAdmin = { isAdmin } memberships = { memberships } /> 
        }
    </section>  
  )
}

export default MemberShipsPage