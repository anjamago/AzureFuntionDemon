import { IGeneric } from "./model";

export interface IStorageFactory {
  GetRankingClient();
  GetRankingProduct();
  GetFindClient(name: string);
  GetFindProduct(name: string);
  SaveRankingClient(data: IGeneric);
  SaveRankingProduct(data: IGeneric);
}
