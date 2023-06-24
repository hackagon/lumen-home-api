import { AbstractEntityIntId } from '@app/infra';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'room' })
export class RoomEntity extends AbstractEntityIntId<RoomEntity> {
  @Column()
  code: string;

  // price per day, usd dollar
  @Column()
  price: number;
}
