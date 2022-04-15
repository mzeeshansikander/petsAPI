"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const petController_1 = require("../controller/petController");
const router = express_1.default.Router();
// add patient
router.route('/pets/new').post(petController_1.addPatient);
// get all patients 
router.route('/pets').get(petController_1.getPatients);
// update a patient
router.route('/pets/:id').put(petController_1.updatePatient);
// delete a patient
router.route('/pets/:id').delete(petController_1.deletePatient);
exports.default = router;
