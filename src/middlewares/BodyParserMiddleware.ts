import { IHttpRequest, IHttpResponse } from "nanoexpress";
import { __ } from "@core/i18n";

const isApplicationJson: any = (type: string) => {
  return type === "application/json";
};

const cleanBody: any = (req: IHttpRequest): any => {
  let reqBody = req.body;
  if (reqBody === undefined || reqBody === null || reqBody === "") {
    return {};
  }
  return JSON.parse(reqBody.toString());
};

export const BodyParserMiddleware: any = (
  req: IHttpRequest,
  res: IHttpResponse,
  next: any
) => {
  try {
    const headers: any = req.headers;
    var shouldParse = isApplicationJson(headers["content-type"]);
    if (!shouldParse) {
      next();
    }

    req.body = cleanBody(req);

    next();
  } catch (error) {
    return res.status(500).json({
      message: __("Internal Error", { message: "middleware bodyparser" }),
    });
  }
};
