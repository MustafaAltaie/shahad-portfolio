import React, { useEffect } from 'react';
import { SocialObj } from '../../../../types/Footer';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface SocialFormProps {
    social: SocialObj
    prepareSocial: (e: React.ChangeEvent<HTMLInputElement>) => void
    socialForm: boolean
    setSocialForm: React.Dispatch<React.SetStateAction<boolean>>
    socialFormRef: React.RefObject<HTMLFormElement | null>
    handleSaveSocial: (e: React.FormEvent<HTMLFormElement>) => void
    busy: boolean
}

const SocialForm = ({
    social,
    prepareSocial,
    socialForm,
    setSocialForm,
    socialFormRef,
    handleSaveSocial,
    busy,
}: SocialFormProps) => {

    useEffect(() => {
        const currentForm = socialFormRef.current;
        if (!currentForm) return;
        if (socialForm) {
            currentForm.style.height = `${currentForm.scrollHeight}px`;
        } else {
            currentForm.style.height = '0px';
        }
    }, [socialForm, socialFormRef]);

    return (
        <form ref={socialFormRef} onSubmit={handleSaveSocial} className={`${socialForm && 'mb-5'}`}>
            <XMarkIcon className='w-9 ml-auto p-2 cursor-pointer' onClick={() => setSocialForm(false)} />
            <div className="formInnerDiv">
                <label>
                    LinkedIn
                    <input type="text" placeholder='LinkedIn username' autoComplete='off' name='linkedIn' value={social.linkedIn} onChange={prepareSocial} />
                </label>
                <label>
                    Mobile
                    <input type="tel" placeholder='e.g +46712345678' autoComplete='tel' name='mobile' value={social.mobile} onChange={prepareSocial} />
                </label>
                <label>
                    Email
                    <input type="email" placeholder='e.g name@gmail.com' autoComplete='email' name='email' value={social.email} onChange={prepareSocial} />
                </label>
                <button
                    type='submit'
                    style={{ background: busy ? '#888' : '' }}
                    disabled={busy}
                >Save</button>
            </div>
        </form>
    )
}
// className={`${(!skillObj.title || !skillObj.level) ? '' : 'activeFormButton'}`}

export default SocialForm;