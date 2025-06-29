import { Schema, models, model } from 'mongoose';
import { FSkill } from '../../types/Skills';

const skillSchema = new Schema<FSkill>({
    imageLink: { type: String },
    title: { type: String, required: true },
    level: { type: String, required: true },
});

export const OtherSkill = models.OtherSkill || model('OtherSkill', skillSchema);