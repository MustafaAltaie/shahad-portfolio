import React, { useState, useEffect, forwardRef } from 'react';
import './Educations.css';
import { AcademicCapIcon } from '@heroicons/react/24/solid';
import { EducationType } from '../../../../types/Educations';
import Education from './Education';

interface EducationsProps {
    educations: EducationType[] | undefined
}

const Educations = forwardRef<HTMLElement, EducationsProps>(({ educations }, ref) => {
    const [educationList, setEducationList] = useState<EducationType[]>([]);

    useEffect(() => {
        if(educations) {
            const transformed: EducationType[] = educations.map(edu => ({
                id: edu._id,
                location: edu.location,
                dateFrom: edu.dateFrom,
                dateTo: edu.dateTo,
                school: edu.school,
                title: edu.title,
                description: edu.description, 
                logoLink: edu.logoLink,
                docLink: edu.docLink,
            }));
            setEducationList(transformed);
        }
    }, [educations]);

    return (
        <section ref={ref} className='educations p-7 flex flex-col border-b-thin bg-url-fixed pb-10'>
            <div className='flex items-center gap-2 font-bold'>
                <AcademicCapIcon className='w-7 text-yellow-600' />
                <h1 className='text-2xl text-yellow-600'>Educations</h1>
            </div>
            <p className='opacity-50 my-2'>* Click any card to expand full details</p>
            {/* Educations */}
            <div className='educationWrapper flex flex-col lg:flex-row lg:flex-wrap lg:items-start'>
                {/* card */}
                {educationList.map(education =>
                <Education key={education.id} education={education} />)}
            </div>
        </section>
    )
});

Educations.displayName = 'Educations';

export default Educations;