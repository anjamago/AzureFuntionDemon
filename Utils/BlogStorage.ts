import {
  BlobServiceClient,
  ContainerClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

import { IStorageFactory } from "./IStorageFactory";
import { account, accountKey, containerName } from "../config/Keys";
import { Convert } from "./Convert";
import { IGeneric } from "./model";

export class BlogStorage implements IStorageFactory {
  /*  private sharedKeyCredential;
  private containerClient; */
  private blobServiceClient;

  constructor() {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      "DefaultEndpointsProtocol=https;AccountName=basededatosdemon;AccountKey=qXi9qJkx4/BkAwZU8RXlzEptNViLdlP2six/eYjjprxW+CK7lzTjPe5RHXEoE74/54X/Uy/SQPtqs1NPlxrtSA==;EndpointSuffix=core.windows.net"
    );
  }

  async GetRankingClient() {
    const blockClient = this.GetBlockBlobClient("Client.txt");
    const downloadBlockBlobResponse = await blockClient.download();

    const downloaded = (
      await Convert.streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
    ).toString();

    if (!downloaded) {
      return [];
    }

    const json: IGeneric[] = JSON.parse(downloaded);

    return json;
  }

  GetRankingProduct(): any[] {
    throw new Error("Method not implemented.");
  }

  async GetFindClient(name: string) {
    return [];
  }

  GetFindProduct(name: string): any[] {
    throw new Error("Method not implemented.");
  }

  async SaveRankingClient(data: IGeneric) {
    const getClient = await this.GetRankingClient();
    getClient.push(data);
    const clientString = JSON.stringify(getClient);
    await this.UploadBlobContent("Client.txt", clientString);
  }

  SaveRankingProduct(data: IGeneric): void {
    throw new Error("Method not implemented.");
  }

  private async createBlob(nameBlob: string) {
    const content = "[]";
    await this.UploadBlobContent(nameBlob, content);
  }

  private async UploadBlobContent(blobName: string, content: string) {
    const blockBlobClient = this.GetBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(
      content,
      Buffer.byteLength(content)
    );
    console.log(
      `Upload block blob ${blobName} successfully`,
      uploadBlobResponse.requestId
    );
  }

  private GetBlockBlobClient(blobName: string) {
    const container = this.blobServiceClient.getContainerClient(containerName);
    const blobClient = container.getBlockBlobClient(blobName);
    return blobClient;
  }
}
