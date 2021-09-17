import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError, currentUser } from '@ngatickets/common';

import { deleteOrderRouter } from './routes/delete';
import { indexOrderRouter } from './routes/index';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';

const cors = require('cors'); 
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(json());
app.use(cors({
  credentials: true, //Để bật cookie HTTP qua CORS
  origin: 'https://ecom.com/', 
}))

app.use(currentUser);

app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
