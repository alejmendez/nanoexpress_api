import { IHttpRequest, IHttpResponse } from "nanoexpress";
import cors, { CorsRequest } from "cors";
import LOGGER from "../lib/logger";

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
    console.log(error);
    return res.status(500).json({ message: "Internal Error: middleware cors" });
  }
};

export default corsMiddleware;
