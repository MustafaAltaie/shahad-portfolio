import React, { forwardRef } from 'react';
import './Educations.css';
import { AcademicCapIcon } from '@heroicons/react/24/solid';
import { EducationType } from '../../../../types/Educations';
import Education from './Education';

type EducationsProps = React.HTMLAttributes<HTMLElement>;

const educationList: EducationType[] = [
    {
        id: '1',
        location: 'Lebanon - Beirut',
        dateFrom: '2023',
        dateTo: '2024',
        school: 'American University (AUST)',
        title: "Master's degree in Computer and Communications Engineering.",
        description: 'The research focuses on applying Artificial Intelligence to detect heart disease using Machine Learning algorithms, aiming to improve early diagnosis and support clinical decision-making through data-driven insights.',
        image: '/images/aust.png',
    },
    {
        id: '2',
        location: 'Iraq - Baghdad',
        dateFrom: '2011',
        dateTo: '2015',
        school: 'Al-Rafidain University',
        title: "Bachalor's Degree in computer techniques engineering.",
        description: "I studied for four years at the Faculty of Computer Technique Engineering.",
        image: '/images/rafidain.png',
    },
];

const Educations = forwardRef<HTMLElement, EducationsProps>((_, ref) => {
    return (
        <section ref={ref} className='educations p-7 flex flex-col border-b-thin bg-url-fixed pb-10'>
            <div className='flex items-center gap-2 font-bold mb-5'>
                <AcademicCapIcon className='w-7 text-yellow-600' />
                <h1 className='text-2xl text-yellow-600'>Educations</h1>
            </div>
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