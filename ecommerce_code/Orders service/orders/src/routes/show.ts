import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@ngatickets/common';
import { Order } from '../models/order';
const router = express.Router();

router.get(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('product');

    if (!order) {
      throw new NotFoundError();
      // return res.status(409).send({ errors: " Order not found !"})
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
      // return res.status(401).send({ errors: " Not Authorized Error!"})
    } 
    
    return res.send(order);
  }
);

export { router as showOrderRouter };



