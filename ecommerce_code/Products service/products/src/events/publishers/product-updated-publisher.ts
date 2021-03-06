import { Publisher, Subjects, ProductUpdatedEvent } from '@ngatickets/common';

export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
  subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
}
