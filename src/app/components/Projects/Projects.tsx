'use client';
import React, { forwardRef, useEffect, useState } from 'react';
import './Projects.css';
import { CodeBracketIcon, ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { ProjectType } from '../../../../types/Projects';
import Project from './Project';
import { motion } from 'framer-motion';

interface ProjectProps {
    projects: ProjectType[] | undefined
}

const Projects = forwardRef<HTMLElement, ProjectProps>(({ projects }, ref) => {
    const [list, setList] = useState<ProjectType[]>([]);

    useEffect(() => {
        if (projects) {
            const transformed: ProjectType[] = projects.map(project => ({
                id: project._id,
                title: project.title,
                description: project.description,
                date: project.date,
                isProfessional: project.isProfessional,
                techList: project.techList,
                link: project.link
            }));
            setList(transformed);
        }
    }, [projects]);

    return (
        <section ref={ref} className='projects bg-url-fixed p-7'>
            <div className='flex gap-2 pb-3 items-end'>
                <CodeBracketIcon className='w-7 text-yellow-600' />
                <h1 className='text-2xl text-yellow-600 font-bold'>My projects</h1>
            </div>
            {/* wrapper */}
            <div className='projectWrapper flex flex-wrap'>
                {/* card */}
                {list.map(app =>
                <Project key={app.id} app={app}  />
                )}
            </div>
            <motion.p
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.5 }}
                className='flex gap-1 items-end cursor-pointer mt-5'
                onClick={() => window.open('https://github.com/MustafaAltaie', '_blank', 'noopener,noreferrer')}
            >Check out these and other applications on GitHub <ArrowLongRightIcon className='w-5' /></motion.p>
        </section>
    )
});

Projects.displayName = 'Projects';

export default Projects;