'use client'; 

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { UserInterface } from '@interfaces/UsetInterface';

import { generateDate } from '@utils/calendar';
import { conditionalClasses as cn } from '@utils/conditionalClasses';
import { MONTHS, DAYS } from '@global/constants'; 

interface Props { 
  user: UserInterface
}

const MembershipCalendar = ({ user }: Props) => {
  const CURRENT_DATE = dayjs(); 
  const [ today, setToday ] = useState <dayjs.Dayjs> (CURRENT_DATE); 
  const [ sessionDates, setSessionDates ] = useState<boolean []> ([]); 

  useEffect( () => { 
    const compareDates = (dateFromMongoDB: Date, dateFromFrontEnd: Date) => { 
      const mongodbDate = new Date(dateFromMongoDB); 
      const frontendDate = new Date(dateFromFrontEnd);
    
      // Set the time to midnight for the frontend date
      const frontEndFormattedDate = new Date(frontendDate);
      frontEndFormattedDate.setHours(0, 0, 0, 0);
      mongodbDate.setHours(0, 0, 0, 0);
    
      const isSameDay = frontEndFormattedDate.getTime() === mongodbDate.getTime();
      // console.log({ frontEndFormattedDate: frontEndFormattedDate.getTime(), mongodbDate: mongodbDate.getTime() }); 
      // console.log({ frontEndFormattedDate: frontEndFormattedDate, mongodbDate: mongodbDate }); 
      // console.log({ isSameDay }); 
      return isSameDay; 
    };

    let updateSessionDates: boolean [] = []; 
    user.membership.sessionDates.forEach((sessionDate => { 
      generateDate(today.month(), today.year()).forEach(({ date, currentMonth, today}) => { 
        const isSameDay = compareDates(sessionDate, date.toDate()) 
        updateSessionDates.push(isSameDay); 
      })
    })); 

    console.log({ updateSessionDates }); 
    setSessionDates(updateSessionDates); 
  }, [])

  return (
    <div className = 'flex justify-center mx-auto divide-x-2'>
      <div className= 'w-96'>
        <p className = 'font-semibold flex justify-center'> {MONTHS[today.month()]}, { today.year()} </p>
        <div className = 'w-full grid grid-cols-7'> 
          { DAYS.map((day, index) => { 
            return  ( 
              <p className = 'h-14 grid place-content-center text-sm' key = { index }> { day } </p>
            )
          })}
        </div>

        <div className= 'w-full grid grid-cols-7'>
          { generateDate(today.month(), today.year()).map( ({ date, currentMonth, today }, index) => {  
            return ( 
              <div key = { index } className = 'h-14 border-t grid place-content-center'> 
                <p className= { cn( currentMonth ? "": "text-gray-400", 
                  sessionDates[index] ? "bg-green-500" : "", 
                  "h-10 w-10 grid place-content-center rounded-full transition-all duration-300 cursor-pointer")}
                  onClick = { () => { 
                    console.log(date.toDate().toString()); 
                  }}
                  >
                  { date.date ()}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MembershipCalendar