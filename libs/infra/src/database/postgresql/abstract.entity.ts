import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

export abstract class AbstractEntity<Entity> extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({})
  deletedAt: Date;

  constructor(partial?: Partial<Entity>) {
    super();
    if (partial) Object.assign(this, partial);
  }
}

export abstract class AbstractEntityUuId<
  Entity,
> extends AbstractEntity<Entity> {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

export abstract class AbstractEntityIntId<
  Entity,
> extends AbstractEntity<Entity> {
  @PrimaryGeneratedColumn()
  id: number;
}
