import { IHttpRequest, IHttpResponse } from "nanoexpress";
import LoginService from "../services/auth.service";

import AuthResponse from "../dto/AuthResponse.dto";
import AuthRequest from "../dto/AuthRequest.dto";

const loginService = new LoginService();
const login = async (req: IHttpRequest, res: IHttpResponse) => {
  try {
    const request = new AuthRequest(req.body);
    const token = await loginService.login(request.email, request.password);

    if (!token) {
      return responseUnauthorized(res);
    }

    return res.json(new AuthResponse(String(token)));
  } catch (error) {
    return responseUnauthorized(res);
  }
};

const logout = (_req: IHttpRequest, res: IHttpResponse) => {
  return res.json({ message: "logout successfully" });
};

const responseUnauthorized = (res: IHttpResponse) => {
  return res.status(401).json({ message: "Unauthorized" });
};

export { login, logout };
