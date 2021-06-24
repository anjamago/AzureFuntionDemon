import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CreateInstance } from "../Utils";
const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const persistence = CreateInstance();
  let response: any;
  const { method, body } = req;

  if (method === "POST") {
    if (body !== undefined) {
      persistence.SaveRankingClient(body);
      response = "ok";
    }
  }

  console.log(method === "GET", method);
  if (method === "GET") {
    const getClient = await persistence.GetRankingClient();
    response = getClient;
  }

  if (method !== "POST" && method !== "GET") {
    response = " Acceso denegado metodo no soportado";
  }

  context.res = {
    status: 200,
    body: response,
  };
};

export default httpTrigger;
