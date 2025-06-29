'use client';
import React, { useRef, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Exp } from '../../../../types/Experiences';

interface FormProps {
    obj: Exp
    setObj: React.Dispatch<React.SetStateAction<Exp>>
    handleSave: (e: React.FormEvent<HTMLFormElement>) => void
    formRef: React.RefObject<HTMLFormElement | null>
    prepareObj: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    busy: boolean
}

const Form = ({ obj, setObj, handleSave, formRef, prepareObj, busy }: FormProps) => {
    const techRef = useRef<HTMLInputElement | null>(null);
    const [techText, setTechText] = useState<string>('');
    const [thisTech, setThisTech] = useState<string | undefined>('');

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
        if(obj.techStack?.includes(trimmed)) {
            blinkTwice(trimmed);
            return;
        }
        setObj(prev => ({
            ...prev, techStack: [...prev.techStack!, trimmed]
        }));
        setTechText('');
        techRef.current?.focus();
    }

    return (
        <form ref={formRef} onSubmit={handleSave} className='h-0'>
            <div className="formInnerDiv">
                <label>
                    Title
                    <input type="text" required placeholder='e.g. Web-developer' autoComplete='off' name='title' value={obj.title} onChange={prepareObj} />
                </label>
                <label>
                    Company name
                    <input type="text" required placeholder='e.g. Microsoft' autoComplete='off' name='company' value={obj.company} onChange={prepareObj} />
                </label>
                <label>
                    Work location
                    <input type="text" required placeholder='e.g. Iraq-Baghdad' autoComplete='off' name='location' value={obj.location} onChange={prepareObj} />
                </label>
                <label>
                    Job description
                    <textarea placeholder='Job details' name='description' autoComplete='off' value={obj.description} onChange={prepareObj}></textarea>
                </label>
                <label>
                    Starting date
                    <input type="text" required placeholder='e.g. 1/6/2025' autoComplete='off' name='dateFrom' value={obj.dateFrom} onChange={prepareObj} />
                </label>
                <label>
                    Ending date
                    <input type="text" placeholder='e.g. 1/6/2027' autoComplete='off' name='dateTo' value={obj.dateTo} onChange={prepareObj} />
                </label>
                <p>Tech or tools you have worked with</p>
                <div className='inputButton'>
                    <input ref={techRef} type="text" value={techText} autoComplete='off' placeholder='e.g. JavaScript' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechText(e.target.value)} />
                    <button onClick={prepareTechList}>Add</button>
                </div>
                {obj.techStack && obj.techStack.length > 0 &&
                <div className='formTechWrapper'>
                    {obj.techStack.map((tech: string) =>
                    <div key={tech} className={`${tech === thisTech ? 'bg-green-600' : ''}`}>{tech}
                        <TrashIcon className='w-5' onClick={() => setObj(prev => ({
                            ...prev, techStack: prev.techStack?.filter(t => t !== tech)
                        }))} />
                    </div>)}
                </div>}
                <button
                    type='submit'
                    className={`${(!obj.dateFrom || !obj.title || !obj.company || !obj.location) ? '' : 'activeFormButton'}`}
                    style={{ background: busy ? '#888' : '' }}
                    disabled={busy}
                >{obj.id ? 'Update' : 'Save'}</button>
            </div>
        </form>
    )
}

export default Form;