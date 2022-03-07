import { IHttpRequest, IHttpResponse } from "nanoexpress";
import { config } from "../core/config";

const version = config("server.version");
const getVersion = (req: IHttpRequest, res: IHttpResponse) => {
  return res.status(200).json({ version });
};

export { getVersion };
