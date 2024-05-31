import express from 'express';
import { tryCatch } from '../utils/tryCatch.js';
import { deleteVotes, getDetailsVotes, getVotes, storeVotes } from '../controllers/voteController.js';
import { authenticate } from '../../middleware/authenticateMiddleware.js';
import { isAdmin } from '../../middleware/adminMiddleware.js';

const voteRouter = express.Router();

voteRouter.get('/api/v1/votes',isAdmin, tryCatch(getVotes));

voteRouter.get('/api/v1/votes/:id',isAdmin, tryCatch(getDetailsVotes));

voteRouter.post('/api/v1/votes',tryCatch(storeVotes));

voteRouter.delete('/api/v1/votes/:id', isAdmin, tryCatch(deleteVotes));


export {voteRouter};