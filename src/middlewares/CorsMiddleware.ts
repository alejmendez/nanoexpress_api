import { IHttpRequest, IHttpResponse } from "nanoexpress";
import cors, { CorsRequest } from "cors";
import LOGGER from "../lib/logger";
import { __ } from "../core/i18n";

const corsMiddleware: any = (
  req: IHttpRequest,
  res: IHttpResponse,
  next: any
) => {
  try {
    const corsOptions = {};
    const fn = cors(corsOptions);
    const headers: any = req.headers;
    const rq: CorsRequest = {
      method: req.method,
      headers,
    };

    return fn(rq, res, next);
  } catch (error) {
    LOGGER.error(error);
    return res.status(500).json({ message: __("Internal Error: middleware cors") });
  }
};

export default corsMiddleware;
