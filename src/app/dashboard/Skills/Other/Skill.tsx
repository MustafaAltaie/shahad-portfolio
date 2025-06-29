'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FSkill } from '../../../../../types/Skills';
import { PencilIcon, TrashIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

interface SkillProps {
    skill: FSkill
    setForm: React.Dispatch<React.SetStateAction<boolean>>
    setSkillObj: React.Dispatch<React.SetStateAction<FSkill>>
    setOldName: React.Dispatch<React.SetStateAction<string>>
    handleDelete: (skill: FSkill) => void
    setFolder: React.Dispatch<React.SetStateAction<string>>
}

const Skill = React.memo(({ skill, setForm, setSkillObj, setOldName, handleDelete, setFolder }: SkillProps) => {
    const [setting, setSetting] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setSetting(false);
            }
        }

        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div ref={wrapperRef} className='skillCard p-3 flex flex-col gap-2 rounded-sm relative cursor-pointer' onClick={() => setSetting(!setting)}>
            {!setting && <EllipsisHorizontalIcon className='w-5 absolute top-0 right-0 pointer-events-none' />}
            {setting &&
            <div className='skillSettingsWrapper flex gap-0.5 absolute w-full h-full top-0 left-0'>
                <div className='w-1/2 flexCenter cursor-pointer' title='Edit' onClick={() => {setForm(true); setSkillObj(skill); setOldName(skill.imageLink || ''); setFolder('other')}}>
                    <PencilIcon className='w-5' />
                </div>
                <div className='w-1/2 flexCenter cursor-pointer' title='Delete' onClick={() => handleDelete(skill)}>
                    <TrashIcon className='w-5' />
                </div>
            </div>}
            <div className='flex gap-1 items-center'>
                {skill.imageLink &&
                <Image
                    src={`https://res.cloudinary.com/dswmp2omq/image/upload/v1750622928/portfolio/skills/other/${skill.imageLink}`}
                    alt='Image'
                    width={20}
                    height={20}
                    loading='lazy'
                />}
                <h1 className='text-sm'>{skill.title}</h1>
            </div>
            <div className='skillLevel w-full h-1'>
                <div style={{ width: `${skill.level}%` }}></div>
            </div>
        </div>
    )
});

Skill.displayName = 'Skill';

export default Skill;