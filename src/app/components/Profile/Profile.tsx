import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './Profile.css';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface Section1Props {
    profile: string | undefined
}

const Section1 = ({ profile }: Section1Props) => {
    const [text, setText] = useState<string>('');

    useEffect(() => {
        if (profile) {
            setText(profile || '');
        }
    }, [profile]);

    return (
        <section className='section1 overflow-x-hidden flex flex-col lg:flex-row'>
            <div className="mainImageWrapper flex items-end lg:items-end justify-center overflow-hidden lg:w-1/2 pt-15">
                <Image
                    className='lg:object-contain'
                    src='/images/shahad.jpg'
                    alt='homeImage'
                    width={500}
                    height={400}
                    priority
                />
            </div>
            <div className="profileWrapper p-7 lg:w-1/2 lg:p-30 border-b-1 lg:border-b-0">
                <div className='flex items-center gap-2 pb-4 font-bold'>
                    <h1><UserCircleIcon className='w-7 text-[#8f55bb]' /></h1>
                    <span className='text-2xl text-[#8f55bb]'>Profile</span>
                </div>
                <motion.p
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0 }}
                >{text}</motion.p>
            </div>
        </section>
    )
}

export default Section1;