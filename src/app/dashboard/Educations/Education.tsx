import React from 'react';
import Image from 'next/image';
import { EducationType } from '../../../../types/Educations';
import { ArrowLongRightIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDeleteEducationMutation, useDeleteEducationDocMutation, useDeleteEducationLogoMutation } from '../../../../features/educations/educationApi';

interface EducationProps {
    education: EducationType
    setForm: React.Dispatch<React.SetStateAction<boolean>>
    setObj: React.Dispatch<React.SetStateAction<EducationType>>
    setOldDoc: React.Dispatch<React.SetStateAction<string | undefined>>
    setOldLogo: React.Dispatch<React.SetStateAction<string | undefined>>
    setBusy: React.Dispatch<React.SetStateAction<boolean>>
    setScrolled: React.Dispatch<React.SetStateAction<boolean>>
}

const Education = ({ education, setForm, setObj, setOldDoc, setOldLogo, setBusy, setScrolled }: EducationProps) => {
    const [deleteEducation] = useDeleteEducationMutation();
    const [deleteEducationDoc] = useDeleteEducationDocMutation();
    const [deleteEducationLogo] = useDeleteEducationLogoMutation();

    const handleDelete = async (id: string) => {
        try {
            setBusy(true);
            await deleteEducation(id).unwrap();
            if (education.docLink) await deleteEducationDoc(education.docLink).unwrap();
            if (education.logoLink) await deleteEducationLogo(education.logoLink).unwrap();
        } catch (err) {
            console.error(err);
            alert('Error deleting education');
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className='educationCard border-thin-2 p-5 relative flex flex-col justify-between'>
            <p className='educationDate text-sm absolute'>{education.dateFrom} - {education.dateTo || 'Ongoing'}</p>
            <div className='flex gap-5 border-b-thin pb-4 mb-4'>
                <PencilIcon className='w-5 cursor-pointer' title='Update' onClick={() => {setForm(true); setObj(education); setOldDoc(education.docLink); setOldLogo(education.logoLink); setScrolled(false)}} />
                <TrashIcon className='w-5 cursor-pointer' title='Delete' onClick={() => handleDelete(education.id!)} />
                <p className='text-sm'>{education.location}</p>
            </div>
            <div className={`flex items-center gap-4 ${education.description && 'pb-4 mb-4'} ${education.description && 'border-b-thin'}`}>
                {education.logoLink &&
                <div>
                    <Image
                        src={`https://res.cloudinary.com/dswmp2omq/image/upload/v1750506429/portfolio/educations/logo/${education.logoLink}`}
                        alt='Logo'
                        width={100}
                        height={100}
                        priority
                    />
                </div>}
                <div>
                    <h1 className='text-xl text-blue-500'>{education.school}</h1>
                    <h3 className='text-sm text-yellow-600'>{education.title}</h3>
                </div>
            </div>
            <p className='text-sm'>{education.description}</p>
            <button
                className={`ml-auto flex items-end gap-2 mt-2 text-blue-500 cursor-pointer ${!education.docLink && 'pointer-events-none text-neutral-500'}`}
                onClick={() => window.open(`https://res.cloudinary.com/dswmp2omq/image/upload/v1750506429/portfolio/educations/doc/${education.docLink}`)}
            >See the attchment <ArrowLongRightIcon className='w-5' /></button>
        </div>
    )
}

export default Education;