import { IHttpRequest, IHttpResponse } from "nanoexpress";
import { verify } from "jsonwebtoken";

import { config } from "@core/config";
import { __ } from "@core/i18n";

const routesExcludes = config("jwt.unless", []);
const jwtSecret = config("jwt.secret");

const JwtMiddleware: any = (
  req: IHttpRequest,
  res: IHttpResponse,
  next: any
) => {
  try {
    if (routesExcludes.includes(req.url)) {
      return next();
    }

    const headers: any = req.headers;
    const token = headers.authorization.split(" ")[1];
    verify(token, jwtSecret);

    next();
  } catch (error) {
    return res.status(401).json({ message: __("Unauthorized") });
  }
};

export default JwtMiddleware;
