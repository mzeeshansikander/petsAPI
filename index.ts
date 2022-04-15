import express, { Express } from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/database';

dotenv.config({path:'/.env'});

connectDatabase()

const app: Express = express();
const port = process.env.PORT || 3000;


// importing routes
import pet from './routes/petsRoutes'
import appointment from './routes/appointmentRoutes'
import hospital from './routes/hospitalRoutes'

// middlewares
app.use(express.json())

// using the imported routes
app.use('/',pet)
app.use('/',appointment)
app.use('/',hospital)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});