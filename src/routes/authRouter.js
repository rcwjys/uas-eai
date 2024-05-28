import express from 'express';

import { register } from '../controllers/authController.js';
import { tryCatch } from '../utils/tryCatch.js';


const router = express.Router();


router.post('/api/v1/users/register', tryCatch(register));


export { router as authRouter };