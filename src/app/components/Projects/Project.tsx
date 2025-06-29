'use client';
import React from 'react';
import { ProjectType } from '../../../../types/Projects';
import { ArrowLongRightIcon, BriefcaseIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Tech from './Tech';

interface ProjectProps {
    app: ProjectType
}

const Project = ({ app }: ProjectProps) => {
    return (
        <motion.div
            title={app.description}
            className='project relative p-3 flex flex-col justify-between gap-2 rounded-xl w-full'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
        >
            {app.isProfessional && <div className='projectMark absolute w-8 h-8 right-5'><BriefcaseIcon className='absolute top-1 left-1/2 -translate-x-1/2 w-5' /></div>}
            <div>
                <h1 className='mb-2 font-bold'>{app.title}</h1>
                <p className={`text-sm ${app.link && 'mb-1 pb-2 border-b-thin'}`}>app.description</p>
            </div>
            <ul className='flex flex-wrap gap-2'>
                {app.techList.map(tech =>
                <Tech key={tech} tech={tech} />
                )}
            </ul>
            <p className='text-[10px] absolute bottom-1 right-2 opacity-40'>{app.date}</p>
            <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true, amount: 0 }}
                className='flex text-sm items-end gap-1 text-[#58b]'
                onClick={() => window.open(app.link, '_blank', 'noopener,noreferrer')}
            >See project in github<ArrowLongRightIcon className='w-4.5' />
            </motion.p>
        </motion.div>
    )
}

export default Project;