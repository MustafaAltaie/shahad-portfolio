import { Schema, model, models } from 'mongoose';

const profileSchema = new Schema({
    _id: { type: String, default: 'Singleton_profile_text_id' },
    profile: { type: String, required: true },
});

const Profile = models.Profile || model('Profile', profileSchema);

export default Profile;