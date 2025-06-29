import React, { RefObject } from 'react';
import { ProjectType } from '../../../../types/Projects';
import { TrashIcon } from '@heroicons/react/24/outline';

interface FormProps {
    handleSave: (e: React.FormEvent<HTMLFormElement>) => void
    obj: ProjectType
    busy: boolean
    prepareObj: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    form: boolean
    setObj: React.Dispatch<React.SetStateAction<ProjectType>>
    thisTech: string | undefined
    prepareTechList: (e: React.MouseEvent<HTMLButtonElement>) => void
    techText: string
    setTechText: React.Dispatch<React.SetStateAction<string>>
    techRef: RefObject<HTMLInputElement | null>
}

const Form = (props: FormProps) => {
    return (
        <form onSubmit={props.handleSave} className='h-full'>
            <div className="formInnerDiv">
                <label>
                    Title
                    <input type="text" required placeholder='e.g. Restaurant app, Full-stack' autoComplete='off' name='title' value={props.obj.title} onChange={props.prepareObj} />
                </label>
                <label>
                    Description
                    <textarea required placeholder='Project details' autoComplete='off' name='description' value={props.obj.description} onChange={props.prepareObj}></textarea>
                </label>
                <label>
                    Project date
                    <input type="text" required placeholder='Finish date' autoComplete='off' name='date' value={props.obj.date} onChange={props.prepareObj} />
                </label>
                <label>
                    Project link
                    <input type="text" placeholder='Project link e.g. www.project.com' autoComplete='off' name='link' value={props.obj.link} onChange={props.prepareObj} />
                </label>
                <div className='flex gap-2'>
                    <input
                        type="checkbox"
                        id='prof'
                        autoComplete='off'
                        name='date'
                        value={props.obj.date}
                        onChange={() => props.setObj(prev => ({
                        ...prev, isProfessional: !props.obj.isProfessional
                        }))}
                    />
                    <label htmlFor="prof">Professional project</label>
                </div>
                <p>Tech or tools you have worked with</p>
                <div className='inputButton'>
                    <input ref={props.techRef} type="text" value={props.techText} autoComplete='off' placeholder='e.g. JavaScript' onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setTechText(e.target.value)} />
                    <button onClick={props.prepareTechList}>Add</button>
                </div>
                {props.obj.techList && props.obj.techList.length > 0 &&
                <div className='formTechWrapper'>
                    {props.obj.techList.map((tech: string) =>
                    <div key={tech} className={`${tech === props.thisTech ? 'bg-green-600' : ''}`}>{tech}
                        <TrashIcon className='w-5' onClick={() => props.setObj(prev => ({
                            ...prev, techList: prev.techList?.filter(t => t !== tech)
                        }))} />
                    </div>)}
                </div>}
                <button
                    type='submit'
                    className={`${(!props.obj.title || !props.obj.description || !props.obj.date) ? '' : 'activeFormButton'}`}
                    style={{ background: props.busy ? '#888' : '' }}
                    disabled={props.busy}
                >{props.obj.id ? 'Update' : 'Save'}</button>
            </div>
        </form>
    )
}

export default Form;