import { IHttpRequest, IHttpResponse } from "nanoexpress";
import LoginService from "../services/auth.service";

import AuthResponse from "../dto/AuthResponse.dto";
import AuthRequest from "../dto/AuthRequest.dto";
import UserResponse from "../../user/dto/UserResponse.dto";
import { __ } from "../../../core/i18n";

const loginService = new LoginService();
const login = async (req: IHttpRequest, res: IHttpResponse) => {
  const request = new AuthRequest(req.body);
  const token = await loginService.login(request.email, request.password, request.rememberMe);

  res.json(new AuthResponse(String(token), request.rememberMe));
};

const logout = (_req: IHttpRequest, res: IHttpResponse) => {
  return res.json({ message: __("The session has been closed successfully") });
};

const getCurrentUser = async (req: IHttpRequest, res: IHttpResponse) => {
  const headers: any = req.headers;
  const token = headers.authorization.split(" ")[1];
  const user = await loginService.getCurrentUser(token);
  return res.json(new UserResponse(user));
};

export { login, logout, getCurrentUser };
