import { Schema, models, model } from "mongoose";
import moment from "moment";


const PatientSchema = new Schema({
    patientid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true,
       
    },
    phone: {
        type: Number,
        required: true
    },
    phone2: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    treatment: {
        type: String,
        required: true
    }
}, {
    timestamps: true // This will add createdAt and updatedAt fields
});



const PatientModel = models.Patient || model('Patient', PatientSchema);

export default PatientModel;
