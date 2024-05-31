import express from 'express';
import dotenv from 'dotenv';
import { votesRouter } from './src/routes/votesRouter.js';
import { errorHandler } from './src/utils/errorHandler.js';
import { aspirationAddressRouter } from './src/routes/aspirationAddressRouter.js';
import { aspirationRouter } from './src/routes/aspirationRouter.js';

const app = express();

dotenv.config();

app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use(votesRouter);
app.use(aspirationAddressRouter);
app.use(aspirationRouter);


app.use(errorHandler);


app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});