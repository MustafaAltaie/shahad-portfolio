'use client';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../../components/Educations/Educations.css';
import { AcademicCapIcon } from '@heroicons/react/24/solid';
import { EducationType } from '../../../../types/Educations';
import Education from './Education';
import Form from './Form';
import {
    useCreateEducationMutation,
    useUploadEducationDocMutation,
    useUploadEducationLogoMutation,
    useReadEducationsQuery,
    useUpdateEducationMutation,
    useChangeEducationDocMutation,
    useChangeEducationLogoMutation,
} from '../../../../features/educations/educationApi';
import WaitingModal from '../WaitingModal';

const Educations = () => {
    const [educationList, setEducationList] = useState<EducationType[]>([]);
    const [form, setForm] = useState(false);
    const [obj, setObj] = useState<EducationType>({
        id: '',
        location: '',
        dateFrom: '',
        dateTo: '',
        school: '',
        title: '',
        description: '',
        logoLink: '',
        docLink: '',
    });
    const [logo, setLogo] = useState<File | null>(null);
    const [doc, setDoc] = useState<File | null>(null);
    const [createEducation] = useCreateEducationMutation();
    const [uploadEducationDoc] = useUploadEducationDocMutation();
    const [uploadEducationLogo] = useUploadEducationLogoMutation();
    const { data, isLoading, isError } = useReadEducationsQuery();
    const [updateEducation] = useUpdateEducationMutation();
    const [changeEducationDoc] = useChangeEducationDocMutation();
    const [changeEducationLogo] = useChangeEducationLogoMutation();
    const [oldDoc, setOldDoc] = useState<string | undefined>('');
    const [oldLogo, setOldLogo] = useState<string | undefined>('');
    const [busy, setBusy] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if(!isLoading && data) {
            const transformed: EducationType[] = data.map(edu => ({
                id: edu._id,
                location: edu.location,
                dateFrom: edu.dateFrom,
                dateTo: edu.dateTo,
                school: edu.school,
                title: edu.title,
                description: edu.description, 
                logoLink: edu.logoLink,
                docLink: edu.docLink,
            }));
            setEducationList(transformed);
        }
    }, [isLoading, data]);

    if (isLoading) return <p>...Loading</p>
    if (isError) return <p>Error loading educations</p>

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let docLink = doc?.name || obj.docLink;
        let logoLink = logo?.name || obj.logoLink;
        try {
            setBusy(true);
            if (doc) {
                const ext = doc.name.includes('.') ?
                    doc.name.substring(doc.name.lastIndexOf('.')) :
                    '.png';
                const newName = `${uuidv4()}${ext}`;
                const renamedFile = new File([doc], newName, { type: doc.type });
                const formData = new FormData();
                docLink = newName;
                formData.append('image', renamedFile);
                if (obj.id && obj.docLink) {
                    await changeEducationDoc({ formData, oldImage: oldDoc }).unwrap();
                } else {
                    await uploadEducationDoc(formData).unwrap();
                }
                console.log(`new doc: ${newName}`)
                console.log(`old doc: ${oldDoc}`)
            }
            if (logo) {
                const ext = logo.name.includes('.') ?
                    logo.name.substring(logo.name.lastIndexOf('.')) :
                    '.png';
                const newName = `${uuidv4()}${ext}`;
                const renamedFile = new File([logo], newName, { type: logo.type });
                const formData = new FormData();
                logoLink = newName;
                formData.append('image', renamedFile);
                if (obj.id && obj.logoLink) {
                    await changeEducationLogo({ formData, oldImage: oldLogo }).unwrap();
                } else {
                    await uploadEducationLogo(formData).unwrap();
                }
                console.log(`new logo: ${newName}`)
                console.log(`old logo: ${oldLogo}`)
            }
            const newEdu:EducationType = {
                ...obj,
                logoLink,
                docLink,
            }
            if (obj.id) {
                await updateEducation({ id: obj.id, data: newEdu }).unwrap();
            } else {
                await createEducation(newEdu).unwrap();
            }
            setForm(false);
        } catch (err) {
            console.log(err);
            alert('Error saving education');
        } finally {
            setBusy(false);
        }
    }

    return (
        <section className='educations p-7 flex flex-col gap-5 border-b-thin bg-url-fixed pb-10'>
            {busy && <WaitingModal />}
            <div className='flex items-center gap-2'>
                <AcademicCapIcon className='w-7 text-yellow-600' />
                <h1 className='text-2xl text-yellow-600 font-bold'>Educations</h1>
            </div>
            <div className='educationWrapper flex flex-col lg:flex-row lg:flex-wrap'>
                {educationList.map(education =>
                <Education
                    key={education.id}
                    education={education}
                    setForm={setForm}
                    setObj={setObj}
                    setOldDoc={setOldDoc}
                    setOldLogo={setOldLogo}
                    setBusy={setBusy}
                    setScrolled={setScrolled}
                />)}
            </div>
            <h1 className={`transition-all w-5 h-5 flexCenter pb-2 mx-auto text-4xl cursor-pointer ${form ? 'rotate-45' : ''}`} onClick={() => setForm(!form)}>+</h1>
            <Form
                form={form}
                setObj={setObj}
                obj={obj}
                handleSave={handleSave}
                logo={logo}
                setLogo={setLogo}
                doc={doc}
                setDoc={setDoc}
                busy={busy}
                scrolled={scrolled}
                setScrolled={setScrolled}
            />
        </section>
    )
}

export default Educations;