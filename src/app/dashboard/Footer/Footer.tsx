'use client';
import React, { useEffect, useRef, useState } from 'react';
import '../../components/Footer/Footer.css';
import SocialForm from './SocialForm';
import { SocialObj, Message } from '../../../../types/Footer';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useUpdateSocialMutation, useReadSocialQuery } from '../../../../features/footer/socialApi';
import WaitingModal from '../WaitingModal';

const Footer = () => {
    const [message, setMessage] = useState<Message>({
        name: '',
        email: '',
        message: '',
    });
    const [social, setSocial] = useState<SocialObj>({
        linkedIn: '',
        mobile: '',
        email: '',
        github: '',
    });
    const [socialForm, setSocialForm] = useState(false);
    const socialFormRef = useRef<HTMLFormElement | null>(null);
    const [updateSocial] = useUpdateSocialMutation();
    const { data: socials } = useReadSocialQuery();
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        if (socials) {
            setSocial(socials);
        }
    }, [socials]);

    const handlePrepareMessage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMessage(prev => ({
            ...prev, [name]: value
        }));
    }

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const prepareSocial = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSocial(prev => ({
            ...prev, [name]: value
        }));
    }

    const handleSaveSocial = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setBusy(true);
            await updateSocial(social).unwrap();
            setSocialForm(false);
        } catch (err) {
            console.error(err);
            alert('Error saving social');
        } finally {
            setBusy(false);
        }
    }

    return (
        <footer className='bg-black px-10'>
            {busy && <WaitingModal />}
            <div>
                {/* Upper */}
                <div className='fotterUpper flex gap-5 lg:gap-10 justify-center p-3 lg:p-2 border-b-thin mb-2 mt-2'>
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
                    {!socialForm && <PencilIcon className='w-10 lg:w-8 p-2 absolute right-5 cursor-pointer' title='Edit' onClick={() => setSocialForm(true)} />}
                </div>
                <SocialForm
                    social={social}
                    prepareSocial={prepareSocial}
                    socialForm={socialForm}
                    setSocialForm={setSocialForm}
                    socialFormRef={socialFormRef}
                    handleSaveSocial={handleSaveSocial}
                    busy={busy}
                />
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
                        <form onSubmit={handleSendMessage} className='contactForm flex flex-col gap-2 lg:gap-1 mb-2 lg:w-1/2'>
                            <input className='p-2 rounded-lg lg:p-1 text-sm' type="text" name='name' placeholder='Name' value={message.name} onChange={handlePrepareMessage} />
                            <input className='p-2 rounded-lg lg:p-1 text-sm' type="text" name='email' placeholder='Email' value={message.email} onChange={handlePrepareMessage} />
                            <textarea className='p-2 rounded-lg lg:p-1 text-sm' name="message" placeholder='Message' value={message.message} onChange={handlePrepareMessage}></textarea>
                            <button type='submit' className='bg-blue-800 p-2 text-white rounded-lg text-sm cursor-pointer'>Send</button>
                        </form>
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
}

export default Footer;