import { IHttpRequest, IHttpResponse } from "nanoexpress";

const logout = (req: IHttpRequest, res: IHttpResponse) => {
  return res.status(200).json({ message: "logout successfully" });
};

export { logout };
