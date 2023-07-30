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
                const response = await fetch(`/api/users/${session?.user?.id}/calendar-data/${dayjs(selectedDateInfo.date).toJSON()}`, { 
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
                const response = await fetch(`/api/users/${session?.user?.id}/calendar-data/${dayjs(selectedDateInfo.date).toJSON()}`, { 
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

    const deleteStatistics = async () => { 
        try { 
            const response = await fetch(`/api/users/${session?.user?.id}/calendar-data/${dayjs(selectedDateInfo.date).toJSON()}`, { 
                method: "DELETE", 
                mode: "cors", 
                headers: { 
                    'Content-Type': "application/json", 
                }
            }); 

            if(response.ok) { 
                return; 
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
                <>
                    <button className = 'default_button' onClick = { () => { setShowForm('Editeaza')}}> Editeaza statistici </button>
                    <button className = 'default_button' onClick = { () => setShowForm('Sterge')}> Sterge </button>
                </>
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

            { showForm === 'Sterge' && 
                <article className = 'default_middle_section'>
                    <p className = 'text-center'> Esti sigur ca vrei sa stergi aceste statistici? </p>
                    <div className = 'flex justify-center mt-2'>
                        <button className = 'default_button' onClick = { deleteStatistics }>Sterge</button>
                        <button className = 'default_button' onClick = { () => setShowForm("")}>Anuleaza</button>
                    </div>
                </article>
            }
        </div>
    )
}; 

export default StatisticsData   