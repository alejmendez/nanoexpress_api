import { IHttpRequest, IHttpResponse } from "nanoexpress";

class ApiVersionController {
  getVersion(req: IHttpRequest, res: IHttpResponse) {
    return res.status(200).json({ "api version": "v1" });
  }
}

export default new ApiVersionController();
