import React from 'react';
import { FSkill } from '../../../../../types/Skills';
import { motion } from 'framer-motion';

interface SkillProps {
    skill: FSkill
}

const Skill = React.memo(({ skill }: SkillProps) => {
    return (
        <div className='skillCard p-3 flex flex-col gap-2 justify-between rounded-sm'>
            <div className='flex gap-1 items-center'>
                <motion.h1
                    className='text-[14px]'
                    initial={{ opacity: 0, scale: 1.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease:'linear' }}
                    viewport={{ once: true, amount: 0.3 }}
                >{skill.title}</motion.h1>
            </div>
            <div className='skillLevel w-full h-1'>
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.7, ease:'linear' }}
                    viewport={{ once: true, amount: 0.9 }}
                ></motion.div>
            </div>
        </div>
    )
});

Skill.displayName = 'Skill';

export default Skill;