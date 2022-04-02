import Request from "@core/request";

export default class UserRequest extends Request {
  username: string;
  email: string;
  password: string;
  role: string;

  constructor(data: any) {
    super();

    const schema: any = {
      username: ["required", "string", "min:3", "max:20"],
      email: ["required", "email", "max:60"],
      password: ["string", "password"],
      role: ["required", "string", "min:3", "max:100"],
    };
    this.validate(schema, data);

    this.username = data.username.toLowerCase();
    this.email = data.email.toLowerCase();
    this.password = data.password;
    this.role = data.role.toLowerCase();
  }
}
