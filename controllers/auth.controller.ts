import StudentModel from "../models/student.model";
import { Request, Response } from 'express';
import Activity from "../models/activity.model";
import Token from '../middleware/token.middleware';

const authController={
    login: async(req:Request,res:Response):Promise<Response>=>{
        try{
            const {studentNumber,password}=req.body;
            const student=await StudentModel.findOne({studentNumber,password});
            if(!student)
            {
                return res.status(400).json({message:"Invalid credentials"});
            }
            const activity=await Activity.findOne({userId:student.id});
            if(activity && activity.isSubmitted)
            {
                return res.status(400).json({message:"Test already submitted"});
            }
            const token=await Token.signAccessToken(student.id);
            res.cookie('accessToken',token,{httpOnly:true,secure:true});
            await Activity.findOneAndUpdate({userId:student.id},{lastActivity:Date.now()});
            
            return res.status(200).json({message:"Login successful", userId : student.id  });
        }
        catch(error)
        {
            return res.status(500).json({message:"Internal server error"});
        }
    }
}

export default authController;