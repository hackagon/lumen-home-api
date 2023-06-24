import { AbstractEntityIntId } from '@app/infra';
import {
  IsNotEmpty,
  registerDecorator,
  Validate,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import moment from 'moment';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IsDateFormat } from '../../dtos/is-date-format.decorator';
import { CustomerEntity } from './customer.entity';
import { RoomEntity } from './room.entity';

@Entity({ name: 'booking' })
export class BookingEntity extends AbstractEntityIntId<BookingEntity> {
  @ManyToOne(() => RoomEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'room_id' })
  @Column({ nullable: true })
  roomId: number;

  @ManyToOne(() => CustomerEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  @Column({ nullable: true })
  customerId: string;

  @IsNotEmpty()
  @IsDateFormat()
  @Column()
  startDate: Date;

  @IsNotEmpty()
  @IsDateFormat()
  @Column()
  endDate: Date;
}
