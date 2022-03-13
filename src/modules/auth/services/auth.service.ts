import { sign, verify } from "jsonwebtoken";

import { config } from "../../../core/config";

import { hashCompare } from "../../../modules/user/utils";
import UserService from "../../../modules/user/services/user.service";

import WrongUsernameOrPassword from "../exceptions/WrongUsernameOrPassword";
import UserNotFound from "../exceptions/UserNotFound";

const jwtExpirationTimeWithRememberMe = config("jwt.expirationTimeWithRememberMe");
const jwtExpiresIn = config("jwt.expiresIn");
const jwtAlgorithm = config("jwt.algorithm");
const jwtSecret = config("jwt.secret");
class LoginService {
  protected userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public async login(
    email: string,
    password: string,
    rememberMe: boolean = false
  ): Promise<string> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new WrongUsernameOrPassword();
    }
    const passwordsMatch = await hashCompare(password, user.password);

    if (!passwordsMatch) {
      throw new WrongUsernameOrPassword();
    }

    const token = this.generateToken(user, rememberMe);
    return token;
  }

  protected generateToken(user: any, rememberMe: boolean): string {
    const payload: any = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return sign(payload, jwtSecret, {
      expiresIn: rememberMe ? jwtExpirationTimeWithRememberMe : jwtExpiresIn,
      algorithm: jwtAlgorithm,
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
