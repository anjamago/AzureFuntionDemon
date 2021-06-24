export interface IStorageFactory{

    GetRankingClient():Array<any>;
    GetRankingProduct():Array<any>;
    GetFindClient(name:string):Array<any>;
    GetFindProduct(name:string):Array<any>;
    SaveRankingClient(data:string):void;
    SaveRankingProduct(data:string):void;
    
}