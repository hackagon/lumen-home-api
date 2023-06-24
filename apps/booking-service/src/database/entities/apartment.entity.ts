import { AbstractEntityIntId, AbstractEntityUuId } from '@app/infra';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'apartment' })
export class ApartmentEntity extends AbstractEntityIntId<ApartmentEntity> {
  @Column()
  name: string;

  @Column()
  address: string;
}
