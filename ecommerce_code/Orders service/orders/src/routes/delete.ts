import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@ngatickets/common';
import { Order, OrderStatus } from '../models/order';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';
import { encode } from '../service/ecryptData';

const router = express.Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('product');

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();

    var message = {
      id: order.id,
      version: order.version,
      product: {
        id: order.product.id,
      },
    }
    const encrypted = await encode(message);
    // publishing an event saying this was cancelled!  
    new OrderCancelledPublisher(natsWrapper.client).publish(encrypted);

    res.status(204).json({Message: "Order is cancelled success" });
  }
);

export { router as deleteOrderRouter };

