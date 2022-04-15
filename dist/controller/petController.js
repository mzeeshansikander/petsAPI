"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMostPopularPet = exports.deletePatient = exports.updatePatient = exports.getPatients = exports.addPatient = void 0;
// import PatientDetails from '../models/patientDetails'
const PatientDetails = require("../models/petModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const addPatient = catchAsyncErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const duplicatePatient = yield PatientDetails.find({
        ownerPhoneNumber: req.body.ownerPhoneNumber,
    });
    try {
        if (duplicatePatient.length === 0) {
            const patient = yield PatientDetails.create(req.body);
            res.status(200).json({
                success: true,
                message: "Patient added successfully.",
                patient,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Phone number already exists!",
            });
        }
    }
    catch (error) {
        res.send(error.message);
    }
}));
exports.addPatient = addPatient;
const getPatients = catchAsyncErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield PatientDetails.find();
        if (patients) {
            return res.status(200).json({
                success: true,
                message: "Patients fetched successfully",
                patients,
            });
        }
        else {
            res.send("No patient exists!");
        }
    }
    catch (err) {
        res.send(err.message);
    }
}));
exports.getPatients = getPatients;
const updatePatient = catchAsyncErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let patient = yield PatientDetails.findById(req.params.id);
        if (!patient) {
            return res.status(500).json({
                success: false,
                message: "Patient not found.",
            });
        }
        patient = yield PatientDetails.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(200).json({
            success: true,
            message: "Patient details updated successfully",
            patient,
        });
    }
    catch (error) {
        if (error.name === "CastError") {
            res.send(`${req.params.id} not found!`);
        }
    }
}));
exports.updatePatient = updatePatient;
const deletePatient = catchAsyncErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let patient = yield PatientDetails.findById(req.params.id);
        if (!patient) {
            return res.status(500).json({
                success: false,
                message: "Patient not found.",
            });
        }
        yield patient.remove();
        res.status(200).json({
            success: true,
            message: "Patient Deleted Successfully",
        });
    }
    catch (error) {
        if (error.name === "CastError") {
            res.send(`${req.params.id} not found!`);
        }
    }
}));
exports.deletePatient = deletePatient;
const getMostPopularPet = catchAsyncErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const popularType = yield PatientDetails.aggregate([
            { $group: { _id: { name: "$type" }, count: { $sum: 1 } } },
            { $group: { _id: "$_id.name", count: { $max: "$count" } } },
            { $sort: { count: -1 } },
        ]);
        if (popularType) {
            res.send(popularType[0]._id);
        }
    }
    catch (e) {
        res.send(e.message);
    }
}));
exports.getMostPopularPet = getMostPopularPet;
