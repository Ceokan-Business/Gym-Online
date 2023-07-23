'use client'

import { NotificationInterface } from "@interfaces/NotificationInterface"
import { useState } from 'react'; 

interface Props { 
    notifications: NotificationInterface [], 
    markAsRead: (index: number) => void
}

interface ItemProps { 
    notification: NotificationInterface, 
    markAsRead: (index: number) => void
    index: number
}

const NotificationItem = ({ notification, markAsRead, index }: ItemProps) => {
    const [ showPopup, setShowPopup ] = useState <boolean> (false); 

    const firstTimeRead = async () => { 
        setShowPopup(true); 

        try { 
            const response = await fetch(`/api/notifications/${notification._id}`, { 
                method: "PATCH", 
                mode: 'cors', 
                headers: { 
                    'Content-Type': "application/json", 
                }
            }); 

            markAsRead(index); 

            if(response.ok) { 
                return; 
            }

        } catch(err) { 
            console.log(err); 
        }
    }

    const smallDescription = notification.text.length > 20 ? `${notification.text.substring(0, 20)}...` : notification.text;  
    return ( 
        <>
            { notification.seen ? 
                ( 
                    <article className = 'px-4 py-2 cursor-pointer hover:bg-light-blue transition-all duration-300' onClick = { () => { setShowPopup(true); } }>
                        <p> { notification.title } </p>
                        <p> { smallDescription } </p>
                    </article>
                ) :  
                ( 
                    <article className = 'bg-red-500 px-4 py-2 cursor-pointer hover:bg-light-blue transition-all duration-300' onClick = { firstTimeRead }>
                        <p> { notification.title } </p>
                        <p> { smallDescription } </p>
                    </article>
                )
            }

            { showPopup && 
                <article className="min-w-[15%] min-h-[15%] px-4 bg-light-blue fixed inset-y-1/2 -translate-x-1/2 -translate-y-1/2 inset-x-1/2 grid place-content-center">
                    <p> { notification.title } </p>
                    <p> { notification.text } </p>
                    <button onClick =  { () => setShowPopup(false) } className = 'default_button'> Inchide </button>
                </article>
            }
        </>
    )
}

const NotificationDropDown = ({ notifications, markAsRead }: Props ) => {
  return (
    <section  className = 'absolute top-16 bg-light-orange'>
        { notifications.length == 0 ? 
            ( 
                <p> Nu exista notificari. </p>
            ) : 
            ( 
                <>
                    { notifications.map((notification, index) => { 
                        return ( 
                            <NotificationItem notification = { notification } markAsRead = { markAsRead } index = { index } /> 
                        )
                    })}
                </>
            )
        }
    </section > 
  )
}

export default NotificationDropDown