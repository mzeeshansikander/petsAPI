// import express from 'express'
import express from 'express'
const router = express.Router()
const {typeTotalAmount,getWeeklyPaidAmount,getWeeklyUnpaidAmount,getMonthlyPaidAmount,getMonthlyUnpaidAmount,getHospitalBalance} = require('../controller/hospitalController')

//get weekly and monthly amount paid, unpaid and balance of hospital in $
router.route('/hospital/amountDetails').get(typeTotalAmount)

// get weekly paid amount
router.route('/hospital/amount/weekly/paid/:date').get(getWeeklyPaidAmount)

// get weekly unpaid amount
router.route('/hospital/amount/weekly/unpaid/:date').get(getWeeklyUnpaidAmount)

// get monthly paid amount
router.route('/hospital/amount/monthly/paid/:date').get(getMonthlyPaidAmount)

// get monthly unpaid amount
router.route('/hospital/amount/monthly/unpaid/:date').get(getMonthlyUnpaidAmount)

// get hospital balance
router.route('/hospital/balance').get(getHospitalBalance)

export default router