const AppointmentModel = require("../models/appointmentModel");
const TypeAmount = require("../models/typeAmountModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
import { Request, Response } from "express";
import { AppointmentInt, TypeAmountInt } from "../utils/types";

const typeTotalAmount = catchAsyncErrors(
  async (req: Request, res: Response) => {
    try {
      const typeAmount = await TypeAmount.aggregate([
        {
          $group: { _id: { type: "$type" }, totalAmount: { $sum: "$amount" } },
        },
      ]);
      let data: any = [];
      typeAmount.map((type: TypeAmountInt) => {
        data.push({ type: type._id.type, totalAmount: type.totalAmount });
      });
      if (data) {
        res.status(200).json({
          success: true,
          data,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "something went wrong",
        });
      }
    } catch (error: any) {
      res.send(error.message);
    }
  }
);

const getWeeklyPaidAmount = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const date = new Date(req.params.date);
    const lowerDate = new Date(date.setDate(date.getDate() - 6));
    let totalAmount = 0;
    try {
      const paidPatients = await AppointmentModel.find({
        amountStatus: "paid",
        startTime: { $lte: req.params.date },
        endTime: { $gte: lowerDate.toISOString().slice(0, 10) },
      });
      if (paidPatients) {
        paidPatients.map((p: AppointmentInt) => {
          totalAmount += p.amount;
        });
        res.status(200).json({
          success: true,
          totalAmount,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "something went wrong",
        });
      }
    } catch (error: any) {
      res.send(error.message);
    }
  }
);

const getWeeklyUnpaidAmount = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const date = new Date(req.params.date);
    const lowerDate = new Date(date.setDate(date.getDate() - 6));
    let totalAmount = 0;
    try {
      const unPaidPatients = await AppointmentModel.find({
        amountStatus: "unpaid",
        startTime: { $lte: req.params.date },
        endTime: { $gte: lowerDate.toISOString().slice(0, 10) },
      });
      if (unPaidPatients) {
        unPaidPatients.map((p: AppointmentInt) => {
          totalAmount += p.amount;
        });
        res.status(200).json({
          success: true,
          totalAmount,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "something went wrong",
        });
      }
    } catch (error: any) {
      res.send(error.message);
    }
  }
);

const getMonthlyPaidAmount = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const year = new Date(req.params.date).toISOString().slice(0, 4);
    const month = new Date(req.params.date).toISOString().slice(5, 7);
    let totalAmount = 0;

    try {
      const paidPatients = await AppointmentModel.find({
        $and: [
          { $expr: { $eq: [{ $year: "$startTime" }, year] } } && {
            $expr: { $eq: [{ $month: "$startTime" }, month] },
          },
          { amountStatus: { $eq: "paid" } },
        ],
      });
      if (paidPatients) {
        paidPatients.map((p: AppointmentInt) => {
          totalAmount += p.amount;
        });
        res.status(200).json({
          success: true,
          totalAmount,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "something went wrong",
        });
      }
    } catch (error: any) {
      res.send(error.message);
    }
  }
);

const getMonthlyUnpaidAmount = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const year = new Date(req.params.date).toISOString().slice(0, 4);
    const month = new Date(req.params.date).toISOString().slice(5, 7);
    let totalAmount = 0;

    try {
      const unPaidPatients = await AppointmentModel.find({
        $and: [
          { $expr: { $eq: [{ $year: "$startTime" }, year] } } && {
            $expr: { $eq: [{ $month: "$startTime" }, month] },
          },
          { amountStatus: { $eq: "unpaid" } },
        ],
      });
      if (unPaidPatients) {
        unPaidPatients.map((p: AppointmentInt) => {
          totalAmount += p.amount;
        });
        res.status(200).json({
          success: true,
          totalAmount,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "something went wrong",
        });
      }
    } catch (error: any) {
      res.send(error.message);
    }
  }
);

const getHospitalBalance = catchAsyncErrors(
  async (req: Request, res: Response) => {
    let balance = 0;
    try {
      const unpaidAppointments = await AppointmentModel.find({
        amountStatus: "unpaid",
      });
      if (unpaidAppointments) {
        unpaidAppointments.map((a: AppointmentInt) => {
          balance += a.amount;
        });
        res.status(200).json({
          success: true,
          balance,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "something went wrong.",
        });
      }
    } catch (error: any) {
      res.send(error.message);
    }
  }
);

export {
  typeTotalAmount,
  getWeeklyPaidAmount,
  getWeeklyUnpaidAmount,
  getMonthlyPaidAmount,
  getMonthlyUnpaidAmount,
  getHospitalBalance,
};
