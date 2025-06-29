import { Schema, model, models } from 'mongoose';
import { EducationType } from '../../types/Educations';

const educationSchema = new Schema<EducationType>({
    location: { type: String },
    dateFrom: { type: String },
    dateTo: { type: String },
    school: { type: String },
    title: { type: String },
    description: { type: String },
    logoLink: { type: String },
    docLink: { type: String },
});

const Education = models.Education || model('Education', educationSchema);

export default Education;