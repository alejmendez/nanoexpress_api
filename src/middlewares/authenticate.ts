import { JwtPayload, verify } from "jsonwebtoken";
import { IHttpRequest, IHttpResponse, HttpRequestHeaders } from "nanoexpress";

const jwt: any = (req: IHttpRequest, res: IHttpResponse, next: any) => {
  try {
    const headers: any = req.headers;
    const token: string = headers.authorization;
    const validToken: string | JwtPayload = verify(token, "HS256");
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorizated" });
  }
};

export default jwt;
