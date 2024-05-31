import express from 'express';
import { tryCatch } from '../utils/tryCatch.js';
import { 
  deleteCandidate, 
  getCandidate, 
  getCandidateDetail, 
  storeCandidate, 
  updateCandidate } from '../controllers/candidateController.js';



const candidateRouter = express.Router();

candidateRouter.get('/api/v1/candidates', tryCatch(getCandidate));

candidateRouter.get('/api/v1/candidates/:candidate_name', tryCatch(getCandidateDetail));

candidateRouter.post('/api/v1/candidates', tryCatch(storeCandidate));

candidateRouter.patch('/api/v1/candidates/:id', tryCatch(updateCandidate));

candidateRouter.delete('/api/v1/candidates/:id', tryCatch(deleteCandidate))

export { candidateRouter };
