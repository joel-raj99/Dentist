import { Schema, models, model } from "mongoose";

const clinicSchema = new Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    clinicLogo: String,
    additionalLogo: String,
    location: String,
    website: String,
    email: { type: String, required: true },
    phone1: { type: String, required: true },
    phone2: String,
    address:String,
    city: String,
    state: String,
    zip: String,
    treatment: String,
    procedure: String,
    diagnosis: String,
    treatmentPrice: Number,
    procedurePrice: Number,
    diagnosisPrice: Number,
    introduction: String,
}, {
    timestamps: true
});

const ClinicModel = models.clinic || model('clinic', clinicSchema);

export default ClinicModel;
