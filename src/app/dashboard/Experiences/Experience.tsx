'use client';
import React, { useState } from 'react';
import { BriefcaseIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { Exp } from '../../../../types/Experiences';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDeleteExpMutation } from '../../../../features/experiences/experienceApi';
import WaitingModal from '../WaitingModal';

interface ExperienceProps {
    exp: Exp
    setObj: React.Dispatch<React.SetStateAction<Exp>>
    setForm: React.Dispatch<React.SetStateAction<boolean>>
    setScrolled: React.Dispatch<React.SetStateAction<boolean>>
}

const Experience = ({ exp, setObj, setForm, setScrolled }: ExperienceProps) => {
    const [deleteExp] = useDeleteExpMutation();
    const [busy, setBusy] = useState(false);

    const handleDelete = async (id: string) => {
        try {
            setBusy(true);
            await deleteExp(id).unwrap();
        } catch (err) {
            console.error(err);
            alert('Error deleting experience');
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className='experienceCard border-thin-2 flex flex-col gap-2 p-5 rounded-xl'>
            {busy && <WaitingModal />}
            <div className='flex gap-5 items-center justify-between'>
                <div className='flex gap-5'>
                    <PencilIcon className='w-5 cursor-pointer' title='Edit' onClick={() => {setForm(true); setObj(exp); setScrolled(false)}} />
                    <TrashIcon className='w-5 cursor-pointer' title='Delete' onClick={() => handleDelete(exp.id!)} />
                </div>
                <BriefcaseIcon className='w-7 bg-blue-600 text-white rounded-full p-1.5' />
                <p className='text-sm text-blue-500 font-bold'>{exp.dateFrom} - {exp.dateTo ? exp.dateTo : 'Ongoing'}</p>
            </div>
            <p>{exp.title} in <span className='italic'>{exp.company}</span></p>
            <p className='text-yellow-600'>{exp.location}</p>
            <p className='text-sm text-neutral-500'>{exp.description}</p>
            {exp.techStack?.length !== 0 && <p className='mt-1 text-sm flex items-end gap-1'>I worked with the following tech stack <ArrowLongRightIcon className='w-4' /></p>}
            <div className='flex flex-wrap gap-2'>
                {exp.techStack?.map((tech: string) => 
                <p key={tech} className='expTech px-2 py-1 rounded-xl text-sm'>{tech}</p>
                )}
            </div>
        </div>
    )
}

export default Experience;