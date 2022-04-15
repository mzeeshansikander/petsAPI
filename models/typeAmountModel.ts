import mongoose from "mongoose";

const TypeAmount = new mongoose.Schema({
    type:{
        type:String,
        required:[true,"Please provide type"],
        trim: true
    },
    amount:{
        type: Number,
        required:[true,"Please provide amount"]
    }
})

module.exports = mongoose.model("TypeAmount",TypeAmount)