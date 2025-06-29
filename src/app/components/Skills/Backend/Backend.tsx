'use client';
import React, { useEffect, useState } from 'react';
import Skill from './Skill';
import { FSkill } from '../../../../../types/Skills';

interface BackendProps {
    backend: FSkill[] | undefined
}

const Backend = ({ backend }: BackendProps) => {
    const [backendTasks, setBackendTasks] = useState<FSkill[]>([]);

    useEffect(() => {
        if (backend) {
            const transformed: FSkill[] = backend.map(skill => ({
                id: skill._id,
                imageLink: skill.imageLink,
                title: skill.title,
                level: skill.level,
            }));
            setBackendTasks(transformed);
        }
    }, [backend]);

    return (
        <div className='mt-3'>
            <h1 className='text-xl mb-3'>Backend</h1>
            <div className='backendSkillWrapper flex flex-wrap'>
                {backendTasks.map((skill: FSkill) =>
                <Skill key={skill.id} skill={skill} />)}
            </div>
        </div>
    )
}

export default Backend;