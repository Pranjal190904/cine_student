import { Router } from "express";
const router = Router();
import authController from '../controllers/auth.controller'
import testController  from '../controllers/test.controller'
import feedbackController from '../controllers/feedback.controller'
import auth from '../middleware/auth.middleware'

router.post('/login',authController.login);
router.post('/response',auth,testController.response);
router.post('/preferences',auth,testController.preferences);
router.get('/questions', auth, testController.getQuestions);
router.get('/getPreference',auth, testController.getPreference); 
router.get('/feedbackQuestions',auth,feedbackController.feedbackQuestions);
router.post('/submitFeedback',auth,feedbackController.submitFeedback);
router.get('/getResponses',auth,testController.getResponses);
router.get('/timeRemaining',auth,testController.getTime);
router.post('/submitTest',auth,testController.submitTest);

export default router;