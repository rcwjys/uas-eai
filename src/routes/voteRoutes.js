import express from 'express';
import { tryCatch } from '../utils/tryCatch.js';
import { deleteVotes, getDetailsVotes, getVotes, storeVotes } from '../controllers/voteController.js';
import { isAdmin } from '../../middleware/adminMiddleware.js';

const voteRouter = express.Router();

voteRouter.get('/api/v1/votes',tryCatch(isAdmin), tryCatch(getVotes));

voteRouter.get('/api/v1/votes/:id',tryCatch(isAdmin), tryCatch(getDetailsVotes));

voteRouter.post('/api/v1/votes', tryCatch(storeVotes));

voteRouter.delete('/api/v1/votes/:id', tryCatch(isAdmin), tryCatch(deleteVotes));

export {voteRouter};