import express from 'express';
import { isAdmin } from '../../middleware/adminMiddleware.js';
import { tryCatch } from '../utils/tryCatch.js';
import {
    getAllAspiration,
    getAspirationById,
    createAspiration,
    updateAspiration,
    updateAspirationStatus,
    deleteAspiration,
    getAspirationByName,
    
    
} from '../controllers/aspirationController.js';
import { authenticate } from '../../middleware/authenticateMiddleware.js';



const router = express.Router();

router.get('/api/v1/aspiration', tryCatch(authenticate), tryCatch(getAllAspiration));
router.get('/api/v1/aspiration/:id', tryCatch(getAspirationById));
router.post('/api/v1/aspiration/create', tryCatch(authenticate), tryCatch(createAspiration));
router.patch('/api/v1/aspiration/:id', tryCatch(updateAspiration));
router.patch('/api/v1/aspiration/status/:id',tryCatch(isAdmin), tryCatch(updateAspirationStatus));
router.delete('/api/v1/aspiration/:id', tryCatch(deleteAspiration));
router.get('/api/v1/aspiration/user/:username', tryCatch(getAspirationByName));

export { router as aspirationRouter };