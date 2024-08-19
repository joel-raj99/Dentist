import { Schema, models, model } from 'mongoose';

const adminprofileSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    Qualification: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    secondaryNumber:{
        type: Number,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dateofbirth: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    experienceList: [{
        company: { type: String, required: true },
        experience: { type: String, required: true },
        domain: { type: String, required: true }
    }],
    state: {
        type: String,
        required: true,
    },
   
}, {
    timestamps: true
});

const AdminProfileModel = models.Adminprofile || model('Adminprofile', adminprofileSchema);

export default AdminProfileModel;
