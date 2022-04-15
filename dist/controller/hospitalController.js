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
exports.getHospitalBalance = exports.getMonthlyUnpaidAmount = exports.getMonthlyPaidAmount = exports.getWeeklyUnpaidAmount = exports.getWeeklyPaidAmount = exports.typeTotalAmount = void 0;
const AppointmentModel = require("../models/appointmentModel");
const TypeAmount = require("../models/typeAmountModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const typeTotalAmount = catchAsyncErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typeAmount = yield TypeAmount.aggregate([
            {
                $group: { _id: { type: "$type" }, totalAmount: { $sum: "$amount" } },
            },
        ]);
        let data = [];
        typeAmount.map((type) => {
            data.push({ type: type._id.type, totalAmount: type.totalAmount });
        });
        if (data) {
            res.status(200).json({
                success: true,
                data,
            });
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
exports.typeTotalAmount = typeTotalAmount;
const getWeeklyPaidAmount = catchAsyncErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date(req.params.date);
    const lowerDate = new Date(date.setDate(date.getDate() - 6));
    let totalAmount = 0;
    try {
        const paidPatients = yield AppointmentModel.find({
            amountStatus: "paid",
            startTime: { $lte: req.params.date },
            endTime: { $gte: lowerDate.toISOString().slice(0, 10) },
        });
        if (paidPatients) {
            paidPatients.map((p) => {
                totalAmount += p.amount;
            });
            res.status(200).json({
                success: true,
                totalAmount,
            });
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
exports.getWeeklyPaidAmount = getWeeklyPaidAmount;
const getWeeklyUnpaidAmount = catchAsyncErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date(req.params.date);
    const lowerDate = new Date(date.setDate(date.getDate() - 6));
    let totalAmount = 0;
    try {
        const unPaidPatients = yield AppointmentModel.find({
            amountStatus: "unpaid",
            startTime: { $lte: req.params.date },
            endTime: { $gte: lowerDate.toISOString().slice(0, 10) },
        });
        if (unPaidPatients) {
            unPaidPatients.map((p) => {
                totalAmount += p.amount;
            });
            res.status(200).json({
                success: true,
                totalAmount,
            });
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
exports.getWeeklyUnpaidAmount = getWeeklyUnpaidAmount;
const getMonthlyPaidAmount = catchAsyncErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const year = new Date(req.params.date).toISOString().slice(0, 4);
    const month = new Date(req.params.date).toISOString().slice(5, 7);
    let totalAmount = 0;
    try {
        const paidPatients = yield AppointmentModel.find({
            $and: [
                { $expr: { $eq: [{ $year: "$startTime" }, year] } } && {
                    $expr: { $eq: [{ $month: "$startTime" }, month] },
                },
                { amountStatus: { $eq: "paid" } },
            ],
        });
        if (paidPatients) {
            paidPatients.map((p) => {
                totalAmount += p.amount;
            });
            res.status(200).json({
                success: true,
                totalAmount,
            });
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
exports.getMonthlyPaidAmount = getMonthlyPaidAmount;
const getMonthlyUnpaidAmount = catchAsyncErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const year = new Date(req.params.date).toISOString().slice(0, 4);
    const month = new Date(req.params.date).toISOString().slice(5, 7);
    let totalAmount = 0;
    try {
        const unPaidPatients = yield AppointmentModel.find({
            $and: [
                { $expr: { $eq: [{ $year: "$startTime" }, year] } } && {
                    $expr: { $eq: [{ $month: "$startTime" }, month] },
                },
                { amountStatus: { $eq: "unpaid" } },
            ],
        });
        if (unPaidPatients) {
            unPaidPatients.map((p) => {
                totalAmount += p.amount;
            });
            res.status(200).json({
                success: true,
                totalAmount,
            });
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
exports.getMonthlyUnpaidAmount = getMonthlyUnpaidAmount;
const getHospitalBalance = catchAsyncErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let balance = 0;
    try {
        const unpaidAppointments = yield AppointmentModel.find({
            amountStatus: "unpaid",
        });
        if (unpaidAppointments) {
            unpaidAppointments.map((a) => {
                balance += a.amount;
            });
            res.status(200).json({
                success: true,
                balance,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "something went wrong.",
            });
        }
    }
    catch (error) {
        res.send(error.message);
    }
}));
exports.getHospitalBalance = getHospitalBalance;
