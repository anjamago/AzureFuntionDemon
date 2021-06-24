import * as dotenv from "dotenv";
dotenv.config();

export const account = process.env.ACCOUNT_NAME || "andymartinez0530@outlook.com";
export const accountKey = process.env.ACCOUNT_KEY || "Anja1746";
export const containerName=process.env.CONTAINER_NAME|| "storageaccountdemona1eb";
export const instanceName=process.env.INSTANCE || "Blob";
