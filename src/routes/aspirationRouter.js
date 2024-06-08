import express from 'express';
import { authenticate } from '../../middleware/authenticateMiddleware.js';
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
    getAspirationByUserId,
    getUserbyId,
    
    
} from '../controllers/aspirationController.js';



const router = express.Router();

router.get('/api/v1/aspiration', tryCatch(getAllAspiration));
router.get('/api/v1/aspiration/:id', tryCatch(getAspirationById));
router.post('/api/v1/aspiration/create', tryCatch(authenticate), tryCatch(createAspiration));
router.patch('/api/v1/aspiration/:id', tryCatch(updateAspiration));
router.patch('/api/v1/aspiration/status/:id',tryCatch(isAdmin), tryCatch(updateAspirationStatus));
router.delete('/api/v1/aspiration/:id', tryCatch(deleteAspiration));
router.get('/api/v1/aspiration/user/:username', tryCatch(getAspirationByName));
router.get('/api/v1/aspiration/userId/:user_id', tryCatch(getAspirationByUserId));
router.get('/api/v1/userId/:user_id', tryCatch(getUserbyId));

export { router as aspirationRouter };