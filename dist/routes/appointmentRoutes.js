"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const appointmentsController_1 = require("../controller/appointmentsController");
// add an appointment
router.route('/appointments/new').post(appointmentsController_1.addAppointment);
// get all appointments for specific patient
router.route('/pets/:id/appointments').get(appointmentsController_1.getAppointments);
// update an appointment
router.route('/appointments/:id').put(appointmentsController_1.updateAppointment);
// delete an appointment
router.route('/appointments/:id').delete(appointmentsController_1.deleteAppointment);
// get appointments for a specific day
router.route('/appointments/:date').get(appointmentsController_1.getDayAppointments);
// get list of unpaid appointments
router.route('/appointments/unpaid').get(appointmentsController_1.getUnpaidAppointments);
// get remaining bill for a specific patient
router.route('/pets/:id/bill').get(appointmentsController_1.getPatientRemainingBill);
exports.default = router;
