'use client';
import React, { useState, useEffect, forwardRef } from 'react';
import './Footer.css';
import { SocialObj } from '../../../../types/Footer';

interface FooterProps {
    socials: SocialObj | undefined
}

const Footer = forwardRef<HTMLElement, FooterProps>(({ socials }, ref) => {
    const [social, setSocial] = useState<SocialObj>({
            linkedIn: '',
            mobile: '',
            email: '',
        });

    // Contact

    useEffect(() => {
        if (socials) {
            setSocial(socials);
        }
    }, [socials]);

    return (
        <footer ref={ref} className='bg-black px-10'>
            <div>
                {/* Upper */}
                <div className='fotterUpper flex gap-5 justify-center p-3 lg:p-2 border-b-thin mb-5 mt-2'>
                    <a
                        href={`https://www.linkedin.com/in/${social.linkedIn}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center gap-1 w-15 ${!social.linkedIn && 'pointer-events-none'}`}
                    >
                        <div className='w-10 h-10 flexCenter rounded-full'>
                            <i className="fa-brands fa-linkedin-in text-white"></i>
                        </div>
                        <p className='text-sm'>LinkedIn</p>
                    </a>
                    <a
                        href={`tel:${social.mobile}`}
                        rel="noopener"
                        className={`flex flex-col items-center gap-1 w-15 ${!social.mobile && 'pointer-events-none'}`}
                    >
                        <div className='w-10 h-10 flexCenter rounded-full'>
                            <i className="fa-solid fa-phone text-white"></i>
                        </div>
                        <p className='text-sm'>Mobile</p>
                    </a>
                    <a
                        href={`mailto:${social.email}`}
                        className={`flex flex-col items-center gap-1 w-15 ${!social.email && 'pointer-events-none'}`}
                    >
                        <div className='w-10 h-10 flexCenter rounded-full'>
                            <i className="fa-solid fa-envelope text-white"></i>
                        </div>
                        <p className='text-sm'>Email</p>
                    </a>
                </div>
                <div className='lg:flex items-center lg:border-b-1 lg:border-[#ffffff55] gap-10'>
                    {/* Documents */}
                    <div className='border-b-thin lg:border-b-0 pb-5'>
                        <p className='mb-5 flex gap-3'><span>You can find all relevant documents below.</span></p>
                        <ul className='flex flex-col gap-4'>
                            <li onClick={() => window.open('/images/docs/General.png', '_blank', 'noopener,noreferrer')} className='italic pl-1 flex justify-between'>General English (Intro) full track</li>
                            <li onClick={() => window.open('/images/docs/Al-Huda.png', '_blank', 'noopener,noreferrer')} className='italic pl-1 flex justify-between'>Al-Huda bank</li>
                            <li onClick={() => window.open('/images/docs/Microsoft.png', '_blank', 'noopener,noreferrer')} className='italic pl-1 flex justify-between'>(Microsoft Office 2016) Certificate of Participation</li>
                            <li onClick={() => window.open('/images/docs/Fundamentals.png', '_blank', 'noopener,noreferrer')} className='italic pl-1 flex justify-between'>(Fundamentals of Letters of Credit and Bank Guarantees course) Certificate of Participation</li>
                            <li onClick={() => window.open('/images/docs/SWIFT.png', '_blank', 'noopener,noreferrer')} className='italic pl-1 flex justify-between'>(New SWIFT Messages course) Certificate of Participation</li>
                            <li onClick={() => window.open('/images/docs/MX.png', '_blank', 'noopener,noreferrer')} className='italic pl-1 flex justify-between'>(MX Training) Al-Huda bank</li>
                            <li onClick={() => window.open('/images/docs/Cybersecurity.png', '_blank', 'noopener,noreferrer')} className='italic pl-1 flex justify-between'>(Cybersecurity Analyst) Certificate of Participation at Central bank of Iraq</li>
                        </ul>
                    </div> 
                </div>
                {/* Lower */}
                <div>
                    <p className='border-b-thin pb-5 mt-5 text-sm'>This portfolio is built using modern technologies such as
                        <span> Next.js, </span>
                        <span>TypeScript, </span>
                        <span>Tailwind CSS, </span> and
                        <span> RTK Query</span>
                    </p>
                    <h5 className='py-3 text-center text-sm' onClick={() => window.open('https://www.linkedin.com/in/mustafa-altaie-b35356178', '_blank', 'noopener,noreferrer')}>© 2025 Mustafa Altaie. All rights reserved.</h5>
                </div>
            </div>
        </footer>
    )
});

Footer.displayName = 'Footer';

export default Footer;