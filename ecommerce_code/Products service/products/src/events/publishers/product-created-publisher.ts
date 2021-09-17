import { Publisher, Subjects, ProductCreatedEvent } from '@ngatickets/common';

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
}
