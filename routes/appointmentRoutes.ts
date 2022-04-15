import express from 'express'
const router = express.Router()
import {addAppointment,getAppointments,updateAppointment,deleteAppointment,getUnpaidAppointments, getPatientRemainingBill,getDayAppointments} from '../controller/appointmentsController'

// add an appointment
router.route('/appointments/new').post(addAppointment)

// get all appointments for specific patient
router.route('/pets/:id/appointments').get(getAppointments)

// update an appointment
router.route('/appointments/:id').put(updateAppointment)

// delete an appointment
router.route('/appointments/:id').delete(deleteAppointment)

// get appointments for a specific day
router.route('/appointments/:date').get(getDayAppointments)

// get list of unpaid appointments
router.route('/appointments/unpaid').get(getUnpaidAppointments)

// get remaining bill for a specific patient
router.route('/pets/:id/bill').get(getPatientRemainingBill)

export default router