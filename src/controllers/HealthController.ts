import { IHttpRequest, IHttpResponse } from "nanoexpress";
import { config } from "../core/config";

const version = config("server.version");
const getVersion = (_req: IHttpRequest, res: IHttpResponse) => {
  return res.json({ version });
};

export { getVersion };
