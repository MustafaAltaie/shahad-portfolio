import { Schema, models, model } from 'mongoose';
import { SocialObj } from '../../types/Footer';

const socialSchema = new Schema<SocialObj>({
    id: { type: String, default: 'singleton_footer_social_media' },
    linkedIn: { type: String },
    mobile: { type: String },
    email: { type: String },
});

const Social = models.Social || model('Social', socialSchema);

export default Social;