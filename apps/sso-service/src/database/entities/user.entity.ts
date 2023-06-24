import { AbstractEntityUuId } from '@app/infra';
import { BeforeInsert, Column, Entity } from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntityUuId<UserEntity> {
  @Column({ unique: true })
  email: string;

  @Column({})
  firstName: string;

  @Column({})
  lastName: string;

  @Column({})
  password: string;

  @BeforeInsert()
  async hashPassword() {
    if (!this.password) return;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }
}
