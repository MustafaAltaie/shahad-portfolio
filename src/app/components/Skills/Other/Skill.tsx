import React from 'react';
import Image from 'next/image';
import { FSkill } from '../../../../../types/Skills';
import { motion } from 'framer-motion';

interface SkillProps {
    skill: FSkill
}

const Skill = React.memo(({ skill }: SkillProps) => {
    return (
        <div className='skillCard p-3 flex flex-col gap-2 rounded-sm'>
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