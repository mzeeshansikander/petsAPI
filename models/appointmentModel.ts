import mongoose from "mongoose";

const AppointmentModel = new mongoose.Schema({
    startTime: {
        type:Date,
        required:[true,"Please provide start time"],
        trim:true
    },
    endTime: {
        type:Date,
        required:[true,"Please provide end time"],
        trim:true
    },
    description: {
        type:String,
        required:[true,"Please provide description"],
        trim:true
    },
    feeType: {
        type: String,
        required:[true,"Please provide fee type"],
        trim:true
    },
    amount: {
        type:Number,
        required:[true,"Please provide amount"],
    },
    amountStatus:{
        type: String,
        required:[true,"Please provide amount status paid/unpaid"]
    },
    patient_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientDetails',
        required:true
    },
    createdAt:{
        type: String,
        trim:true
    }
})

module.exports = mongoose.model('AppointmentModel',AppointmentModel)