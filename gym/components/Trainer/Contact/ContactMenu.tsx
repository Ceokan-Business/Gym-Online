'use client'; 

import { useState } from 'react'; 
import { useRouter } from 'next/navigation';
import Alert from '@components/Useful/Alert';

import ContactForm from './ContactForm';

interface Props { 
    social: string, //variabila pentru a determina ce modalitate de contact vrei sa accesezi . modifici 
    socialValue: string // linkul de accesat
    profileId: string, 
    setShowContactForm: React.Dispatch<React.SetStateAction<string>> 
}

const ContactMenu = ({ social, profileId, socialValue, setShowContactForm }: Props) => {
    const router = useRouter(); 

    const [ showForm, setShowForm ] = useState <boolean> (false); 
    const [ showAlert, setShowAlert ] = useState <boolean> (false); 
    const [ submitting, setSubmitting ] = useState <boolean> (false); 

    const [ modifiedLink, setModifiedLink ] = useState <string> (""); // nu ai nevoie de linkul vechi. pornim de la ideea ca trebuie schimbat total, nu modificat
                                                                        // (e link, nu text)

    const handleSubmit = async (e: React.FormEvent) => { 
        e.preventDefault(); 
        setSubmitting(true); 

        try{ 
            const response = await fetch(`/api/trainers/${profileId}/social`, { 
                method: "PATCH", 
                mode: 'cors', 
                body:  JSON.stringify({ 
                    action: "CONTACT", social: social.toString().toLowerCase(), link: modifiedLink, 
                }), 
                headers: { 
                    'Content-Type': "application/json"
                } 
            }); 

            if(response.ok) { 
                setShowForm(false);
                setShowContactForm(""); 
                return; 
            }
        } catch(err) { 

        } finally { 
            setSubmitting(false); 
        }
    }

    const deleteLink = async() => { 
        try { 
            const response = await fetch(`/api/trainers/${profileId}/social`, { 
                method: "DELETE", 
                mode: "cors", 
                body: JSON.stringify({ 
                    action: "CONTACT", social: social.toString().toLowerCase(),
                }), 
                headers: { 
                    'Content-Type': "application/json"
                } 
            }); 

            if(response.ok) { 
                setShowContactForm(""); 
                return; 
            }
        } catch(err) { 
            console.log(err);
        }
    }

    const closeAlert = () => { 
        setShowAlert(false); 
    }

  return (
    <section className = 'middle_section_container'>
        <article className = 'middle_section_content'>
            <p className = 'text-center mb-4'> { social.charAt(0) + social.toLowerCase().slice(1) }</p>

            <div className = 'flex flex-col gap-y-2'>
                <button className = 'default_button' onClick = { () => setShowForm(true) }> Modifica Linkul </button>
                { socialValue != "" && 
                    <div>
                        <button className = 'default_button' onClick = { () => { router.push(socialValue)}}> Acceseaza </button>
                        <button className = 'default_button' onClick = { () => { setShowAlert(true) }}> Sterge linkul </button>
                    </div>
                }
                <button className = 'default_button' onClick = { () => { setShowContactForm("")}}> Anuleaza </button>
            </div>
        </article>

        { showForm && 
            <ContactForm 
                handleSubmit = { handleSubmit }
                submitting = { submitting }
                setShowForm = { setShowForm }
                modifiedLink = { modifiedLink }
                setModifiedLink = { setModifiedLink }
            /> 
        }

        { showAlert && 
            <Alert 
                description = 'Esti sigur ca vrei sa stergi aceasta modalitate de contact?'
                executeFunction = { deleteLink }
                cancelFunction = { closeAlert }
            /> 
        }
    </section>
  )
}

export default ContactMenu