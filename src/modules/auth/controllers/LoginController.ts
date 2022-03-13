import { IHttpRequest, IHttpResponse } from "nanoexpress";
import LoginService from "../services/auth.service";

import AuthResponse from "../dto/AuthResponse.dto";
import AuthRequest from "../dto/AuthRequest.dto";
import UserResponse from "../../user/dto/UserResponse.dto";

const loginService = new LoginService();
const login = async (req: IHttpRequest, res: IHttpResponse) => {
  try {
    const request = new AuthRequest(req.body);
    const token = await loginService.login(request.email, request.password);

    res.json(new AuthResponse(String(token)));
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

const logout = (_req: IHttpRequest, res: IHttpResponse) => {
  return res.json({ message: "logout successfully" });
};

const getCurrentUser = async (req: IHttpRequest, res: IHttpResponse) => {
  const headers: any = req.headers;
  const token = headers.authorization.split(" ")[1];
  const user = await loginService.getCurrentUser(token);
  return res.json(new UserResponse(user));
};

export { login, logout, getCurrentUser };
