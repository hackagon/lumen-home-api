import { AbstractRepository } from '@app/infra';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingEntity } from '../entities';

@Injectable()
export class BookingRepository extends AbstractRepository<BookingEntity> {
  constructor(
    @InjectRepository(BookingEntity)
    private repository: Repository<BookingEntity>,
  ) {
    super(repository);
  }
}
