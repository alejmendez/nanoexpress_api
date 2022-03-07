import { IHttpRequest, IHttpResponse } from "nanoexpress";
import { sign } from "jsonwebtoken";

import { UserModel } from "../models/UserModel";
import { config } from "../core/config";

const login = async (req: IHttpRequest, res: IHttpResponse) => {
  try {
    const { email, password }: any = req.body;
    const user: any = await UserModel.findOne({
      where: { email },
    });

    if (!user) {
      return responseUnauthorizated(res);
    }

    if (!passwordsMatch(password, user.password)) {
      return responseUnauthorizated(res);
    }

    const token = generateToken(user);
    return responseWithToken(res, token, user);
  } catch (error) {
    return responseUnauthorizated(res);
  }
};

const passwordsMatch = (password: string, password2: string) => {
  return password === password2;
};

const responseUnauthorizated = (res: IHttpResponse) => {
  return res.status(401).json({ message: "Unauthorizated" });
};

const responseWithToken = (res: IHttpResponse, token: string, user: any) => {
  return res.status(200).json({
    token,
    token_type: "bearer",
    expires_in: config("jwt.expiresIn"),
    user,
  });
};

const generateToken = (user: any): string => {
  const payload: any = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  return sign(payload, config("jwt.secret"), {
    expiresIn: config("jwt.expiresIn"),
    algorithm: config("jwt.algorithm"),
  });
};

export { login };
