import { IHttpRequest, IHttpResponse } from "nanoexpress";
import LOGGER from "../lib/logger";
import { UserModel } from "../models/UserModel";
import { sign } from "jsonwebtoken";

class LoginController {
  /**
   * This method is responsible for made login into api
   * @param req The request received
   * @param res The response gived
   */
  async login(req: IHttpRequest, res: IHttpResponse) {
    const reqBody: any = req.body;
    const { email, password }: any = JSON.parse(reqBody.toString());
    const user: any = await UserModel.findOne({
      where: { email: email, password: password },
    });
    if (user) {
      const token: string = sign({ email, password }, "HS256", {
        expiresIn: 3600,
      });
      LOGGER.http("[POST] request on endpoint /login");
      return res.status(200).json({ token });
    } else {
      return res.status(400).json({ message: "user does not exist" });
    }
  }
}

export default new LoginController();
