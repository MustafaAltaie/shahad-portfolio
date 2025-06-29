import React, { useEffect, useRef } from 'react';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { FSkill } from '../../../../types/Skills';

interface FormProps {
    form: boolean
    setForm: React.Dispatch<React.SetStateAction<boolean>>
    skillObj: FSkill
    setSkillObj: React.Dispatch<React.SetStateAction<FSkill>>
    fileImage: File | null
    setFileImage: React.Dispatch<React.SetStateAction<File | null>>
    clearSkillObj: () => void
    handleSave: (e: React.FormEvent<HTMLFormElement>) => void
    folder: string
}

const Form = ({ form, setForm, skillObj, setSkillObj, fileImage, setFileImage, clearSkillObj, handleSave, folder }: FormProps) => {
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
                <div className='labelImage'>
                    <label>
                        {fileImage ? 'Replace skill image icon' : 'Upload skill image icon'}
                        <input type="file" accept='.png,.jpg,.bmp,.JPEG,.jpeg' onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setFileImage(file);
                                setSkillObj((prev: FSkill) => ({
                                    ...prev, imageLink: file.name
                                }));
                            }
                        }} />
                    </label>
                    <div className='formImageWrapper'>
                        <Image
                            src={
                                fileImage ?
                                URL.createObjectURL(fileImage) :
                                skillObj.id ?
                                `https://res.cloudinary.com/dswmp2omq/image/upload/v1750622928/portfolio/skills/${folder}/${skillObj.imageLink}` :
                                "/images/image-icon.png"}
                            alt="image-icon"
                            width={30}
                            height={30}
                        />
                    </div>
                    {fileImage && <TrashIcon className='w-5' onClick={() => setFileImage(null)} />}
                </div>
                <button type='submit' className={`${(!skillObj.title || !skillObj.level) ? '' : 'activeFormButton'}`}>{skillObj.id ? 'Update' : 'Save'}</button>
            </div>
        </form>
    )
}

export default Form;