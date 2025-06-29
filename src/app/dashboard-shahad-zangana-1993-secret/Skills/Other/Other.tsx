'use client';
import React, { useState, useEffect } from 'react';
import { FSkill } from '../../../../../types/Skills';
import Skill from './Skill';
import Form from '../Form';
import SkillTemplate from '../SkillTemplate';
import {
    useCreateOtherSkillMutation,
    useReadOtherSkillsQuery,
    useUpdateOtherSkillMutation,
    useDeleteOtherSkillMutation,
} from '../../../../../features/skills/skillsApi';
import WaitingModal from '../../WaitingModal';

const Other = () => {
    const [other, setOther] = useState<FSkill[]>([]);
    const [form, setForm] = useState(false);
    const [skillObj, setSkillObj] = useState<FSkill>({
        id: '',
        imageLink: '',
        title: '',
        level: '',
    });
    const [createOtherSkill] = useCreateOtherSkillMutation();
    const { data, isLoading, isError } = useReadOtherSkillsQuery();
    const [updateOtherSkill] = useUpdateOtherSkillMutation();
    const [deleteOtherSkill] = useDeleteOtherSkillMutation();
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        if (data && !isLoading) {
            const transformed: FSkill[] = data.map(skill => ({
                id: skill._id,
                imageLink: skill.imageLink,
                title: skill.title,
                level: skill.level,
            }));
            setOther(transformed);
        }
    }, [data, isLoading]);

    if (isLoading) return <p>...Loading skills</p>
    if (isError) return <p>Error loading skills</p>

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setBusy(true);
            if (skillObj.id) {
                await updateOtherSkill({ id: skillObj.id, data: skillObj }).unwrap();
            } else {
                await createOtherSkill(skillObj).unwrap();
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
            await deleteOtherSkill(skill.id!).unwrap();
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
    }

    return (
        <div className='mt-5'>
            {busy && <WaitingModal />}
            <h1 className='text-xl mb-3'>Other skills</h1>
            <div className='otherSkillWrapper flex flex-wrap'>
                {other.map((skill: FSkill) => 
                <Skill
                    key={skill.id}
                    skill={skill}
                    setForm={setForm}
                    setSkillObj={setSkillObj}
                    handleDelete={handleDelete}
                />)}
                {!skillObj.id &&
                <SkillTemplate
                    form={form}
                    setForm={setForm}
                    skillObj={skillObj}
                />}
            </div>
            <Form
                form={form}
                setForm={setForm}
                skillObj={skillObj}
                setSkillObj={setSkillObj}
                clearSkillObj={clearSkillObj}
                handleSave={handleSave}
            />
        </div>
    )
}

export default Other;