import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
  requireAuth,
  validateRequest,
  OrderStatus,
  Decrypted
} from '@ngatickets/common';
import { encode } from "../service/ecryptData";
import { body } from 'express-validator';
import { Product } from '../models/product';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/orders',
  requireAuth,
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
      const { productId } = result;
      console.log(result);

      // Find the product the user is trying to order in the database
      const product = await Product.findById(productId);
      if (!product) {
        // throw new NotFoundError();
        return res.status(201).json({ errors: 'Product not found'})
      }

      // Make sure that this product is not already reserved
      const isReserved = await product.isReserved();
      if (isReserved) {
        // throw new BadRequestError('Product is already reserved');
        return res.status(201).json({ errors: 'Product is already reserved'})
      }

      // Build the order and save it to the database
      const order = Order.build({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        product,
      });

      await order.save();

      let message = {
        id: order.id,
        version: order.version,
        status: order.status,
        userId: order.userId,
        product: {
          id: product.id,
          price: product.price,
        },
      }
 
      var encrypt = await encode(message)
      // console.log("🚀 ~ file: new.ts ~ line 69 ~ encrypt", encrypt)

      // Publish an event saying that an order was created
      new OrderCreatedPublisher(natsWrapper.client).publish(encrypt)


      return res.status(201).json({ message: " Create Order Success!"})

    })
  }
);

export { router as newOrderRouter };

