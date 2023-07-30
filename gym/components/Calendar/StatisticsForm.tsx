import { DayInterface } from "@interfaces/UsetInterface"; 
import { NumberInputElement } from "@components/Useful/Inputs";

interface Props { 
    type: string, 
    selectedDateInfo: DayInterface, 
    setSelectedDateInfo: React.Dispatch<React.SetStateAction<DayInterface>>, 
    submitting: boolean, 
    handleSubmit: (e: React.FormEvent) => void, 
    setShowForm: React.Dispatch<React.SetStateAction<string>>
}

const StatisticsForm = ({ type, selectedDateInfo, setSelectedDateInfo, submitting, handleSubmit, setShowForm }: Props) => {
  return (
    <section className = 'default_middle_section'>
        <form onSubmit = { handleSubmit } className = 'form'>
            <NumberInputElement 
                labelTitle="kg"
                required = { true }
                value = { Number(selectedDateInfo.kg) }
                executeChange = { (e) => { setSelectedDateInfo({...selectedDateInfo, kg: Number(e.target.value) })}}
            /> 
            <NumberInputElement 
                labelTitle="Inaltime(cm)"
                required = { true }
                value = { Number(selectedDateInfo.height) }
                executeChange = { (e) => { setSelectedDateInfo({...selectedDateInfo, height: Number(e.target.value) })}}
            /> 

            <button className = 'submit_button' type = 'submit'> { submitting ? `${type}...` : `${type}` } </button>
            <button 
                onClick = { () => { setShowForm(""); setSelectedDateInfo({ ...selectedDateInfo, kg: 0, height: 0 }) }  } 
                className = 'default_button' 
                type = 'button'> Anuleaza </button>
        </form>
    </section>
  )
}

export default StatisticsForm