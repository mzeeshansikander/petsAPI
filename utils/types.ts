interface AppointmentInt{
  startTime:Date,
  endTime:Date,
  description:string,
  feeType:string,
  amount:number,
  amountStatus:string,
  patient_id:string
}

interface PatientInt {
  name: string,
  type: string,
  ownerName: string,
  ownerAddress: string,
  ownerPhoneNumber: string,
}

interface TypeAmountInt{
  type: string,
  amount: number,
  totalAmount: number,
  _id:{
    type: string
  }
}

export {AppointmentInt,PatientInt,TypeAmountInt}