import React, { useEffect } from 'react';
import { XMarkIcon, DocumentCheckIcon } from '@heroicons/react/24/solid';

interface DocFormProps {
    DocFormRef: React.RefObject<HTMLFormElement | null>
    handleSaveDocs: (e: React.FormEvent<HTMLFormElement>) => void
    docForm: boolean
    setDocForm: React.Dispatch<React.SetStateAction<boolean>>
    docName: string
    setDocName: React.Dispatch<React.SetStateAction<string>>
    setDocFile: React.Dispatch<React.SetStateAction<File | null>>
    docFile: File | null
    busy: boolean
}

const DocForm = ({
    DocFormRef,
    handleSaveDocs,
    docForm,
    setDocForm,
    docName,
    setDocName,
    setDocFile,
    docFile,
    busy,
}: DocFormProps) => {

    useEffect(() => {
        const currentForm = DocFormRef.current;
        if (!currentForm) return;
        if (docForm) {
            currentForm.style.height = `${currentForm.scrollHeight}px`;
        } else {
            currentForm.style.height = '0px';
        }
    }, [docForm, DocFormRef, docFile]);

    return (
        <form ref={DocFormRef} onSubmit={handleSaveDocs} className={`${docForm && 'mb-5'}`}>
            <XMarkIcon className='w-9 ml-auto p-2 cursor-pointer' onClick={() => {setDocForm(false); setDocFile(null); setDocName('')}} />
            <div className="formInnerDiv">
                <label>
                    <span className='flex gap-3'>Upload image document {docFile && <DocumentCheckIcon className='w-5' />}</span>
                    <input type="file" accept='image/*' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/webp'];
                        if (!allowedTypes.includes(file.type)) {
                            alert('Only JPG, PNG, BMP, or WEBP image files are allowed.');
                            e.target.value = '';
                            return;
                        }
                        setDocFile(file);
                    }} />
                </label>
                {docFile &&
                <label>
                    Document name
                    <input type="text" placeholder='e.g. Resume' value={docName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDocName(e.target.value)} />
                </label>}
                <button
                    type='submit'
                    style={{ background: busy ? '#888' : '' }}
                    disabled={busy}
                >Save</button>
            </div>
        </form>
    )
}

export default DocForm;