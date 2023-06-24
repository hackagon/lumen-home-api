import { AbstractRepository } from '@app/infra';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entities';

@Injectable()
export class CustomerRepository extends AbstractRepository<CustomerEntity> {
  constructor(
    @InjectRepository(CustomerEntity)
    private repository: Repository<CustomerEntity>,
  ) {
    super(repository);
  }
}
