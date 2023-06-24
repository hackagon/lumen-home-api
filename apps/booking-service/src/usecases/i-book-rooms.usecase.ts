import { BookRoomsDto } from '../dtos';

export const IBookRoomsUseCase = Symbol.for('IBookRoomsUseCase');
export interface IBookRoomsUseCase {
  execute(data: BookRoomsDto): Promise<any>;
  checkRoomsAvailability(data: any): Promise<boolean>;
}
