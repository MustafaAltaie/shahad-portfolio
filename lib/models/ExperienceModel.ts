import { Schema, model, models } from 'mongoose';
import { Exp } from '../../types/Experiences';

const experienceSchema = new Schema<Exp>({
    dateFrom: { type: String, required: true },
    dateTo: { type: String },
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    techStack: { type: [String] },
}, { timestamps: true });

const Experience = models.Experience || model('Experience', experienceSchema);

export default Experience;