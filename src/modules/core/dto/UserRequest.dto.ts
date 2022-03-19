import Request from "@core/request";

export default class UserRequest extends Request {
  username: string;
  email: string;
  password: string;
  role: string;

  protected schema: any = {
    username: "",
    email: "",
    password: "",
    role: "",
  };

  constructor(data: any) {
    super();
    this.username = data.username.toLowerCase();
    this.email = data.email.toLowerCase();
    this.password = data.password;
    this.role = data.role.toLowerCase();
  }
}
