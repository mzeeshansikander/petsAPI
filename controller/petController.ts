import { Request, Response } from "express";

// import PatientDetails from '../models/patientDetails'
const PatientDetails = require("../models/petModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const addPatient = catchAsyncErrors(async (req: Request, res: Response) => {
  const duplicatePatient = await PatientDetails.find({
    ownerPhoneNumber: req.body.ownerPhoneNumber,
  });
  try {
    if (duplicatePatient.length === 0) {
      const patient = await PatientDetails.create(req.body);
      res.status(200).json({
        success: true,
        message: "Patient added successfully.",
        patient,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Phone number already exists!",
      });
    }
  } catch (error: any) {
    res.send(error.message);
  }
});

const getPatients = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    const patients = await PatientDetails.find();
    if (patients) {
      return res.status(200).json({
        success: true,
        message: "Patients fetched successfully",
        patients,
      });
    } else {
      res.send("No patient exists!");
    }
  } catch (err: any) {
    res.send(err.message);
  }
});

const updatePatient = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    let patient = await PatientDetails.findById(req.params.id);
    if (!patient) {
      return res.status(500).json({
        success: false,
        message: "Patient not found.",
      });
    }

    patient = await PatientDetails.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "Patient details updated successfully",
      patient,
    });
  } catch (error: any) {
    if (error.name === "CastError") {
      res.send(`${req.params.id} not found!`);
    }
  }
});

const deletePatient = catchAsyncErrors(async (req: Request, res: Response) => {
  try {
    let patient = await PatientDetails.findById(req.params.id);

    if (!patient) {
      return res.status(500).json({
        success: false,
        message: "Patient not found.",
      });
    }

    await patient.remove();
    res.status(200).json({
      success: true,
      message: "Patient Deleted Successfully",
    });
  } catch (error: any) {
    if (error.name === "CastError") {
      res.send(`${req.params.id} not found!`);
    }
  }
});

const getMostPopularPet = catchAsyncErrors(
  async (req: Request, res: Response) => {
    try{
        const popularType = await PatientDetails.aggregate([
            { $group: { _id: { name: "$type" }, count: { $sum: 1 } } },
            { $group: { _id: "$_id.name", count: { $max: "$count" } } },
            { $sort: { count: -1 } },
          ]);
          if (popularType) {
            res.send(popularType[0]._id);
          }
    }
    catch(e:any){
        res.send(e.message)
    }
  }
);

export {
  addPatient,
  getPatients,
  updatePatient,
  deletePatient,
  getMostPopularPet,
};
