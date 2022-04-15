"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TypeAmount = new mongoose_1.default.Schema({
    type: {
        type: String,
        required: [true, "Please provide type"],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, "Please provide amount"]
    }
});
module.exports = mongoose_1.default.model("TypeAmount", TypeAmount);
