'use client';
import React, { useState, useEffect, forwardRef } from 'react';
import './Experiences.css';
import { BriefcaseIcon } from '@heroicons/react/24/solid';
import Experience from './Experience';
import { Exp } from '../../../../types/Experiences';

interface ExperiencesProps {
    experiences: Exp[] | undefined
}

const Experiences = forwardRef<HTMLElement, ExperiencesProps>(({ experiences }, ref) => {
    const [experienceList, setExperienceList] = useState<Exp[]>([]);

    useEffect(() => {
        if (experiences) {
            const transformed: Exp[] = experiences.map(experience => ({
                id: experience._id,
                dateFrom: experience.dateFrom,
                dateTo: experience.dateTo,
                title: experience.title,
                company: experience.company,
                location: experience.location,
                description: experience.description,
                techStack: experience.techStack,
            }));
            setExperienceList(transformed);
        }
    }, [experiences]);

    return (
        <section ref={ref} className='experiences p-7 flex flex-col bg-url-fixed pb-10 border-b-thin'>
            <div className='flex gap-2 font-bold mb-5'>
                <BriefcaseIcon className='w-7 mainColor' />
                <h1 className='mainColor text-2xl'>Experiences</h1>
            </div>
            {/* Experiences wrapper */}
            <div className='expWrapper flex flex-col lg:flex-row lg:flex-wrap'>
                {/* Card */}
                {experienceList.map((exp: Exp) => 
                    <Experience key={exp.id} exp={exp} />
                )}
            </div>
        </section>
    )
});

Experiences.displayName = 'Experiences';

export default Experiences;