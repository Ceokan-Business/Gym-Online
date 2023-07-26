'use client'; 

import { useState } from 'react'; 
import { useSession } from 'next-auth/react';
import StatisticsForm from './StatisticsForm';

import { DayInterface } from "@interfaces/UsetInterface"; 
import dayjs from "dayjs";

interface DayProps { 
    selectedDateInfo: DayInterface, 
    setSelectedDateInfo: React.Dispatch<React.SetStateAction<DayInterface>>, 
}

const StatisticsData = ({ selectedDateInfo, setSelectedDateInfo }: DayProps) => { 
    const { data: session } = useSession(); 

    const [ showForm, setShowForm ] = useState<string>(""); 
    const [ submitting, setSubmitting ] = useState<boolean> (false); 

    const setStatistics = async (e: React.FormEvent) => { 
        try { 
            e.preventDefault(); 
            setSubmitting(true); 

            try { 
                const response = await fetch(`/api/users/${session?.user?.id}/calendar-data/${dayjs(selectedDateInfo.date).toDate().toDateString()}`, { 
                    method: "POST", 
                    mode: "cors", 
                    body: JSON.stringify({ kg: selectedDateInfo.kg, height: selectedDateInfo.height }), 
                    headers: { 
                        "Content-Type": "application/json", 
                    }
                }); 

                if(response.ok) { 
                    setShowForm(""); 
                    return; 
                }
            } catch(err) { 
                console.log(err); 
            } finally { 
                setSubmitting(false); 
            }
        } catch(err) { 
            console.log(err); 
        }
    }

    const editStatistics = async (e: React.FormEvent) => { 
        try { 
            e.preventDefault(); 
            setSubmitting(true); 

            try { 
                const response = await fetch(`/api/users/${session?.user?.id}/calendar-data/${dayjs(selectedDateInfo.date).toDate().toDateString()}`, { 
                    method: "PATCH", 
                    mode: "cors", 
                    body: JSON.stringify({ kg: selectedDateInfo.kg, height: selectedDateInfo.height }), 
                    headers: { 
                        "Content-Type": "application/json", 
                    }
                }); 

                if(response.ok) { 
                    setShowForm(""); 
                    return; 
                }
            } catch(err) { 
                console.log(err); 
            } finally { 
                setSubmitting(false); 
            }
        } catch(err) { 
            console.log(err); 
        }
    }
    return ( 
        <div className = 'h-96 mx-4 pl-4 w-96'>
            <p className='font-semibold'> Schedule for { dayjs(selectedDateInfo.date).toDate().toDateString() } </p>
            <hr className = 'my-4'/>
            <p> Kg: { selectedDateInfo.kg === 0 ? "-" : `${selectedDateInfo.kg}`  } </p>
            <p> Inaltime: { selectedDateInfo.height === 0 ?  " - " : `${selectedDateInfo.height}` } </p>
            { selectedDateInfo.kg == 0 && 
                <button onClick = { () => { setShowForm("Seteaza")} } className = 'default_button'> Seteaza statistici </button>
            }

            { selectedDateInfo.kg > 0 &&
                <button className = 'default_button' onClick = { () => { setShowForm('Editeaza')}}> Editeaza statistici </button>
            }

            { showForm === 'Seteaza' && 
                <StatisticsForm 
                    type = 'Seteaza'
                    selectedDateInfo = { selectedDateInfo }
                    setSelectedDateInfo =  { setSelectedDateInfo }
                    submitting = { submitting }
                    handleSubmit = { setStatistics }
                    setShowForm =  { setShowForm }
                /> 
            }

            { showForm === 'Editeaza' && 
                <StatisticsForm 
                    type = 'Editeaza'
                    selectedDateInfo = { selectedDateInfo }
                    setSelectedDateInfo =  { setSelectedDateInfo }
                    submitting = { submitting }
                    handleSubmit = { editStatistics }
                    setShowForm =  { setShowForm }
                /> 
            }
        </div>
    )
}; 

export default StatisticsData   