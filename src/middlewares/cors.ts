import { IHttpRequest, IHttpResponse } from "nanoexpress";
import cors, { CorsRequest } from "cors";

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
    return res.status(401).json({ message: "Unauthorizated" });
  }
};

export default corsMiddleware;
