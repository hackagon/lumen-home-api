import { AbstractRepository } from '@app/infra';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities';

@Injectable()
export class UserRepository extends AbstractRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  async findByEmail(email: string, shouldThrowError = true) {
    const foundUser = await this.repository.findOneBy({ email });

    if (shouldThrowError && !foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }
}
