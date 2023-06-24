import { AbstractRepository } from '@app/infra';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from '../../domains/dtos';
import { AuthEntity } from '../entities';

@Injectable()
export class AuthRepository extends AbstractRepository<AuthEntity> {
  constructor(
    @InjectRepository(AuthEntity) repository: Repository<AuthEntity>,
  ) {
    super(repository);
  }
}
