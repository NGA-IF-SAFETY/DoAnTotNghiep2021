import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@ngatickets/common';
const cookieParser = require('cookie-parser');
const cors = require('cors');
import { User } from './models/user';


import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { indexUserRouter} from './routes/getUser';

const app = express();
//cookie-parser dùng để đọc cookies của request:
app.use(cookieParser()) 

app.use(json());

app.use(cors({
  //Chan tat ca cac domain khac ngoai domain nay
  origin: 'https://ecom.com/', 
  credentials: true //Để bật cookie HTTP qua CORS
}))

// let users = [
//   {
//     "userName": "nga",
//     "email": "nga@gmail.com",
//     "password": "123456"
//   },
//   {
//     "userName": "nga1",
//     "email": "nga1@gmail.com",
//     "password": "123456"
//   },
//   {
//     "userName": "nga2",
//     "email": "nga2@gmail.com",
//     "password": "123456"
//   }

// ];
// users.map(async (userItem) => {
//   let user = User.build({
//     userName: userItem.userName,
//     email: userItem.email,
//     password: userItem.password
//   });
//   await user.save();
// })

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(indexUserRouter);
app.use(signupRouter);


app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

