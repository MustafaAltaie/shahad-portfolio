'use client';
import React, { useEffect, useState, useRef } from 'react';
import '../../components/Projects/Projects.css';
import { CodeBracketIcon } from '@heroicons/react/24/solid';
import { ProjectType } from '../../../../types/Projects';
import Project from './Project';
import { useReadProjectsQuery, useCreateProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } from '../../../../features/projects/projectsApi';
import Form from './Form';
import WaitingModal from '../WaitingModal';

const Projects = () => {
    const [list, setList] = useState<ProjectType[]>([]);
    const { data: projects } = useReadProjectsQuery();
    const [obj, setObj] = useState<ProjectType>({
        id: '',
        title: '',
        description: '',
        date: '',
        isProfessional: false,
        techList: [],
        link: '',
    });
    const [busy, setBusy] = useState(false);
    const [form, setForm] = useState(false);
    const [techText, setTechText] = useState<string>('');
    const [thisTech, setThisTech] = useState<string | undefined>('');
    const techRef = useRef<HTMLInputElement | null>(null);
    const [createProject] = useCreateProjectMutation();
    const [updateProject] = useUpdateProjectMutation();
    const [deleteProject] = useDeleteProjectMutation();

    useEffect(() => {
        if (projects) {
            const transformed: ProjectType[] = projects.map(project => ({
                id: project._id,
                title: project.title,
                description: project.description,
                date: project.date,
                isProfessional: project.isProfessional,
                techList: project.techList,
                link: project.link
            }));
            setList(transformed);
        }
    }, [projects]);

    const prepareObj = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setObj(prev => ({
            ...prev, [name]: value
        }));
    }

    const blinkTwice = (trimmed: string) => {
        setThisTech(trimmed);
        setTimeout(() => {
            setThisTech('');
            setTimeout(() => {
                setThisTech(trimmed);
                setTimeout(() => {
                    setThisTech('');
                }, 200);
            }, 200);
        }, 200);
    }

    const prepareTechList = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const trimmed = techText.trim();
        if (!trimmed) return;
        if(obj.techList?.includes(trimmed)) {
            blinkTwice(trimmed);
            return;
        }
        setObj(prev => ({
            ...prev, techList: [...prev.techList || [], trimmed]
        }));
        setTechText('');
        techRef.current?.focus();
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setBusy(true);
            if (obj.id) {
                await updateProject({id: obj.id, data: obj}).unwrap();
            } else {
                await createProject(obj).unwrap();
            }
        } catch(err) {
            console.error(err);
            alert('Error while saving project');
        } finally {
            setBusy(false);
            clearObj();
        }
    }

    const prepareUpdate = (app: ProjectType) => {
        setObj({
            id: app.id,
            title: app.title,
            description: app.description,
            date: app.date,
            isProfessional: app.isProfessional,
            techList: app.techList,
            link: app.link,
        });
        setForm(true);
    }

    const handleDelete = async (id: string) => {
        if (!id) return;
        try {
            setBusy(true);
            await deleteProject(id).unwrap();
        } catch (err) {
            console.error(err);
            alert('Error deleting project');
        } finally {
            setBusy(false);
        }
    }

    const clearObj = () => {
        setObj({
            id: '',
            title: '',
            description: '',
            date: '',
            isProfessional: false,
            techList: [],
            link: '',
        });
        setTechText('');
    }

    return (
        <section className='projects bg-url-fixed p-7'>
            {busy && <WaitingModal />}
            <div className='flex gap-2 pb-3 items-end'>
                <CodeBracketIcon className='w-7 text-yellow-600' />
                <h1 className='text-2xl text-yellow-600 font-bold'>My projects</h1>
            </div>
            {/* wrapper */}
            <div className='projectWrapper flex flex-wrap'>
                {/* card */}
                {list.map(app =>
                <Project
                    key={app.id}
                    app={app}
                    handleDelete={handleDelete}
                    prepareUpdate={prepareUpdate}
                />
                )}
            </div>
            <h1 className={`transition-all w-5 h-5 flexCenter pb-2 mx-auto mt-5 text-4xl cursor-pointer ${form ? 'rotate-45' : ''}`} onClick={() => {setForm(!form); clearObj()}}>+</h1>
            {form &&
            <Form
                handleSave={handleSave}
                obj={obj}
                busy={busy}
                prepareObj={prepareObj}
                form={form}
                setObj={setObj}
                thisTech={thisTech}
                prepareTechList={prepareTechList}
                setTechText={setTechText}
                techText={techText}
                techRef={techRef}
            />}
        </section>
    )
}

export default Projects;