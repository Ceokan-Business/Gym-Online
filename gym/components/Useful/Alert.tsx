import React from 'react'

interface Props { 
    description: string, 
    executeFunction: () => void, 
    cancelFunction: () => void,
}

const Alert = ({ description, executeFunction, cancelFunction }: Props) => {
  return (
    <section className = 'fixed inset-0 flex flex-col items-center justify-center'>
        <div className = 'w-fit h-fit px-16 py-4 bg-light-blue rounded-xl shadow-md'>
            <p className = 'text-center'> { description } </p>
            <div className = 'flex justify-center gap-x-4'>
                <button className = 'submit_button' onClick = { executeFunction }> Da </button>
                <button className = 'default_button' onClick = { cancelFunction }> Nu </button>
            </div>
        </div>
    </section>
  )
}

export default Alert