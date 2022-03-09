import { IHttpRequest, IHttpResponse } from "nanoexpress";

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

const bodyparser: any = (req: IHttpRequest, res: IHttpResponse, next: any) => {
  try {
    const headers: any = req.headers;
    var shouldParse = isApplicationJson(headers["content-type"]);
    if (!shouldParse) {
      next();
    }

    req.body = cleanBody(req);

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Error: middleware bodyparser" });
  }
};

export default bodyparser;
