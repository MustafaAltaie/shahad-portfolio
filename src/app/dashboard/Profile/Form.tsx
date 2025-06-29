import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface FormProps {
    handleSaveProfile: (e: React.FormEvent<HTMLFormElement>) => void
    text: string
    setText: React.Dispatch<React.SetStateAction<string>>
    setForm: React.Dispatch<React.SetStateAction<boolean>>
}

const Form = ({ handleSaveProfile, text, setText, setForm }: FormProps) => {
    return (
        <form onSubmit={handleSaveProfile} className='px-1'>
            <XMarkIcon className='w-5 ml-auto cursor-pointer mb-3' onClick={() => setForm(false)} />
            <div className="formInnerDiv">
                <textarea className='h-50' placeholder='Profile text' value={text} onChange={e => setText(e.target.value)}></textarea>
                <button type='submit'>Save</button>
            </div>
        </form>
    )
}

export default Form;