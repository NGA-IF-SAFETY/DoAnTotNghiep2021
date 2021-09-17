import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
// import cookieSession from 'cookie-session';
import {NotFoundError, currentUser } from '@ngatickets/common';

import { createProductRouter } from './routes/new';
import { showProductRouter } from './routes/show';
import { indexProductRouter } from './routes/index';
import { updateProductRouter } from './routes/update';

const cors = require('cors'); 
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(json());

app.use(cors({
  origin: 'https://ecom.com/', 
  credentials: true //Để bật cookie HTTP qua CORS
}))


app.use(currentUser);


app.use(createProductRouter);
app.use(showProductRouter);
app.use(indexProductRouter);
app.use(updateProductRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});


export { app };