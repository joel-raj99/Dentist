import { Schema,models,model } from "mongoose";

const clinicSchema= new Schema ({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    location:{
        type:String,
        required:true
    },
    website:{
        type:String,
        required:true
    },
    city:
    {type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    phone1:{
        type:Number,
        required:true
    },
    phone2:{
        type:Number,
        required:true
    },
    // other info
treatment:{
    type:Number,
    required:true
},
procedure:{type:Number,
    required:true
},
diagnosis:{
    type:Number,
    required:true
},
info:{
    type:String,
    required:true
}
},
{
    timestamps:true
}

)

const ClinicModel = models.clinic || model('clinic', clinicSchema);

export default ClinicModel;