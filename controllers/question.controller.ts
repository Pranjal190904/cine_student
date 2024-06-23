import { Request, Response } from "express";    
import QuestionModel from "../models/question.model";

export const getQuestions = async (req: Request, res: Response): Promise<Response> => { 
    try {
        const { subject } =  req.query ; 
        const questions = await QuestionModel.find({ subject });
        return res.status(200).json(questions);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}