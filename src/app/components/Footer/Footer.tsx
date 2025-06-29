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
            github: '',
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
                <div className='fotterUpper flex gap-5 justify-center p-3 lg:p-2 border-b-thin mb-2 mt-2'>
                    <a
                        href={`https://www.linkedin.com/in/${social.linkedIn}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center gap-1 ${!social.linkedIn && 'pointer-events-none'}`}
                    >
                        <div className='w-8 h-8 flexCenter rounded-full'>
                            <i className="fa-brands fa-linkedin-in text-white text-sm"></i>
                        </div>
                        <p className='text-sm'>LinkedIn</p>
                    </a>
                    <a
                        href={`tel:${social.mobile}`}
                        rel="noopener"
                        className={`flex flex-col items-center gap-1 ${!social.mobile && 'pointer-events-none'}`}
                    >
                        <div className='w-8 h-8 flexCenter rounded-full'>
                            <i className="fa-solid fa-phone text-white text-sm"></i>
                        </div>
                        <p className='text-sm'>Call me</p>
                    </a>
                    <a
                        href={`mailto:${social.email}`}
                        className={`flex flex-col items-center gap-1 ${!social.email && 'pointer-events-none'}`}
                    >
                        <div className='w-8 h-8 flexCenter rounded-full'>
                            <i className="fa-solid fa-envelope text-white text-sm"></i>
                        </div>
                        <p className='text-sm'>Email me</p>
                    </a>
                    <a
                        href={`https://github.com/${social.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center gap-1 ${!social.github && 'pointer-events-none'}`}
                    >
                        <div className='w-8 h-8 flexCenter rounded-full'>
                            <i className="fa-brands fa-github text-white text-sm"></i>
                        </div>
                        <p className='text-sm'>Github</p>
                    </a>
                </div>
                <div className='lg:flex items-center lg:border-b-1 lg:border-[#ffffff55] gap-10'>
                    {/* Documents */}
                    <div className='border-b-1 border-[#ffffff55] lg:border-b-0 pb-2 mb-2 lg:w-1/2 lg:border-r-1 pr-10'>
                        <p className='mb-3 flex gap-3'><span>You can find all relevant documents below.</span></p>
                        <ul className='flex flex-col gap-2'>
                            <li className='italic pl-1 text-sm flex justify-between'>Swedish Vocational Program (Full stack JS)</li>
                            <li className='italic pl-1 text-sm flex justify-between'>Personal Letter</li>
                        </ul>
                    </div>
                    {/* Middle */}
                    <div className='pb-2 border-b-1 border-[#ffffff55] lg:border-b-0 lg:w-1/2'>
                        <p className='mb-2 text-sm'>Have an idea or a job opportunity? Do not hesitate to get in touch — I am fluent in
                            <span> English, </span>
                            <span>Swedish</span> and
                            <span> Arabic.</span>
                        </p>
                    </div>  
                </div>
                {/* Lower */}
                <div>
                    <p className='border-b-thin pb-2 mt-2 text-sm'>This portfolio is built using modern technologies such as
                        <span> React.js (Next.js), </span>
                        <span>TypeScript, </span>
                        <span>Tailwind CSS, </span>
                        <span>Cloudinary, </span><br />
                        <span>RTK Query </span>and
                        <span> Resend.</span>
                    </p>
                    <h5 className='py-3 text-center text-sm'>© 2025 Mustafa Altaie. Alla rättigheter förbehållna.</h5>
                </div>
            </div>
        </footer>
    )
});

Footer.displayName = 'Footer';

export default Footer;