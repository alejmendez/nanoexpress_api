import { IHttpRequest, IHttpResponse } from "nanoexpress";

const logout = (_req: IHttpRequest, res: IHttpResponse) => {
  return res.json({ message: "logout successfully" });
};

export { logout };
