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
exports.getDayAppointments = exports.getPatientRemainingBill = exports.getUnpaidAppointments = exports.deleteAppointment = exports.updateAppointment = exports.getAppointments = exports.addAppointment = void 0;
const AppointmentModel = require("../models/appointmentModel");
const PetModel = require("../models/petModel");
const TypeAmount = require("../models/typeAmountModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const addAppointment = catchAsyncErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, patient_id } = req.body;
    try {
        const targetPet = yield PetModel.findById(patient_id);
        const data = {
            type: targetPet.type,
            amount,
        };
        if (targetPet) {
            yield TypeAmount.create(data);
        }
        const appointment = yield AppointmentModel.create(Object.assign(Object.assign({}, req.body), { createdAt: Math.round(new Date().getTime() / 1000) }));
        res.status(200).json({
            success: true,
            message: "Appointment created successfully",
            appointment,
        });
    }
    catch (error) {
        res.send(error.message);
    }
}));
exports.addAppointment = addAppointment;
const getAppointments = catchAsyncErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const petAppointments = yield AppointmentModel.find({
            patient_id: req.params.id,
        });
        if (!petAppointments) {
            return res.status(500).json({
                success: false,
                message: `No appointments found for ${req.params.id}.`,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "List of patients",
                petAppointments,
            });
        }
    }
    catch (error) {
        res.send(error.message);
    }
}));
exports.getAppointments = getAppointments;
const updateAppointment = catchAsyncErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let appointment = yield AppointmentModel.findById(req.params.id);
        if (!appointment) {
            return res.status(500).json({
                success: false,
                message: "Appointment not found.",
            });
        }
        appointment = yield AppointmentModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(200).json({
            success: true,
            message: "Patient details updated successfully",
            appointment,
        });
    }
    catch (error) {
        res.send(error.message);
    }
}));
exports.updateAppointment = updateAppointment;
const deleteAppointment = catchAsyncErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let appointment = yield AppointmentModel.findById(req.params.id);
        if (!appointment) {
            return res.status(500).json({
                success: false,
                message: "Appointment not found.",
            });
        }
        yield appointment.remove();
        res.status(200).json({
            success: true,
            message: "Appointment Deleted Successfully",
        });
    }
    catch (error) {
        res.send(error.message);
    }
}));
exports.deleteAppointment = deleteAppointment;
const getUnpaidAppointments = catchAsyncErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unpaidAppointments = yield AppointmentModel.find({
            amountStatus: "unpaid",
        });
        if (!unpaidAppointments) {
            return res.status(500).json({
                success: false,
                message: "No unpaid appointment found.",
            });
        }
        else {
            return res.status(200).json({
                success: true,
                message: "List of unpaid appointments.",
                unpaidAppointments,
            });
        }
    }
    catch (error) {
        res.send(error.message);
    }
}));
exports.getUnpaidAppointments = getUnpaidAppointments;
const getPatientRemainingBill = catchAsyncErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bills = yield AppointmentModel.find({
            patient_id: req.params.id,
            amountStatus: "unpaid",
        });
        let amount = 0;
        if (!bills) {
            return res.status(500).json({
                success: false,
                message: `Remaining bill = 0`,
            });
        }
        else {
            bills.map((bill) => {
                amount += bill.amount;
            });
            res.status(200).json({
                success: true,
                message: `Remaing bill = ${amount}`,
            });
        }
    }
    catch (error) {
        res.send(error.message);
    }
}));
exports.getPatientRemainingBill = getPatientRemainingBill;
const getDayAppointments = catchAsyncErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date(req.params.date);
    const upperDate = new Date(date.setDate(date.getDate() + 1));
    try {
        const appointments = yield AppointmentModel.find({
            startTime: { $gte: req.params.date },
            endTime: { $lt: upperDate.toISOString().slice(0, 10) },
        });
        if (appointments) {
            res.send(appointments);
        }
        else {
            res.status(500).json({
                success: false,
                message: "something went wrong",
            });
        }
    }
    catch (error) {
        res.send(error.message);
    }
}));
exports.getDayAppointments = getDayAppointments;
