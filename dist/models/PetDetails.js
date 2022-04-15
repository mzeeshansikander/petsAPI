"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PetDetails = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your pet name'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Plese enter your pet type'],
        trim: true
    },
    ownerName: {
        type: String,
        required: [true, "Please enter owner's name"],
        trim: true
    },
    ownerAddress: {
        type: String,
        required: [true, "Please provide owner's address"],
        trim: true
    },
    ownerPhoneNumber: {
        type: String,
        required: [true, "Please provide owner's phone number"]
    }
});
module.exports = mongoose_1.default.model("PetDetails", PetDetails);
