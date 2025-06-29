'use client';
import React from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import '../../components/Skills/Skills.css';
import Other from './Other/Other';

const Skills = () => {
    return (
        <section className='skills py-7 px-3 pb-10 bg-url-fixed'>
            <div className='flex gap-2 mb-3 pb-3'>
                <Cog6ToothIcon className='w-7 text-yellow-600' />
                <h1 className='text-2xl text-yellow-600 font-bold'>Skills and knowledge</h1>
            </div>
            <div>
                <Other />
            </div>
        </section>
    )
}

export default Skills;