import { Listener, OrderCancelledEvent, Subjects } from '@ngatickets/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Product } from '../../models/product';
import { ProductUpdatedPublisher } from '../publishers/product-updated-publisher';
import { Decrypted } from '../../service/decryptoData';
import { encode } from '../../service/ecryptData';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const decodeData = await Decrypted.decode(data);
    const product = await Product.findById(decodeData.product.id);
    // console.log("product", product);

    if (!product) {
      throw new Error('Product not found');
    }

    product.set({ orderId: undefined });
    await product.save();
    
    const encrypt = 
    {
      id: product.id,
      orderId: product.orderId,
      userId: product.userId,
      price: product.price,
      title: product.title,
      version: product.version,
    }

    await new ProductUpdatedPublisher(this.client).publish(await encode(encrypt));

    msg.ack();
  }
}
