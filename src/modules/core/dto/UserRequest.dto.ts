import Request from "@core/request";

export default class UserRequest extends Request {
  username: string;
  email: string;
  password: string;
  role: string;

  protected override schema: any = {
    type: "object",
    properties: {
      username: { type: "string" },
      email: { type: "string" },
      password: { type: "string", nullable: true },
      role: { type: "string" },
    },
    required: ["username", "email", "password", "role"],
  };

  constructor(data: any) {
    super();
    this.validate(data);

    this.username = data.username.toLowerCase();
    this.email = data.email.toLowerCase();
    this.password = data.password;
    this.role = data.role.toLowerCase();
  }
}
