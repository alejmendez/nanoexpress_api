import { IHttpRequest, IHttpResponse } from "nanoexpress";
import LOGGER from "../lib/logger";

class ApiVersionController {
  /**
   * This method returns the api version
   * @param req The request received
   * @param res The response gived
   */
  getVersion(req: IHttpRequest, res: IHttpResponse) {
    LOGGER.http("[GET] request on endpoint /version");
    return res.status(200).json({ "api version": "v1" });
  }
}

export default new ApiVersionController();
