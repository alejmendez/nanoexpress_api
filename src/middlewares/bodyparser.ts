import { IHttpRequest, IHttpResponse } from "nanoexpress";

import { config } from "../core/config";

const routesExcludes = config("jwt.unless", "").split(",");

const isApplicationJson: any = (type: string) => {
  return type === "application/json";
};

const bodyparser: any = (req: IHttpRequest, res: IHttpResponse, next: any) => {
  try {
    const headers: any = req.headers;
    var shouldParse = isApplicationJson(headers["content-type"]);
    if (!shouldParse) {
      next();
    }

    const reqBody: any = req.body || {};
    const bodyString: any = JSON.parse(reqBody.toString());

    req.body = bodyString;

    next();
  } catch {
    return res.status(401).json({ message: "Unauthorizated" });
  }
};

export default bodyparser;
