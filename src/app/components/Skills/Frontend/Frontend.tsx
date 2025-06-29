'use client';
import React, { useEffect, useState } from 'react';
import { FSkill } from '../../../../../types/Skills';
import Skill from './Skill';

interface FrontendProps {
    frontend: FSkill[] | undefined
}

const Frontend = ({ frontend }: FrontendProps) => {
    const [frontendSkills, setFrontendSkills] = useState<FSkill[]>([]);
        
    useEffect(() => {
        if (frontend) {
            const transformed: FSkill[] = frontend.map(skill => ({
                id: skill._id,
                imageLink: skill.imageLink,
                title: skill.title,
                level: skill.level,
            }));
            setFrontendSkills(transformed);
        }
    }, [frontend]);

    return (
        <div className='mt-5'>
            <h1 className='text-xl mb-3'>Frontend</h1>
            <div className='frontendSkillWrapper flex flex-wrap'>
                {frontendSkills.map((skill: FSkill) =>
                <Skill key={skill.id} skill={skill} />)}
            </div>
        </div>
    )
}

export default Frontend;