import Request from "@core/request";

export default class AuthRequest extends Request {
  email: string;
  password: string;
  rememberMe: boolean;

  protected override schema: any = {
    type: "object",
    properties: {
      email: { type: "string" },
      password: { type: "string" },
      rememberMe: { type: "boolean", nullable: true },
    },
    required: ["email", "password"],
  };

  constructor(data: any) {
    super();
    this.validate(data);
    this.email = data.email.toLowerCase();
    this.password = data.password;
    this.rememberMe = !!data.rememberMe;
  }
}
