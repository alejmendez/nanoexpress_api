import { IHttpRequest, IHttpResponse } from "nanoexpress";
import { verify } from "jsonwebtoken";

import { config } from "../core/config";

const routesExcludes = config("JWT_UNLESS", "").split(",");

const jwt: any = (req: IHttpRequest, res: IHttpResponse, next: any) => {
  try {
    if (routesExcludes.includes(req.url)) {
      return next();
    }

    const headers: any = req.headers;
    const token = headers.authorization.split(" ")[1];
    verify(token, config("JWT_SECRET"));
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorizated" });
  }
};

export default jwt;
