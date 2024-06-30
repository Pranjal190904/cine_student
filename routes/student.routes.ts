import { Router } from "express";
const router = Router();
import authController from '../controllers/auth.controller'
import testController  from '../controllers/test.controller'
import auth from '../middleware/auth.middleware'

router.post('/login',authController.login);
router.post('/response',auth,testController.response);
router.post('/preferences',auth,testController.preferences);
router.get('/questions', auth , testController.getQuestions);
router.get('/getPreference', auth , testController.getPreference); 

export default router;