import express from 'express';
import { tryCatch } from '../utils/tryCatch.js';
import { deleteVotes, getDetailsVotes, getVotes, storeVotes } from '../controllers/voteController.js';

const voteRouter = express.Router();

voteRouter.get('/api/v1/votes',  tryCatch(getVotes));

voteRouter.get('/api/v1/votes/:id', tryCatch(getDetailsVotes));

voteRouter.post('/api/v1/votes', tryCatch(storeVotes));

voteRouter.delete('/api/v1/votes/:id', tryCatch(deleteVotes));


export {voteRouter};