import { Router } from "express";
const router = Router();
import auth from '../middleware/auth.middleware';
import { getQuestions } from "../controllers/question.controller";

router.get("/questions", auth, getQuestions  ); 


export default router;