import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@ngatickets/common';
import { queueGroupName } from './queue-group-name';
import { Product } from '../../models/product';
import { ProductUpdatedPublisher } from '../publishers/product-updated-publisher';
import { Decrypted } from '../../service/decryptoData';
import { encode } from '../../service/ecryptData';


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Decrypt data 
    const decodedData = await Decrypted.decode(data);
    // console.log( decodedData);
    
    // Find the product that the order is reserving
    const product = await Product.findById(decodedData.product.id);
    // console.log(product);
    

    // If no product, throw error
    if (!product) {
      throw new Error('Product not found');
    }

    // Mark the product as being reserved by setting its orderId property
    product.set({ orderId: decodedData.id });

    // Save the product
    await product.save();
    const encodeData = {
      id: product.id,
      price: product.price,
      title: product.title,
      userId: product.userId,
      orderId: product.orderId,
      version: product.version,
    }
    await new ProductUpdatedPublisher(this.client).publish( await encode(encodeData));

    // ack the message
    msg.ack();
  }
}
