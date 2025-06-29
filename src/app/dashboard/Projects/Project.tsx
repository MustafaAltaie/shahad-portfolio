import React from 'react';
import { ProjectType } from '../../../../types/Projects';
import { ArrowLongRightIcon, BriefcaseIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/solid';

interface ProjectProps {
    app: ProjectType
    handleDelete: (id: string) => void
    prepareUpdate: (app: ProjectType) => void
}

const Project = ({ app, handleDelete, prepareUpdate }: ProjectProps) => {
    return (
        <div title={app.description} className='project relative p-3 flex flex-col justify-between gap-2 rounded-xl w-full'>
            {app.isProfessional && <div className='projectMark absolute w-8 h-8 right-5'><BriefcaseIcon className='absolute top-1 left-1/2 -translate-x-1/2 w-5' /></div>}
            <div>
                <h1 className={`mb-2 font-bold flex gap-5 ${!app.isProfessional && 'justify-between'}`}>{app.title}
                    <div className='flex gap-3'>
                        <TrashIcon className='w-5' onClick={() => handleDelete(app.id!)} />
                        <PencilIcon className='w-5' onClick={() => prepareUpdate(app)} />
                    </div>
                </h1>
                <p className={`text-sm ${app.link && 'mb-1 pb-2 border-b-thin'}`}>{app.description}</p>
            </div>
            <ul className='flex flex-wrap gap-2'>
                {app.techList.map(tech =>
                <li key={tech} className='rounded-lg px-1.5 py-1'>{tech}</li>
                )}
            </ul>
            <p className='text-[10px] absolute bottom-1 right-2 opacity-40'>{app.date}</p>
            {app.link && <p className='flex text-sm items-end gap-1 text-[#58b]'>See project in github<ArrowLongRightIcon className='w-4.5' /></p>}
        </div>
    )
}

export default Project;