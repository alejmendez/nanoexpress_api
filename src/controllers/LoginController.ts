import { IHttpRequest, IHttpResponse } from "nanoexpress";
import LoginService from "../services/auth.service";
import { config } from "../core/config";

const loginService = new LoginService();
const login = async (req: IHttpRequest, res: IHttpResponse) => {
  try {
    const { email, password }: any = req.body;
    const token = await loginService.login(email, password);

    if (!token) {
      return responseUnauthorizated(res);
    }

    return responseWithToken(res, String(token));
  } catch (error) {
    return responseUnauthorizated(res);
  }
};

const responseUnauthorizated = (res: IHttpResponse) => {
  return res.status(401).json({ message: "Unauthorizated" });
};

const responseWithToken = (res: IHttpResponse, token: string) => {
  return res.status(200).json({
    token,
    token_type: "bearer",
    expires_in: config("jwt.expiresIn"),
  });
};

export { login };
