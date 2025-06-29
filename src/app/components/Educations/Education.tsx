'use client';
import React from 'react';
import Image from 'next/image';
import { EducationType } from '../../../../types/Educations';
import { motion } from 'framer-motion';

interface EducationProps {
    education: EducationType
}

const Education = ({ education }: EducationProps) => {
    return (
        <motion.div
            className='educationCard border-thin-2 backdrop-blur-sm p-5 relative flex flex-col justify-between'
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <p className='educationDate text-sm absolute'>{education.dateFrom} - {education.dateTo}</p>
            <p className='border-b-thin pb-4 mb-4 text-sm'>{education.location}</p>
            <div className='flex items-center gap-4 pb-4 mb-4 border-b-thin'>
                <div>
                    <Image
                        src={education.image}
                        alt='Logo'
                        width={100}
                        height={100}
                        priority
                    />
                </div>
                <div>
                    <h1 className='text-xl text-[#8f55bb]'>{education.school}</h1>
                    <h3 className='text-sm text-[#3076ac]'>{education.title}</h3>
                </div>
            </div>
            <p className='text-sm'>{education.description}</p>
        </motion.div>
    )
}

export default Education;