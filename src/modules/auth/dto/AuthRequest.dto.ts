import Request from "@core/request";
import { IHttpRequest, IHttpResponse } from "nanoexpress";

export default class AuthRequest extends Request {
  email: string;
  password: string;
  rememberMe: boolean;

  constructor(req: IHttpRequest, res: IHttpResponse) {
    super();
    const data: any = req.body;
    const schema: any = {
      email: ["required", "email", "max:60"],
      password: ["required"],
      rememberMe: ["boolean"],
    };
    this.validate(schema, data);
    this.email = data.email.toLowerCase();
    this.password = data.password;
    this.rememberMe = !!data.rememberMe;
  }
}
