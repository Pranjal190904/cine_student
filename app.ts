import express,{ Express } from "express";
import {PORT} from './config/env.config';
import connectDb from './config//db.config';
import cookieParser from 'cookie-parser';
import studentRoutes from './routes/student.routes';
const app: Express = express();

app.use(express.json());
app.use(cookieParser());
connectDb();
app.use('/student',studentRoutes);  

app.listen(PORT, ():void=> {
  console.log(`Server is running on port ${PORT}`);
});