import { sign, verify } from "jsonwebtoken";

import { config } from "../../../core/config";

import { hashCompare } from "../../../modules/user/utils";
import UserService from "../../../modules/user/services/user.service";

import WrongUsernameOrPassword from "../exceptions/WrongUsernameOrPassword";
import UserNotFound from "../../user/exceptions/UserNotFound";

class LoginService {
  protected userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public async login(
    email: string,
    password: string
  ): Promise<string> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new WrongUsernameOrPassword();
    }
    const passwordsMatch = await hashCompare(password, user.password);

    if (!passwordsMatch) {
      throw new WrongUsernameOrPassword();
    }

    const token = this.generateToken(user);
    return token;
  }

  protected generateToken(user: any): string {
    const payload: any = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return sign(payload, config("jwt.secret"), {
      expiresIn: config("jwt.expiresIn"),
      algorithm: config("jwt.algorithm"),
    });
  }

  public async getCurrentUser(token: string): Promise<any> {
    const payload = this.verifyToken(token);
    const user = await this.userService.findOne(payload.userId);

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }
  verifyToken(token: string): any {
    const jwtSecret = config("jwt.secret");
    return verify(token, jwtSecret);
  }
}

export default LoginService;
