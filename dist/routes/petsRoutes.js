"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { addPatient, getPatients, updatePatient, deletePatient, getMostPopularPet } = require('../controller/petController');
const router = express_1.default.Router();
// add patient
router.route('/pets/new').post(addPatient);
// get all patients 
router.route('/pets').get(getPatients);
// update a patient
router.route('/pets/:id').put(updatePatient);
// delete a patient
router.route('/pets/:id').delete(deletePatient);
// get popular pet
router.route('/pets/popular').get(getMostPopularPet);
exports.default = router;
