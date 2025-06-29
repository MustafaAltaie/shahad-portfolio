'use client';
import React, { useEffect, useState } from 'react';
import { FSkill } from '../../../../../types/Skills';
import Skill from './Skill';

interface OtherProps {
    other: FSkill[] | undefined
}

const Other = ({ other }: OtherProps) => {
    const [otherSkills, setOtherSkills] = useState<FSkill[]>([]);

    useEffect(() => {
        if (other) {
            const transformed: FSkill[] = other.map(skill => ({
                id: skill._id,
                imageLink: skill.imageLink,
                title: skill.title,
                level: skill.level,
            }));
            setOtherSkills(transformed);
        }
    }, [other]);

    return (
        <div className='mt-5'>
            <div className='otherSkillWrapper flex flex-wrap'>
                {otherSkills.map((skill: FSkill) => 
                <Skill key={skill.id} skill={skill} />
                )}
            </div>
        </div>
    )
}

export default Other;