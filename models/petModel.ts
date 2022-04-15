import mongoose from "mongoose";

const patientDetails = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your pet name'],
        trim:true
    },
    type:{
        type: String,
        required:[true,'Plese enter your pet type'],
        trim:true
    },
    ownerName:{
        type:String,
        required:[true,"Please enter owner's name"],
        trim:true
    },
    ownerAddress:{
        type: String,
        required: [true,"Please provide owner's address"],
        trim:true
    },
    ownerPhoneNumber:{
        type: String,
        required: [true, "Please provide owner's phone number"]
    }
})

module.exports = mongoose.model("PatientDetails", patientDetails)