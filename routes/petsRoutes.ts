import express from 'express'
const {addPatient,getPatients,updatePatient,deletePatient,getMostPopularPet} = require( '../controller/petController')
const router = express.Router()

// add patient
router.route('/pets/new').post(addPatient)

// get all patients 
router.route('/pets').get(getPatients)

// update a patient
router.route('/pets/:id').put(updatePatient)

// delete a patient
router.route('/pets/:id').delete(deletePatient)

// get popular pet
router.route('/pets/popular').get(getMostPopularPet)

export default router
