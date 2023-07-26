'use client'; 

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import dayjs from 'dayjs';
import { generateDate } from '@utils/calendar';
import { MONTHS, DAYS } from "@global/constants"; 

import StatisticDateBox from './StatisticDateBox'; 
import StatisticsData from './StatisticsData';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'; 

//typesript special import 
import { DayInterface, initialDay } from '@interfaces/UsetInterface';


const StatisticsCalendar = () => {
  const { data: session } = useSession(); 
  const CURRENT_DATE = dayjs(); 

  const [ today, setToday ] = useState <dayjs.Dayjs> (CURRENT_DATE); 
  const [ selectedDate, setSelectedDate ] = useState <dayjs.Dayjs>(CURRENT_DATE); 
  const [ selectedDateInfo, setSelectedDateInfo ] = useState <DayInterface> (initialDay); 

  useEffect( () => { 
    const getTodayData = async () => { 
      try  {
        const response = await fetch(`/api/users/${session?.user?.id}/calendar-data/${today}`, { 
          method: "GET", 
        }); 

        const dataResponse = await response.json(); 
        if(Object.values(dataResponse).length > 0){ 
          setSelectedDateInfo(dataResponse); 
        } else { 
          let data = { 
            date: CURRENT_DATE, 
            kg: 0, 
            height: 0, 
          }; 
          setSelectedDateInfo(data);  
          console.log({ data }); 
        }

        setSelectedDate(CURRENT_DATE);
        console.log({ dataResponse }); ; 

        if(response.ok) 
          return; 
      } catch(err) { 
        console.log(err); 
      }
    }; 

    getTodayData(); 
  }, []); 

  const getSpecifiedData = async () => { 
    try { 
      const response = await fetch(`/api/users/${session?.user?.id}/calendar-data/${selectedDate.toDate().toDateString()}`); 
      const dataResponse = await response.json(); 

      if(Object.values(dataResponse).length > 0){ 
        setSelectedDateInfo(dataResponse); 
      } else { 
        let data = { 
          date: selectedDate, 
          kg: 0, 
          height: 0, 
        }; 
        setSelectedDateInfo(data); 
        console.log({ data }); 
        console.log({ selectedDate })
      }
    } catch(err) { 
      console.log(err); 
    }
  }; 

  useEffect ( () => { 
    getSpecifiedData(); 
  }, [selectedDate])

  return (
    <div className = 'flex justify-center my-16 mx-auto divide-x-2 items-center'>
      <div className= 'w-96'>
        <div className = 'flex justify-between'>
            <p className = 'font-semibold'>
              {MONTHS[today.month()]}, { today.year()} 
            </p>
            <div className = 'flex items-center gap-5'>
              <GrFormPrevious className = 'w-5 h-5 curor-pointer' onClick = { () => { setToday(today.month(today.month() - 1))}}/>
              today 
              <GrFormNext className = 'w-5 h-5 cursor-pointer' onClick = { () => { setToday(today.month(today.month() + 1))}}/> 
            </div>
        </div>
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
              <StatisticDateBox 
                key = { index } 
                date = { date } 
                today = { today }
                selectedDate = { selectedDate }
                currentMonth = { currentMonth } 
                setSelectedDate = { setSelectedDate } />
            )
          })}
        </div>
      </div>
      <pre> { JSON.stringify(selectedDateInfo) } </pre>
      <StatisticsData selectedDateInfo = { selectedDateInfo } /> 
    </div>
  )
}

export default StatisticsCalendar; 