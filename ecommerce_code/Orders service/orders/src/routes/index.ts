import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '@ngatickets/common';
import { Order } from '../models/order';
import { encodeMessage } from '../service/encryptedClient';

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate('product');
  try {
    const encryptedOrder = await encodeMessage(orders);
    
    res.status(200).json({
      Message: "Get all orders",
      encryptedOrder
    });
  }
  catch(err){
    next(err);
  }

});

export { router as indexOrderRouter };

