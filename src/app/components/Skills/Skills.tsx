import React, { forwardRef } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import './Skills.css';
import Other from './Other/Other';
import { FSkill } from '../../../../types/Skills';

interface SkillsProps {
    other: FSkill[] | undefined
}

const Skills = forwardRef<HTMLElement, SkillsProps>(({ other }, ref) => {
    return (
        <section ref={ref} className='skills py-7 px-4 pb-10 bg-url-fixed'>
            <div className='flex gap-2 pb-2 font-bold'>
                <Cog6ToothIcon className='w-7 text-[#8f55bb]' />
                <h1 className='text-2xl text-[#8f55bb]'>Skills and knowledge</h1>
            </div>
            <div>
                <Other other={other} />
            </div>
        </section>
    )
});

Skills.displayName = 'Skills';

export default Skills;