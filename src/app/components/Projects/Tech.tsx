import React from 'react';
import { motion } from 'framer-motion';

interface TechProps {
    tech: string
}

const Tech = ({ tech }: TechProps) => {
    return (
        <motion.li
            className='rounded-lg px-1.5 py-1'
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0 }}
        >{tech}</motion.li>
    )
}

export default Tech;