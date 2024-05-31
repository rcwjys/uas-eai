import express from 'express';
import { tryCatch } from '../utils/tryCatch.js';
import {
    getAllAspiration,
    createAspiration,
    
} from '../controllers/aspirationController.js';

const router = express.Router();

router.get('/api/v1/aspiration', tryCatch(getAllAspiration));
router.post('/api/v1/aspiration/create', tryCatch(createAspiration));

export { router as aspirationRouter };