import { IHttpRequest, IHttpResponse } from "nanoexpress";
import { __ } from "../core/i18n";
import LOGGER from "../lib/logger";

const LoggerMiddleware: any = (
  req: IHttpRequest,
  res: IHttpResponse,
  next: any
) => {
  try {
    LOGGER.http(__("request on endpoint", { method: req.method, url: req.url }));
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: __("Internal Error", {message:"middleware logger"}) });
  }
};

export default LoggerMiddleware;
