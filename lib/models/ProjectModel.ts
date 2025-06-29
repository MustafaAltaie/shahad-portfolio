import { Schema, models, model } from 'mongoose';
import { ProjectType } from '../../types/Projects';

const projectSchema = new Schema<ProjectType>({
    id: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    isProfessional: { type: Boolean, default: false },
    techList: { type: [String] },
    link: { type: String },
});

const Project = models.Project || model('Project', projectSchema);

export default Project;