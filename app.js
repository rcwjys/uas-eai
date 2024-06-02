import express from 'express';
import dotenv from 'dotenv';
import { authRoutes } from './src/routes/authRoutes.js';
import { errorHandler } from './src/utils/errorHandler.js';
import { aspirationAddressRouter } from './src/routes/aspirationAddressRouter.js';
import { aspirationRouter } from './src/routes/aspirationRouter.js';
import { candidateRouter } from './src/routes/candidateRoutes.js';
import { voteRouter } from './src/routes/voteRoutes.js';
import { authenticate } from './middleware/authenticateMiddleware.js';
import { tryCatch } from './src/utils/tryCatch.js';


const app = express();

dotenv.config();

app.use(express.urlencoded({extended: false}));
app.use(express.json());



// app.use(votesRouter);
app.use(aspirationAddressRouter);
app.use(aspirationRouter);
app.use(authRoutes);


app.use(candidateRouter);

app.use(tryCatch(authenticate));

app.use(voteRouter);

app.use(errorHandler);


app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});