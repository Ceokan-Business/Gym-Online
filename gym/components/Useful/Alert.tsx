import React from 'react'

interface Props { 
    description: string, 
    executeFunction: () => void, 
    cancelFunction: () => void,
}

const Alert = ({ description, executeFunction, cancelFunction }: Props) => {
  return (
    <section className = 'middle_section_container'>
        <div className = 'middle_section_content'>
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