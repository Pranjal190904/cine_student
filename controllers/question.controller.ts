import { Request, Response } from "express";
import QuestionModel from "../models/question.model";
import ActivityModel from "../models/activity.model";

interface AuthenticatedRequest extends Request {
    userId?: string;
}

export const getQuestions = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    try {
        const { subject } = req.query;
        const userId = req.userId;

        if (!subject || !userId) {
            return res.status(400).json({ message: "Subject and user ID are required" });
        }

        const activity = await ActivityModel.findOne({ userId }).exec();

        let questions;

        if (activity) {
            const orderForSubject = activity.order.find(order => order.subject === subject);
            if (orderForSubject) {
                questions = await QuestionModel.find({ quesId: { $in: orderForSubject.order } }).exec();
                questions = questions.sort((a, b) => orderForSubject.order.indexOf(a.quesId) - orderForSubject.order.indexOf(b.quesId));
                return res.status(200).json(questions);
            }
        }

        questions = await QuestionModel.find({ subject }).exec();
        const questionOrder = questions.map(q => q.quesId);
        if (activity) {
            activity.order.push({ subject: subject as string, order: questionOrder });
            await activity.save();
        } 
        // else {
        //     await ActivityModel.create({
        //         userId,
        //         firstLoginTime: new Date(),  
        //         preferredLanguage: 'c++',     
        //         lastVisited: new Date(),
        //         order: [{ subject: subject as string, order: questionOrder }]
        //     });
        // }

        return res.status(200).json(questions);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
