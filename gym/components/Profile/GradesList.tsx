import React from 'react'; 
import { GRADES } from '@global/constants';

interface Props { 
    grades: string []
}
 
interface ItemProps { 
    name: string, 
    color: string, 
}
const GradeItem = ({ name, color }: ItemProps) => { 
    return ( 
        <div className = 'bg-light-orange w-fit flex items-center justify-center gap-x-2 m-2 shadow-md rounded-xl px-2 py-1'>
            <div className = { `${color} w-2 h-2 rounded-full flex items-center justify-center`}></div>
            <p> { name } </p>
        </div>
    )
} 

const GradesList = ({ grades }: Props) => {
  return (
    <div className = 'flex gap-x-4'>
        { grades.map(name => { 
            return (
                <GradeItem name = { name } color = 'bg-light-blue' /> 
            )
        })}
    </div>
  )
}

export default GradesList