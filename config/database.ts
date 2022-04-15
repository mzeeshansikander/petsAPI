import mongoose from "mongoose";

const connectDatabase = async() => {
  await mongoose
    .connect("mongodb://localhost:27017/hospitalData")
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    }).catch(e=>console.log('e',e));
};

export default connectDatabase