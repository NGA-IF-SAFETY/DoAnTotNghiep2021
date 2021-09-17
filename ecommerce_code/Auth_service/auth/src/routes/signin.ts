import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest,Token } from '@ngatickets/common';
import { Password } from '../services/password';
import { User } from '../models/user';
import { Decrypted } from '@ngatickets/common'

const router = express.Router();

router.post(
  '/api/users/signin',
  //validation email, password 
  [
    body('iv'),
    body('ephemPublicKey'),
    body('ciphertext'),
    body('mac')
  ],

  validateRequest,
  async (req: Request, res: Response) => {
    console.log("Dữ liệu nhận được từ bên client đã được mã hoá: ",req.body);
    
    Decrypted.decode(req.body).then(async (result) => {

      const { email, password } = result;
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        // throw new BadRequestError('Email is incorrect');
        return res.status(201).json({
          errors: "Email is incorrect"
        })
      }
      const passwordsMatch = await Password.compare(
        existingUser.password,
        password
      );
      if (!passwordsMatch) {
        // throw new BadRequestError('Password is incorrect');
        return res.status(201).json({
          errors: "Password is incorrect"
        })
      }
      // Generate JWT
      const claims = {
        userName: existingUser.userName,
        id: existingUser.id,
        email: existingUser.email,
      }

      const userJwt = await Token.createJWT(claims);

      res.cookie('access_token', userJwt, {
        //thời gian sống 30p
        maxAge: 1000 * 60 * 30, 
        // chỉ có https mới đọc được token
        httpOnly: true,
        //ssl nếu có, nếu chạy localhost thì comment lại 
        secure: true 
      })

      return res.status(200).json({
        message: "Signin success"
      });
    });
  }
);
export { router as signinRouter };
