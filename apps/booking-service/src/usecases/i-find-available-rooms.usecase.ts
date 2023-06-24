export const IFindAvailableRoomsUseCase = Symbol.for(
  'IFindAvailableRoomsUseCase',
);
export interface IFindAvailableRoomsUseCase {
  execute(data): Promise<any>;
}
