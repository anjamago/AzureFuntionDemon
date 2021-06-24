import { BlogStorage } from "./BlogStorage";
import { PersistenceDBMongo } from "./PersistenceDBMongo";
import { instanceName } from "../config/Keys";

export const CreateInstance = () => {
  console.log(instanceName);

  if (instanceName === "blob") {
    return new BlogStorage();
  }
  if (instanceName === "mongo") {
    return new PersistenceDBMongo();
  }
};
