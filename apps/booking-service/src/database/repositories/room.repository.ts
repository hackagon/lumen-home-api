import { AbstractRepository } from '@app/infra';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from '../entities';

@Injectable()
export class RoomRepository extends AbstractRepository<RoomEntity> {
  constructor(
    @InjectRepository(RoomEntity)
    private repository: Repository<RoomEntity>,
  ) {
    super(repository);
  }
}
