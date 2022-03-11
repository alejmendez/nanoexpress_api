import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";

import { config } from "../core/config";

import { User } from "../entities/user.entity";
import { hashCompare } from "../utils";

class LoginService {
  protected repository: any;
  constructor() {
    this.repository = getRepository(User);
  }

  public async login(
    email: string,
    password: string
  ): Promise<boolean | string> {
    const user: User = await this.repository.findOne({
      email,
    });

    if (!user) {
      return false;
    }
    const isPasswordsMatched = await this.passwordsMatch(
      password,
      user.password
    );

    if (!isPasswordsMatched) {
      return false;
    }

    const token = this.generateToken(user);
    return token;
  }

  protected async passwordsMatch(
    password: string,
    password2: string
  ): Promise<boolean> {
    return await hashCompare(password, password2);
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

  private static instance: LoginService;
  public static getInstance(): LoginService {
    if (!LoginService.instance) {
      LoginService.instance = new LoginService();
    }

    return LoginService.instance;
  }
}

export default LoginService;
