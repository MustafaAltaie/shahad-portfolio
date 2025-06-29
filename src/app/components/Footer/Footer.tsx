'use client';
import React, { useState, useEffect, forwardRef } from 'react';
import './Footer.css';
import { SocialObj, Message } from '../../../../types/Footer';
import { useReadFooterDocsQuery } from '../../../../features/footer/docsApi';
import { useSendContactEmailMutation } from '../../../../features/contact/contactApi';
import WaitingModal from '@/app/dashboard/WaitingModal';

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
    const { data, isLoading } = useReadFooterDocsQuery();

    // Contact
    
    const [formData, setFormData] = useState<Message>({
        name: '',
        email: '',
        message: '',
    });

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const [successMsg, setSuccessMsg] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [disableButton, setDisableButton] = useState(false);
    const [sendContactEmail] = useSendContactEmailMutation();
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        if (socials) {
            setSocial(socials);
        }
    }, [socials]);

    if (isLoading) return <p>...Loading documents</p>

    // contact

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev, [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');

        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setErrorMsg('All fields are required.');
            return;
        }

        if (!formData.email || !isValidEmail(formData.email)) {
            setErrorMsg('Enter a valid email.');
            return;
        }

        setDisableButton(true);

        try {
            setBusy(true);
            await sendContactEmail(formData).unwrap();
            setSuccessMsg('Message sent!');
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            console.error(err);
            setErrorMsg('Could not send the message.');
        } finally {
            setDisableButton(false);
            setTimeout(() => {
                setSuccessMsg('');
                setErrorMsg('');
            }, 3000);
            setBusy(false);
        }
    }

    return (
        <footer ref={ref} className='bg-black px-10'>
            {busy && <WaitingModal />}
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
                            {data?.map(doc =>
                                <li
                                    key={doc}
                                    className='italic pl-1 text-sm'
                                    onClick={() => window.open(`https://res.cloudinary.com/dswmp2omq/image/upload/${encodeURIComponent(doc)}`)}
                                >{doc.split('/').pop()}</li>)}
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
                        <form onSubmit={handleSubmit} className='contactForm flex flex-col gap-2 lg:gap-1 mb-2 lg:w-1/2'>
                            <input className='p-2 rounded-lg lg:p-1 text-sm' type="text" name='name' placeholder='Name' value={formData.name} onChange={handleChange} />
                            <input className='p-2 rounded-lg lg:p-1 text-sm' type="text" name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
                            <textarea className='p-2 rounded-lg lg:p-1 text-sm' name="message" placeholder='Message' value={formData.message} onChange={handleChange}></textarea>
                            <button
                                type='submit'
                                className='bg-blue-800 p-2 text-white rounded-lg text-sm'
                                style={disableButton ? { background: '#888', pointerEvents: 'none' } : { background: '', pointerEvents: 'unset' }}
                            >Send</button>
                        </form>
                        {successMsg && <h6 style={{ color: 'green', position: 'absolute', bottom: '10px' }}>{successMsg}</h6>}
                        {errorMsg && <h6 style={{ color: 'red', position: 'absolute', bottom: '10px' }}>{errorMsg}</h6>}
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