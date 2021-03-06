import { IHttpRequest, IHttpResponse } from "nanoexpress";
import { __ } from "@core/i18n";
import LOGGER from "@core/logger";

export const LoggerMiddleware: any = (
  req: IHttpRequest,
  res: IHttpResponse,
  next: any
) => {
  try {
    LOGGER.http(
      __("request_on_endpoint", { method: req.method, url: req.url })
    );
    next();
  } catch (error) {
    return res.status(500).json({
      message: __("internal_error", { message: "middleware logger" }),
    });
  }
};
