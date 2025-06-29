import { Schema, models, model } from 'mongoose';
import { FSkill } from '../../types/Skills';

const skillSchema = new Schema<FSkill>({
    imageLink: { type: String },
    title: { type: String, required: true },
    level: { type: String, required: true },
});

export const FrontendSkill = models.FrontendSkill || model('FrontendSkill', skillSchema);
export const BackendSkill = models.BackendSkill || model('BackendSkill', skillSchema);
export const OtherSkill = models.OtherSkill || model('OtherSkill', skillSchema);