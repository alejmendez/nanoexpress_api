import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";

import { config } from "../core/config";

import { User } from "../entities/user.entity";

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

    if (!user || !this.passwordsMatch(password, user.password)) {
      return false;
    }

    const token = this.generateToken(user);
    return token;
  }

  protected passwordsMatch(password: string, password2: string): boolean {
    return password === password2;
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
}

export default LoginService;
