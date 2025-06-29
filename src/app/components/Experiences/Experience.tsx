'use client';
import React from 'react';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { Exp } from '../../../../types/Experiences';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ExperienceProps {
    exp: Exp
}

const Experience = ({ exp }: ExperienceProps) => {
    return (
        <motion.div
            className='experienceCard relative border-thin-2 flex flex-col gap-2 p-5 rounded-xl justify-between'
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className='flex gap-4'>
                <Image
                    className='min-w-[50px] object-contain'
                    src={exp.company.includes('Baghdad Bank') ? '/images/baghdadBankLogo.png' : exp.company.includes('Huda') ? '/images/alhudaLogo.png' : '/images/experience.png'}
                    alt='Logo'
                    width={50}
                    height={50}
                    loading='lazy'
                />
                <p>{exp.title} in <span className='italic mainColor'>{exp.company}</span></p>
            </div>
            <div className='flex gap-5 items-center justify-between'>
                <p className='mainColor font-bold'>{exp.location}</p>
                <p className='text-sm mainColor font-bold'>{exp.dateFrom} - {exp.dateTo ? exp.dateTo : 'Present'}</p>
            </div>
            <ul className='text-sm list-disc pl-3'>
                {exp.description
                ?.split('-')
                .filter(line => line.trim() !== '')
                .map((line, index) => (
                <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 150 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.3 }}
                >{line}</motion.li>
            ))}</ul>
            {exp.techStack?.length !== 0 &&
            <motion.p
                className='coreSystemText mt-1 text-sm flex items-end gap-1'
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.5 }}
            >My job involves working with these core systems<ArrowLongRightIcon className='w-4' /></motion.p>}
            <div className='expStachList flex flex-wrap gap-2'>
                {exp.techStack?.map((tech: string) => 
                <motion.p
                    key={tech}
                    className='expTech px-2 py-1 rounded-xl text-sm'
                    initial={{ opacity: 0, scale: 2 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.3 }}
                >{tech}</motion.p>
                )}
            </div>
        </motion.div>
    )
}

export default Experience;