import { IHttpRequest, IHttpResponse } from "nanoexpress";

class LogoutController {
  logout(req: IHttpRequest, res: IHttpResponse) {
    return res.status(200).json({ message: "logout successfully" });
  }
}

export default new LogoutController();
