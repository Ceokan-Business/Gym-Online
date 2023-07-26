import { DayInterface } from "@interfaces/UsetInterface"; 
import dayjs from "dayjs";

interface DayProps { 
    selectedDateInfo: DayInterface, 
}

const StatisticsData = ({ selectedDateInfo }: DayProps) => { 
    return ( 
        <div className = 'h-96 mx-4 pl-4 w-96'>
            <p className='font-semibold'> Schedule for { dayjs(selectedDateInfo.date).toDate().toDateString() } </p>
            <p> No meetings today </p>
        </div>
    )
}; 

export default StatisticsData