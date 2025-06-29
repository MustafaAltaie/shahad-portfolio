'use client';
import React, { useState, useRef, useEffect } from 'react';
import '../../components/Experiences/Experiences.css';
import { BriefcaseIcon } from '@heroicons/react/24/solid';
import Experience from './Experience';
import { Exp } from '../../../../types/Experiences';
import Form from './Form';
import { useCreateExpMutation, useReadExpsQuery, useUpdateExpMutation } from '../../../../features/experiences/experienceApi';
import WaitingModal from '../WaitingModal';

const Experiences = () => {
    const [experienceList, setExperienceList] = useState<Exp[]>([]);
    const [form, setForm] = useState(false);
    const [obj, setObj] = useState<Exp>({
        id: '',
        dateFrom: '',
        dateTo: '',
        title: '',
        company: '',
        location: '',
        description: '',
        techStack: [],
    });
    const formRef = useRef<HTMLFormElement | null>(null);
    const [createExp] = useCreateExpMutation();
    const { data, isLoading, isError } = useReadExpsQuery();
    const [updateExp] = useUpdateExpMutation();
    const [busy, setBusy] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (data && !isLoading) {
            const transformed: Exp[] = data.map(experience => ({
                id: experience._id,
                dateFrom: experience.dateFrom,
                dateTo: experience.dateTo,
                title: experience.title,
                company: experience.company,
                location: experience.location,
                description: experience.description,
                techStack: experience.techStack,
            }));
            setExperienceList(transformed);
        }
    }, [data, isLoading]);

    useEffect(() => {
        const currentForm = formRef.current;
        if (!currentForm) return;
        if (form) {
            currentForm.style.height = `${currentForm.scrollHeight}px`;
            if (!scrolled) {
                currentForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setScrolled(true);
            }
        } else {
            setObj({
                id: '',
                dateFrom: '',
                dateTo: '',
                title: '',
                company: '',
                location: '',
                description: '',
                techStack: []
            });
            currentForm.style.height = '0px';
        }
    }, [form, formRef, obj.techStack?.length, setObj, setScrolled, scrolled]);

    if (isError) return <p>Error loading experiences</p>
    if (isLoading) return <p>...Loading experiences</p>

    const prepareObj = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setObj(prev => ({
            ...prev, [name]: value
        }));
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setBusy(true);
            if (obj.id) {
                await updateExp({ id: obj.id, data: obj }).unwrap();
            } else {
                await createExp(obj).unwrap();
            }
            setForm(false);
        } catch (err) {
            console.error(err);
            alert('Error saving experience');
        } finally {
            setBusy(false);
        }
    }

    return (
        <section className='experiences p-7 flex flex-col gap-5 bg-url-fixed pb-10 border-b-thin'>
            {busy && <WaitingModal />}
            <div className='flex gap-2'>
                <BriefcaseIcon className='w-7 text-yellow-600' />
                <h1 className='text-yellow-600 text-2xl font-bold'>Experiences</h1>
            </div>
            {/* Experiences wrapper */}
            <div className='expWrapper flex flex-col lg:flex-row lg:flex-wrap'>
                {/* Card */}
                {experienceList.map((exp: Exp) => 
                    <Experience key={exp.id} exp={exp} setForm={setForm} setObj={setObj} setScrolled={setScrolled} />
                )}
            </div>
            <h1 className={`transition-all w-5 h-5 flexCenter pb-2 mx-auto text-4xl cursor-pointer ${form ? 'rotate-45' : ''}`} onClick={() => setForm(!form)}>+</h1>
            <Form
                obj={obj}
                setObj={setObj}
                handleSave={handleSave}
                formRef={formRef}
                prepareObj={prepareObj}
                busy={busy}
            />
        </section>
    )
}

export default Experiences;