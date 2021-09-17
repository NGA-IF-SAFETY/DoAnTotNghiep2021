import { Message } from 'node-nats-streaming';
import { Subjects, Listener, ProductUpdatedEvent } from '@ngatickets/common';
import { Product } from '../../models/product';
import { queueGroupName } from './queue-group-name';
import { Decrypted } from '../../service/decryptoData';

export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
  subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductUpdatedEvent['data'], msg: Message) {
    const decodeData = await Decrypted.decode(data);
    const product = await Product.findByEvent(decodeData);

    if (!product) {
      throw new Error('Product not found');
    }

    const { title, price } = decodeData;
    product.set({ title, price });
    await product.save();

    msg.ack();
  }
}
