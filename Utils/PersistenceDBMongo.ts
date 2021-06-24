import { IStorageFactory } from "./IStorageFactory";

export class PersistenceDBMongo implements IStorageFactory {
  GetRankingClient(): any[] {
    throw new Error("Method not implemented.");
  }
  GetRankingProduct(): any[] {
    throw new Error("Method not implemented.");
  }
  GetFindClient(name: string): any {
    throw new Error("Method not implemented.");
  }
  GetFindProduct(name: string): any[] {
    throw new Error("Method not implemented.");
  }
  SaveRankingClient(): void {
    throw new Error("Method not implemented.");
  }
  SaveRankingProduct(): void {
    throw new Error("Method not implemented.");
  }
}
