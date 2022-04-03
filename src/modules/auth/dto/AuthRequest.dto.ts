import Request from "@core/request";

export default class AuthRequest extends Request {
  email: string;
  password: string;
  rememberMe: boolean;

  constructor(data: any) {
    super();
    const schema: any = {
      email: ["required", "email", "max:60"],
      password: ["required", "string"],
      rememberMe: ["boolean"],
    };
    this.validate(schema, data);
    this.email = data.email.toLowerCase();
    this.password = data.password;
    this.rememberMe = !!data.rememberMe;
  }
}
