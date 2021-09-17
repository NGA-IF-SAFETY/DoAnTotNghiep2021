import { Message } from 'node-nats-streaming';
import { Subjects, Listener, ProductCreatedEvent } from '@ngatickets/common';
import { Product } from '../../models/product';
import { queueGroupName } from './queue-group-name';
import { Decrypted } from '../../service/decryptoData';

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductCreatedEvent['data'], msg: Message) {
    const decodeData = await Decrypted.decode(data);
      const { id, title, price } = decodeData;
      
      const product = Product.build({
        id,
        title,
        price,
      });

      await product.save();
      msg.ack();

  }
}
