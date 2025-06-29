'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { EducationType } from '../../../../types/Educations';
import { TrashIcon } from '@heroicons/react/24/outline';

interface FormProps {
    form: boolean
    setObj: React.Dispatch<React.SetStateAction<EducationType>>
    obj: EducationType
    handleSave: (e: React.FormEvent<HTMLFormElement>) => void
    logo: File | null
    setLogo: React.Dispatch<React.SetStateAction<File | null>>
    doc: File | null
    setDoc: React.Dispatch<React.SetStateAction<File | null>>
    busy: boolean
    setScrolled: React.Dispatch<React.SetStateAction<boolean>>
    scrolled: boolean
}

const Form = ({
    form,
    setObj,
    obj,
    handleSave,
    logo,
    setLogo,
    doc,
    setDoc,
    busy,
    setScrolled,
    scrolled,
}: FormProps) => {
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const currentForm = formRef.current;
        if (!currentForm) return;

        const clearObj = () => {
            setObj({
                id: '',
                location: '',
                dateFrom: '',
                dateTo: '',
                school: '',
                title: '',
                description: '',
                logoLink: '',
                docLink: '',
            });
            setLogo(null);
            setDoc(null);
        }

        if (form) {
            currentForm.style.height = `${currentForm.scrollHeight}px`;
            if (!scrolled) {
                currentForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setScrolled(true);
            }
        } else {
            currentForm.style.height = '0px';
            clearObj();
        }
    }, [form, formRef, setObj, setLogo, setDoc, setScrolled, scrolled]);

    const prepareObject = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setObj(prev => ({
            ...prev, [name]: value
        }));
    }

    return (
        <form ref={formRef} onSubmit={handleSave} className='h-0'>
            <div className="formInnerDiv">
                <label>
                    School name
                    <input type="text" required placeholder='e.g. Oxford University' name='school' value={obj.school} onChange={prepareObject} />
                </label>
                <label>
                    Location
                    <input type="text" required placeholder='e.g. Baghdad - Iraq' name='location' value={obj.location} onChange={prepareObject} />
                </label>
                <label>
                    Starting date
                    <input type="text" required placeholder='e.g. 1/6/2025' name='dateFrom' value={obj.dateFrom} onChange={prepareObject} />
                </label>
                <label>
                    Ending date
                    <input type="text" placeholder='e.g. 1/6/2027' name='dateTo' value={obj.dateTo} onChange={prepareObject} />
                </label>
                <label>
                    Education title
                    <input type="text" required placeholder='e.g. Bacholars degree' name='title' value={obj.title} onChange={prepareObject} />
                </label>
                <label>
                    About education
                    <textarea placeholder='e.g. Educations description' name='description' value={obj.description} onChange={prepareObject}></textarea>
                </label>
                <div className='labelImage'>
                    <label>
                        {logo ? 'Replace Logo image' : 'Upload Logo image'}
                        <input type="file" accept='.png,.jpg,.bmp,.JPEG,.jpeg' onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setLogo(file);
                                setObj((prev: EducationType) => ({
                                    ...prev, logoLink: file.name
                                }));
                            }
                        }} />
                    </label>
                    <div className='formImageWrapper'>
                        <Image
                            src={
                                logo ?
                                URL.createObjectURL(logo) :
                                obj.id && obj.logoLink?.startsWith('/') ? `https://res.cloudinary.com/dswmp2omq/image/upload/v1750506429/portfolio/educations/logo/${obj.logoLink}` :
                                '/images/logo-frame.png'
                            }
                            alt="logo-frame"
                            width={30}
                            height={30}
                        />
                    </div>
                    {logo && <TrashIcon className='w-5' onClick={() => setLogo(null)} />}
                </div>
                <div className='labelImage'>
                    <label>
                        {doc ? 'Replace document image' : 'Upload document image'}
                        <input type="file" accept='.png,.jpg,.bmp,.JPEG,.jpeg' onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setDoc(file);
                                setObj((prev: EducationType) => ({
                                    ...prev, docLink: file.name
                                }));
                            }
                        }} />
                    </label>
                    <div className='formImageWrapper'>
                        <Image
                            src={
                                doc ?
                                URL.createObjectURL(doc) :
                                obj.id && obj.docLink?.startsWith('/') ? `https://res.cloudinary.com/dswmp2omq/image/upload/v1750506429/portfolio/educations/doc/${obj.docLink}` :
                                "/images/image-icon.png"}
                            alt="image-icon"
                            width={30}
                            height={30}
                        />
                    </div>
                    {doc && <TrashIcon className='w-5' onClick={() => setDoc(null)} />}
                </div>
                <button
                    type='submit'
                    className={`${(!obj.location || !obj.dateFrom || !obj.school || !obj.title) ? '' : 'activeFormButton'}`}
                    style={{ background: busy ? '#888' : '' }}
                    disabled={busy}
                >{obj.id ? 'Update' : 'Save'}</button>
            </div>
        </form>
    )
}

export default Form;