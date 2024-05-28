import express from 'express';
import dotenv from 'dotenv';
import { authRouter } from './src/routes/authRouter.js';
import { errorHandler } from './src/utils/errorHandler.js';

const app = express();

dotenv.config();

app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use(authRouter);


app.use(errorHandler);


app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});