import { Schema, models, model } from "mongoose";



const AppointmentSchema = new Schema({
   patientId: {
        type: String,
        required: true,
        
    },
    name: {
        type: String,
        required: true
    },
  
    appointmentDate: {
        type: Date,
        required: true,
       
    },
    doctorName: {
        type: String,
        required: true
    },
    treatment: {
        type: String,
        required: true
    },
    
}, {
    timestamps: true // This will add createdAt and updatedAt fields
});



const AppointmentModel = models.Appointment || model('Appointment', AppointmentSchema);

export default AppointmentModel;
