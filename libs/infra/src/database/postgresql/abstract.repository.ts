import { DeepPartial, InsertResult, ObjectLiteral, Repository } from 'typeorm';
import _ from 'lodash';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

export interface IRepository<Entity extends ObjectLiteral> {
  findById(id: number): Promise<Entity | null>;

  findMany(): Promise<Array<Entity>>;

  create(doc: DeepPartial<Entity>): Promise<Entity | null>;

  updateById(id: number, doc: DeepPartial<Entity>): Promise<any | null>;

  deleteById(id: number): Promise<any | null>;
}

export class AbstractRepository<Entity extends ObjectLiteral>
  implements IRepository<Entity>
{
  protected readonly _repository: Repository<Entity>;

  constructor(baseRepository: Repository<Entity>) {
    this._repository = baseRepository;
  }

  async findById(id: any): Promise<Entity | null> {
    return await this._repository.findOneBy({ id });
  }

  async findMany(selects?: string[], where?: any): Promise<Entity[]> {
    return await this._repository.find({ select: selects, where });
  }

  async findManyWithPagination(
    options: IPaginationOptions,
  ): Promise<Pagination<Entity>> {
    return paginate<Entity>(this._repository, options);
  }

  async create(doc: DeepPartial<Entity>): Promise<Entity> {
    return await this._repository.create(doc).save();
  }

  async save(docs: any): Promise<Entity> {
    return await this._repository.save(docs);
  }

  async insertAll(doc: DeepPartial<Entity>[]): Promise<InsertResult> {
    const entity = doc.map((item) => this._repository.create(item));
    return await this._repository.insert(entity);
  }

  async updateById(id: number, doc: DeepPartial<Entity>): Promise<any> {
    const foundInstance = await this.findById(id);
    _.keys(doc).forEach((key) => {
      _.set(foundInstance, key, doc[key]);
    });

    return await foundInstance.save();
  }

  async deleteById(id: number): Promise<any> {
    const foundInstance = await this.findById(id);
    await this._repository.remove(foundInstance);
    return {
      message: `Instance with id ${id} has been deleted`,
    };
  }
}
