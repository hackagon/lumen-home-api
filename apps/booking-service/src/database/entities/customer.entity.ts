import { AbstractEntity, AbstractEntityUuId } from '@app/infra';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'customer' })
export class CustomerEntity extends AbstractEntity<CustomerEntity> {
  @PrimaryColumn()
  id: string;
}
