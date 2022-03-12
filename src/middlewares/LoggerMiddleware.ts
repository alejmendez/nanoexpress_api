import { IHttpRequest, IHttpResponse } from "nanoexpress";
import LOGGER from "../lib/logger";

const LoggerMiddleware: any = (
  req: IHttpRequest,
  res: IHttpResponse,
  next: any
) => {
  try {
    LOGGER.http(`[${req.method}] request on endpoint ${req.url}`);
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Error: middleware logger" });
  }
};

export default LoggerMiddleware;
