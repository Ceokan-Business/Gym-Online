import dayjs from 'dayjs';
import { conditionalClasses as cn } from '@utils/conditionalClasses';

interface Props { 
    date: dayjs.Dayjs, 
    selectedDate: dayjs.Dayjs, 
    currentMonth: boolean, 
    today: boolean | undefined, 
    setSelectedDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>> 
}

const StatisticDateBox = ({ date, selectedDate, currentMonth, today, setSelectedDate }: Props) => { 
    return ( 
      <div className = 'h-14 border-t grid place-content-center'> 
      <p className= { cn( currentMonth ? "": "text-gray-400", today? "bg-red-600 text-white": "", 
        "h-10 w-10 grid place-content-center rounded-full hover:bg-black hover:text-white transition-all duraation-300 cursor-pointer", 
        selectedDate.toDate().toDateString() === date.toDate().toDateString() ? "bg-black text-white": "")}
        onClick = { () => { setSelectedDate(date)}}>
        { date.date ()}
      </p>
    </div>
    )
}; 

export default StatisticDateBox; 