import * as dotenv from "dotenv";
dotenv.config();

export const account = process.env.ACCOUNT_NAME;
export const accountKey = process.env.ACCOUNT_KEY;
export const containerName = "persistencia";
export const instanceName = "blob";
