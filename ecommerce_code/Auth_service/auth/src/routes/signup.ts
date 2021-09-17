import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { validateRequest, BadRequestError, Decrypted } from '@ngatickets/common';

const router = express.Router();

router.post(
  '/api/users/signup',
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

      const { userName, email, password } = result;

      // check username already exist
      const existingUser1 = await User.findOne({ userName });

      if (existingUser1) {
        return res.status(201).json({
          errors: "User đã tồn tại"
        });
        // throw new BadRequestError('User đã tồn tại')
      }
      // check email already exist  
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        
        return res.status(201).json({
          errors: "Email đã tồn tại",
        });
        // throw new BadRequestError('Email đã tồn tại')
      }

      const user = User.build({ userName, email, password });

      await user.save();
      return res.status(201).json({
        message: 'Signup successful',
      });
    });
  }

);

export { router as signupRouter };
