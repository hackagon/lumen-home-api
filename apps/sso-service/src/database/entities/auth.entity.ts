import { AbstractEntityIntId } from '@app/infra';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'auth' })
export class AuthEntity extends AbstractEntityIntId<AuthEntity> {
  @Column()
  ttl: number;

  @Column()
  jwt: string;
}
