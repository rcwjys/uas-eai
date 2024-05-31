// routes/aspirationAddressRouter.js
import express from 'express';
import { tryCatch } from '../utils/tryCatch.js';
import {
  getAllAspirationAddresses,
  getAspirationAddressById,
  createAspirationAddress,
  updateAspirationAddress,
  deleteAspirationAddress,
} from '../controllers/aspirationAddressController.js';

const router = express.Router();

router.get('/api/v1/aspiration-addresses', tryCatch(getAllAspirationAddresses));
router.get('/api/v1/aspiration-addresses/:id', tryCatch(getAspirationAddressById));
router.post('/api/v1/aspiration-addresses', tryCatch(createAspirationAddress));
router.patch('/api/v1/aspiration-addresses/:id', tryCatch(updateAspirationAddress));
router.delete('/api/v1/aspiration-addresses/:id', tryCatch(deleteAspirationAddress));

export { router as aspirationAddressRouter };

