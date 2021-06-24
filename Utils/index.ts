import { BlogStorage } from "./BlogStorage";
import { PersistenceDBMongo } from "./PersistenceDBMongo";
import { instanceName } from "../config/Keys";

export const CreateInstance = () => {
  console.log(instanceName);

  if (instanceName === "Blob") {
    return new BlogStorage();
  }
  if (instanceName === "Mongo") {
    return new PersistenceDBMongo();
  }
};
