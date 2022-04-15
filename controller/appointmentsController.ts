const AppointmentModel = require("../models/appointmentModel");
const PetModel = require("../models/petModel");
const TypeAmount = require("../models/typeAmountModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
import { Request, Response } from "express";
import { AppointmentInt } from "../utils/types";

const addAppointment = catchAsyncErrors(async (req: Request, res: Response) => {
  const { amount, patient_id } = req.body;

  try {
    const targetPet = await PetModel.findById(patient_id);
    const data = {
      type: targetPet.type,
      amount,
    };
    if (targetPet) {
      await TypeAmount.create(data);
    }
    const appointment = await AppointmentModel.create({
      ...req.body,
      createdAt: Math.round(new Date().getTime() / 1000),
    });
    res.status(200).json({
      success: true,
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error: any) {
    res.send(error.message);
  }
});

const getAppointments = catchAsyncErrors(
  async (req: Request, res: Response) => {
    try {
      const petAppointments = await AppointmentModel.find({
        patient_id: req.params.id,
      });
      if (!petAppointments) {
        return res.status(500).json({
          success: false,
          message: `No appointments found for ${req.params.id}.`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "List of patients",
          petAppointments,
        });
      }
    } catch (error: any) {
      res.send(error.message);
    }
  }
);

const updateAppointment = catchAsyncErrors(
  async (req: Request, res: Response) => {
    try {
      let appointment = await AppointmentModel.findById(req.params.id);
      if (!appointment) {
        return res.status(500).json({
          success: false,
          message: "Appointment not found.",
        });
      }

      appointment = await AppointmentModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );

      res.status(200).json({
        success: true,
        message: "Patient details updated successfully",
        appointment,
      });
    } catch (error: any) {
      res.send(error.message);
    }
  }
);

const deleteAppointment = catchAsyncErrors(
  async (req: Request, res: Response) => {
    try {
      let appointment = await AppointmentModel.findById(req.params.id);

      if (!appointment) {
        return res.status(500).json({
          success: false,
          message: "Appointment not found.",
        });
      }

      await appointment.remove();
      res.status(200).json({
        success: true,
        message: "Appointment Deleted Successfully",
      });
    } catch (error: any) {
      res.send(error.message);
    }
  }
);

const getUnpaidAppointments = catchAsyncErrors(
  async (req: Request, res: Response) => {
    try {
      const unpaidAppointments = await AppointmentModel.find({
        amountStatus: "unpaid",
      });

      if (!unpaidAppointments) {
        return res.status(500).json({
          success: false,
          message: "No unpaid appointment found.",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "List of unpaid appointments.",
          unpaidAppointments,
        });
      }
    } catch (error: any) {
      res.send(error.message);
    }
  }
);

const getPatientRemainingBill = catchAsyncErrors(
  async (req: Request, res: Response) => {
    try {
      const bills = await AppointmentModel.find({
        patient_id: req.params.id,
        amountStatus: "unpaid",
      });
      let amount = 0;

      if (!bills) {
        return res.status(500).json({
          success: false,
          message: `Remaining bill = 0`,
        });
      } else {
        bills.map((bill: AppointmentInt) => {
          amount += bill.amount;
        });

        res.status(200).json({
          success: true,
          message: `Remaing bill = ${amount}`,
        });
      }
    } catch (error: any) {
      res.send(error.message);
    }
  }
);

const getDayAppointments = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const date = new Date(req.params.date);
    const upperDate = new Date(date.setDate(date.getDate() + 1));

    try {
      const appointments = await AppointmentModel.find({
        startTime: { $gte: req.params.date },
        endTime: { $lt: upperDate.toISOString().slice(0, 10) },
      });
      if (appointments) {
        res.send(appointments);
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

export {
  addAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  getUnpaidAppointments,
  getPatientRemainingBill,
  getDayAppointments,
};
