'use client';
import React, { useEffect, useRef, useState } from 'react';
import '../../components/Footer/Footer.css';
import SocialForm from './SocialForm';
import { SocialObj } from '../../../../types/Footer';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useUpdateSocialMutation, useReadSocialQuery } from '../../../../features/footer/socialApi';
import WaitingModal from '../WaitingModal';

const Footer = () => {
    const [social, setSocial] = useState<SocialObj>({
        linkedIn: '',
        mobile: '',
        email: '',
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
                {/* Lower */}
                <div>
                    <h5 className='py-3 text-center text-sm'>© 2025 Mustafa Altaie. Alla rättigheter förbehållna.</h5>
                </div>
            </div>
        </footer>
    )
}

export default Footer;