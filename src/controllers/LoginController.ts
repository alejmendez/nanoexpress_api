import { IHttpRequest, IHttpResponse } from "nanoexpress";
import { sign } from "jsonwebtoken";

import { UserModel } from "../models/UserModel";
import { config } from "../core/config";

class LoginController {
  async login(req: IHttpRequest, res: IHttpResponse) {
    const reqBody: any = req.body;
    const { email, password }: any = JSON.parse(reqBody.toString());
    const user: any = await UserModel.findOne({
      where: { email: email, password: password },
    });
    if (user) {
      const token: string = sign({ email, password }, config("JWT_SECRET"), {
        expiresIn: 3600,
        algorithm: config("JWT_ALGORITHMS", "HS256"),
      });
      return res.status(200).json({ token });
    } else {
      return res.status(400).json({ message: "user does not exist" });
    }
  }
}

export default new LoginController();
