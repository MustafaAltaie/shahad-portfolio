'use cLient';
import React, { useState, useEffect } from 'react';
import { FSkill } from '../../../../../types/Skills';
import Skill from './Skill';
import Form from '../Form';
import { v4 as uuidv4 } from 'uuid';
import SkillTemplate from '../SkillTemplate';
import {
    useCreateFrontendSkillMutation,
    useReadFrontendSkillsQuery,
    useUpdateFrontendSkillMutation,
    useUploadFrontendSkillIconMutation,
    useChangeFrontendSkillIconMutation,
    useDeleteFrontendSkillMutation,
    useDeleteFrontendSkillIconMutation,
} from '../../../../../features/skills/skillsApi';
import WaitingModal from '../../WaitingModal';

interface FrontendProps {
    setFolder: React.Dispatch<React.SetStateAction<string>>
    folder: string
}

const Frontend = ({  setFolder, folder }: FrontendProps) => {
    const [frontend, setFrontend] = useState<FSkill[]>([]);
    const [form, setForm] = useState(false);
    const [skillObj, setSkillObj] = useState<FSkill>({
        id: '',
        imageLink: '',
        title: '',
        level: '',
    });
    const [fileImage, setFileImage] = useState<File | null>(null);
    const [createFrontendSkill] = useCreateFrontendSkillMutation();
    const { data, isLoading, isError } = useReadFrontendSkillsQuery();
    const [uploadFrontendSkillIcon] = useUploadFrontendSkillIconMutation();
    const [updateFrontendSkill] = useUpdateFrontendSkillMutation();
    const [changeFrontendSkillIcon] = useChangeFrontendSkillIconMutation();
    const [deleteFrontendSkill] = useDeleteFrontendSkillMutation();
    const [deleteFrontendSkillIcon] = useDeleteFrontendSkillIconMutation();
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
            setFrontend(transformed);
        }
    }, [data, isLoading]);

    if (isLoading) return <p>...Loading skills</p>
    if (isError) return <p>Error loading skills</p>

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let imageLink = fileImage?.name || oldName;
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
                    await changeFrontendSkillIcon({ formData, oldImage: oldName }).unwrap();
                } else {
                    await uploadFrontendSkillIcon(formData).unwrap();
                }
            }
            const newItem: FSkill = {
                ...skillObj,
                imageLink
            }
            if (skillObj.id) {
                await updateFrontendSkill({ id: skillObj.id, data: newItem }).unwrap();
            } else {
                await createFrontendSkill(newItem).unwrap();
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
            if (skill.imageLink) await deleteFrontendSkillIcon(skill.imageLink).unwrap();
            await deleteFrontendSkill(skill.id!).unwrap();
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
        <div>
            {busy && <WaitingModal />}
            <h1 className='text-xl mb-3'>Frontend</h1>
            <div className='frontendSkillWrapper flex flex-wrap'>
                {frontend.map((skill: FSkill) =>
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

export default Frontend;