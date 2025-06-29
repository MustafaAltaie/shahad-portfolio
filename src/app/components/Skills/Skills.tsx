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
        <section ref={ref} className='skills py-7 px-3 pb-10 bg-url-fixed'>
            <div className='flex gap-2 pb-2 font-bold'>
                <Cog6ToothIcon className='w-7 text-yellow-600' />
                <h1 className='text-2xl text-yellow-600'>Skills and knowledge</h1>
            </div>
            <p className='opacity-50'>* Click any card to expand full details</p>
            <div>
                <Other other={other} />
            </div>
        </section>
    )
});

Skills.displayName = 'Skills';

export default Skills;