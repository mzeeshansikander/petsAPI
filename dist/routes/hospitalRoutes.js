"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express'
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { typeTotalAmount, getWeeklyPaidAmount, getWeeklyUnpaidAmount, getMonthlyPaidAmount, getMonthlyUnpaidAmount, getHospitalBalance } = require('../controller/hospitalController');
//get weekly and monthly amount paid, unpaid and balance of hospital in $
router.route('/hospital/amountDetails').get(typeTotalAmount);
// get weekly paid amount
router.route('/hospital/amount/weekly/paid/:date').get(getWeeklyPaidAmount);
// get weekly unpaid amount
router.route('/hospital/amount/weekly/unpaid/:date').get(getWeeklyUnpaidAmount);
// get monthly paid amount
router.route('/hospital/amount/monthly/paid/:date').get(getMonthlyPaidAmount);
// get monthly unpaid amount
router.route('/hospital/amount/monthly/unpaid/:date').get(getMonthlyUnpaidAmount);
// get hospital balance
router.route('/hospital/balance').get(getHospitalBalance);
exports.default = router;
