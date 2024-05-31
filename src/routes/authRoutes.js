
import express from 'express';

import { login, logout, register } from '../controllers/authController.js';
import { tryCatch } from '../utils/tryCatch.js';


const router = express.Router();


router.post('/api/v1/users/register', tryCatch(register));

router.post('/api/v1/users/login', tryCatch(login));

router.get('/api/v1/users/logout', tryCatch(logout));


export { router as authRoutes };