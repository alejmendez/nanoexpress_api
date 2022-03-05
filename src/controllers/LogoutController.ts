import { IHttpRequest, IHttpResponse } from "nanoexpress";
import LOGGER from "../lib/logger";

class LogoutController {
  /**
   * This method is responsible for made logout into api
   * @param req The request received
   * @param res The response gived
   */
  logout(req: IHttpRequest, res: IHttpResponse) {
    LOGGER.http("[POST] request on endpoint /logout");
    return res.status(200).json({ message: "logout successfully" });
  }
}

export default new LogoutController();
