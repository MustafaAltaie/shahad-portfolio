import { FSkill } from '../../../../types/Skills';

interface SkillProps {
    form: boolean
    setForm: React.Dispatch<React.SetStateAction<boolean>>
    skillObj: FSkill
}

const Skill = ({ form, setForm, skillObj }: SkillProps) => {
    return (
        <div className='skillCardTemp p-3 flex flex-col gap-2 rounded-sm relative cursor-pointer' title='Add skill'>
            {form &&
            <>
            <div className='flex gap-1 items-center'>
                <h1 className='text-sm'>{skillObj.title || 'Skill Title'}</h1>
            </div>
            <div className='skillLevel w-full h-1'>
                <div style={{ width: `${skillObj.level || 0}%` }}></div>
            </div>
            </>}
            {!form &&
            <div className='text-2xl text-center' onClick={() => setForm(true)}>+</div>}
        </div>
    )
}

export default Skill;