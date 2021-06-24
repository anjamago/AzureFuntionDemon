import {
  BlobServiceClient,
  ContainerClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

import { IStorageFactory } from "./IStorageFactory";
import { account, accountKey, containerName } from "../config/Keys";

export class BlogStorage implements IStorageFactory {
  private sharedKeyCredential;
  private containerClient;
  private blobServiceClient;

  constructor() {
    this.sharedKeyCredential = new StorageSharedKeyCredential(
      account,
      accountKey
    );

    this.containerClient = new ContainerClient(
      `https://${account}.blob.core.windows.net/${containerName}`,
      this.sharedKeyCredential
    );

    this.blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      this.sharedKeyCredential
    );
  }

  GetRankingClient(): any[] {
    const blockClient = this.GetBlockBlobClient("Clients");
    console.log(blockClient);
    return [];
  }
  GetRankingProduct(): any[] {
    throw new Error("Method not implemented.");
  }
  GetFindClient(name: string): any[] {
    throw new Error("Method not implemented.");
  }
  GetFindProduct(name: string): any[] {
    throw new Error("Method not implemented.");
  }
  async SaveRankingClient(data: string) {
    const getClient = this.GetRankingClient();
    const clientString = JSON.stringify(getClient);
    const blocBlobClient = this.GetBlockBlobClient("Clients");
    await this.UploadBlobContent("Clients", clientString);
  }
  SaveRankingProduct(data: string): void {
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
    const blobClient = this.containerClient.getBlobClient(blobName);
    const blockBlobClient = blobClient.getBlockBlobClient();
    return blockBlobClient;
  }
}
