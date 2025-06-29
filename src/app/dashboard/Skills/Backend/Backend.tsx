'use client';
import React, { useEffect, useState } from 'react';
import Skill from './Skill';
import { FSkill } from '../../../../../types/Skills';
import Form from '../Form';
import SkillTemplate from '../SkillTemplate';
import {
    useCreateBackendSkillMutation,
    useReadBackendSkillsQuery,
    useUpdateBackendSkillMutation,
    useUploadBackendSkillIconMutation,
    useChangeBackendSkillIconMutation,
    useDeleteBackendSkillMutation,
    useDeleteBackendSkillIconMutation,
} from '../../../../../features/skills/skillsApi';
import { v4 as uuidv4 } from 'uuid';
import WaitingModal from '../../WaitingModal';

interface BackendProps {
    setFolder: React.Dispatch<React.SetStateAction<string>>
    folder: string
}

const Backend = ({  setFolder, folder }: BackendProps) => {
    const [backend, setBackend] = useState<FSkill[]>([]);
    const [form, setForm] = useState(false);
    const [skillObj, setSkillObj] = useState<FSkill>({
        id: '',
        imageLink: '',
        title: '',
        level: '',
    });
    const [fileImage, setFileImage] = useState<File | null>(null);
    const [createBackendSkill] = useCreateBackendSkillMutation();
    const { data, isLoading, isError } = useReadBackendSkillsQuery();
    const [uploadBackendSkillIcon] = useUploadBackendSkillIconMutation();
    const [updateBackendSkill] = useUpdateBackendSkillMutation();
    const [changeBackendSkillIcon] = useChangeBackendSkillIconMutation();
    const [deleteBackendSkill] = useDeleteBackendSkillMutation();
    const [deleteBackendSkillIcon] = useDeleteBackendSkillIconMutation();
    const [oldName, setOldName] = useState<string>('');
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        if (data && !isLoading) {
            const transformed: FSkill[] = data.map(skill => ({
                id: skill._id,
                imageLink: skill.imageLink,
                title: skill.title,
                level: skill.level,
            }));
            setBackend(transformed);
        }
    }, [data, isLoading]);

    if (isLoading) return <p>...Loading skills</p>
    if (isError) return <p>Error loading skills</p>

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let imageLink = fileImage?.name || skillObj.imageLink;
        try {
            setBusy(true);
            if (fileImage) {
                const ext = fileImage.name.includes('.') ?
                    fileImage.name.lastIndexOf('.') :
                    '.png';
                const newName = `${uuidv4()}${ext}`;
                const renamedFile = new File([fileImage], newName, { type: fileImage.type });
                const formData = new FormData();
                formData.append('image', renamedFile);
                imageLink = newName;
                if (skillObj.id) {
                    await changeBackendSkillIcon({ formData, oldImage: oldName }).unwrap();
                } else {
                    await uploadBackendSkillIcon(formData).unwrap();
                }
            }
            const newItem: FSkill = {
                ...skillObj,
                imageLink
            }
            if (skillObj.id) {
                await updateBackendSkill({ id: skillObj.id, data: newItem }).unwrap();
            } else {
                await createBackendSkill(newItem).unwrap();
            }
            clearSkillObj();
        } catch (err) {
            console.error(err);
            alert('Error saving skill');
        } finally {
            setBusy(false);
        }
    }

    const handleDelete = async (skill: FSkill) => {
        try {
            setBusy(true);
            if (skill.imageLink) await deleteBackendSkillIcon(skill.imageLink).unwrap();
            await deleteBackendSkill(skill.id!).unwrap();
        } catch (err) {
            console.log(err);
            alert('Error deleting skill');
        } finally {
            setBusy(false);
        }
    }

    const clearSkillObj = () => {
        setSkillObj({
            id: '',
            imageLink: '',
            title: '',
            level: '',
        });
        setFileImage(null);
    }

    return (
        <div className='mt-5'>
            {busy && <WaitingModal />}
            <h1 className='text-xl mb-3'>Backend</h1>
            <div className='backendSkillWrapper flex flex-wrap'>
                {backend.map((skill: FSkill) =>
                <Skill
                    key={skill.id}
                    skill={skill}
                    setForm={setForm}
                    setSkillObj={setSkillObj}
                    setOldName={setOldName}
                    handleDelete={handleDelete}
                    setFolder={setFolder}
                />)}
                {!skillObj.id &&
                <SkillTemplate
                    form={form}
                    setForm={setForm}
                    skillObj={skillObj}
                    fileImage={fileImage}
                />}
            </div>
            <Form
                form={form}
                setForm={setForm}
                skillObj={skillObj}
                setSkillObj={setSkillObj}
                fileImage={fileImage}
                setFileImage={setFileImage}
                clearSkillObj={clearSkillObj}
                handleSave={handleSave}
                folder={folder}
            />
        </div>
    )
}

export default Backend;