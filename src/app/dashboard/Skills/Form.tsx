import React, { useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FSkill } from '../../../../types/Skills';

interface FormProps {
    form: boolean
    setForm: React.Dispatch<React.SetStateAction<boolean>>
    skillObj: FSkill
    setSkillObj: React.Dispatch<React.SetStateAction<FSkill>>
    clearSkillObj: () => void
    handleSave: (e: React.FormEvent<HTMLFormElement>) => void
}

const Form = ({ form, setForm, skillObj, setSkillObj, clearSkillObj, handleSave }: FormProps) => {
    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        const currentForm = formRef.current;
        if (!currentForm) return;
        if (form) {
            currentForm.style.height = `${currentForm.scrollHeight}px`;
            currentForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            currentForm.style.height = '0px';
        }
    }, [form, formRef]);

    useEffect(() => {
        console.log(skillObj)
    }, [skillObj]);

    return (
        <form ref={formRef} onSubmit={handleSave} className='h-0'>
            <h1 className='w-fit ml-auto px-5 pt-3'>
                <XMarkIcon className='w-5 cursor-pointer' onClick={() => {setForm(false); clearSkillObj()}} />
            </h1>
            <div className="formInnerDiv">
                <label>
                    Title
                    <input type="text" required placeholder='e.g. JavaScript' name='title' value={skillObj.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSkillObj(prev => ({
                            ...prev, title: e.target.value
                        }));
                    }} />
                </label>
                <label>
                    Level of knowledge
                    <input type="number" required min={1} max={100} placeholder='1 - 100' name='title' value={skillObj.level} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSkillObj(prev => ({
                            ...prev, level: e.target.value
                        }));
                    }} />
                </label>
                <button type='submit' className={`${(!skillObj.title || !skillObj.level) ? '' : 'activeFormButton'}`}>{skillObj.id ? 'Update' : 'Save'}</button>
            </div>
        </form>
    )
}

export default Form;