import { Router } from "express";
const router = Router();
import auth from '../middleware/auth.middleware';

router.post('/login',auth , );


export default router;