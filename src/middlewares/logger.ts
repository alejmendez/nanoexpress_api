import LOGGER from "../lib/logger";
import { IHttpRequest, IHttpResponse } from "nanoexpress";

const LoggerMiddleware: any = (req: IHttpRequest, res: IHttpResponse, next: any) => {
  try {
    LOGGER.http(`[${req.method}] request on endpoint ${req.url}`);
    next();
  } catch {
    return res.status(500).json({ message: "Internal Error" });
  }
};

export default LoggerMiddleware;
