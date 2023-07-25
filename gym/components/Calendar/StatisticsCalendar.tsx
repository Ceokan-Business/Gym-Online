'use client'; 

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { generateDate } from '@utils/calendar';
import { conditionalClasses as cn } from '@utils/conditionalClasses';
import { MONTHS, DAYS } from "@global/constants"; 

import { GrFormNext, GrFormPrevious } from 'react-icons/gr'; 

interface DayProps { 
    selectedDate: string, 
}

const DataOnTheDay = ({ selectedDate }: DayProps) => { 
    return ( 
        <div className = 'h-96 mx-4 pl-4 w-96'>
            <p className='font-semibold'> Schedule for { selectedDate } </p>
            <p> No meetings today </p>
        </div>
    )
}

const StatisticsCalendar = () => {
  const CURRENT_DATE = dayjs(); 
  const [ today, setToday ] = useState <dayjs.Dayjs> (CURRENT_DATE); 
  const [ selectedDate, setSelectedDate ] = useState <dayjs.Dayjs>(CURRENT_DATE); 

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
              <div key = { index } className = 'h-14 border-t grid place-content-center'> 
                <p className= { cn( currentMonth ? "": "text-gray-400", today? "bg-red-600 text-white": "", 
                  "h-10 w-10 grid place-content-center rounded-full hover:bg-black hover:text-white transition-all duraation-300 cursor-pointer", 
                  selectedDate.toDate().toDateString() === date.toDate().toDateString() ? "bg-black text-white": "")}
                  onClick = { () => { setSelectedDate(date)}}>
                  { date.date ()}
                </p>
              </div>
            )
          })}
        </div>
      </div>
        <DataOnTheDay selectedDate = { selectedDate.toDate().toDateString() } /> 
    </div>
  )
}

export default StatisticsCalendar; 